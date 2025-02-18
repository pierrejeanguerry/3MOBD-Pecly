import Searchbar from "@/components/SearchBar";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDebounce } from "@/hooks/useDebounce";
import axios, { AxiosResponse } from "axios";

type City = {
  nom: string;
  code: string;
  codeDepartement: string;
  siren: string;
  codeEpci: string;
  codeRegion: string;
  codesPostaux: string[];
  population: number;
  _score: number;
};

export default function SpecialityScreen(searchString: string, position?: number) {
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [getLoc, setGetLoc] = useState(false);
  const { speciality } = useLocalSearchParams();
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (getLoc) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const geocodedLocation = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        const city = geocodedLocation[0]?.city;
        if (city) {
          setSearch(city);
          router.push(`./${speciality}/${city}`);
        }
      })();
    }
  }, [getLoc]);

  const fetchSearch = async (search: string) => {
    const cityRequest: AxiosResponse<City[]> = await axios.get(
        "https://geo.api.gouv.fr/communes",
        {
          params: {
            limit: 5,
            boost: "population",
            nom: search,
          },
        }
    );

    const cities: City[] = cityRequest.data;
    setCities(cities);
  };

  const debouncedFetchSearch = useDebounce(async (search: string) => {
    await fetchSearch(search);
  }, 500);

  useEffect(() => {
    if (search) debouncedFetchSearch(search);
  }, [search]);

  function onSubmit() {
    if (search) {
      router.push(`./${speciality}/${search}`);
    }
  }

  function highlightMatch(cityName: string, search: string) {
    if (!search) return <Text>{cityName}</Text>;

    const index = cityName.toLowerCase().indexOf(search.toLowerCase());
    if (index === -1) return <Text>{cityName}</Text>;

    return (
        <Text>
          {cityName.substring(0, index)}
          <Text style={styles.highlight}>
            {cityName.substring(index, index + search.length)}
          </Text>
          {cityName.substring(index + search.length)}
        </Text>
    );
  }

  if (errorMsg !== "") alert(errorMsg);

  return (
      <View style={styles.container}>
        <View>
          <View>
            <Text>{speciality}</Text>
            <Text style={styles.title}>Où ? (adresse, ville, ...)</Text>
            <Searchbar search={search} setSearch={setSearch} onSubmit={onSubmit} />
            <TouchableHighlight onPress={() => setGetLoc((prev) => !prev)}>
              <View style={styles.location}>
                <FontAwesome size={28} name="location-arrow" />
                <Text>Autour de moi</Text>
              </View>
            </TouchableHighlight>
            <View style={styles.locationPurposes}>
              {cities.map((city: City) => (
                  <Text key={city.siren} style={styles.cityName} onPress={()=> router.push(`./${speciality}/${city.nom.toLowerCase()}`)}>
                    {highlightMatch(city.nom, search)} ({city.codesPostaux[0].substring(0,2)})
                  </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    backgroundColor: "#DFF3FF",
    flex: 1,
  },
  title: {
    fontWeight: "800",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationPurposes: {
    flex: 1,
    flexDirection: "column",
  },
  cityName: {
    fontSize: 16,
    marginVertical: 4,
  },
  highlight: {
    fontWeight: "bold",
    color: "blue",
  },
});

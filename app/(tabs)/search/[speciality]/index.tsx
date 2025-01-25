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

export default function SpecialityScreen() {
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [getLoc, setGetLoc] = useState(false);
  const { speciality } = useLocalSearchParams();
  const router = useRouter();

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

  function onSubmit() {
    if (search) {
      router.push(`./${speciality}/${search}`);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>{speciality}</Text>
          <Text style={styles.title}>Où ? (adresse, ville, ...)</Text>
          <Searchbar
            search={search}
            setSearch={setSearch}
            onSubmit={onSubmit}
          />
          <TouchableHighlight
            onPress={() => setGetLoc((prev) => (prev ? false : true))}
          >
            <View style={styles.location}>
              <FontAwesome size={28} name="location-arrow" />
              <Text>Autour de moi</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "ios" ? 100 : 20,
    backgroundColor: "#DFF3FF",
  },

  title: {
    fontWeight: "800",
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

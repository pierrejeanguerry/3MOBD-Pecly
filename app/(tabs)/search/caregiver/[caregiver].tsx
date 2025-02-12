import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Button from "@/components/Button";
import { useCallback, useEffect, useState } from "react";
import { CareData, useCaregiver } from "@/contexts/caregiverContext";
import { useAppointment } from "@/contexts/appointmentContext";
import CustomModal from "@/components/CustomModal";

export default function CaregiverScreen() {
  const { caregiver } = useLocalSearchParams();
  const caregiverId = Array.isArray(caregiver) ? caregiver[0] : caregiver;
  const { caregiverData, loading, error, fetchCaregiver } = useCaregiver();
  const { clearAppointmentData } = useAppointment();
  const [togglePriceModal, setTogglePriceModal] = useState(false);

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      clearAppointmentData();

      return () => clearAppointmentData();
    }, [clearAppointmentData])
  );

  useEffect(() => {
    fetchCaregiver(caregiverId);
  }, [caregiverId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;
  if (!caregiverData) return <EmptyMessage />;

  return (
    <ScrollView style={styles.container}>
      <Header
        caregiver={caregiverData}
        onPress={() => router.push("./appointment")}
      />
      <Body caregiver={caregiverData} />
    </ScrollView>
  );
}

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
    <Text>Chargement...</Text>
  </View>
);

const ErrorMessage = ({ error }: { error: string }) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>Erreur : {error}</Text>
  </View>
);

const EmptyMessage = () => (
  <View style={styles.container}>
    <Text>Aucune donnée à afficher.</Text>
  </View>
);

const Header = ({
  caregiver,
  onPress,
}: {
  caregiver: CareData;
  onPress: () => void;
}) => (
  <View style={styles.header}>
    {caregiver.icon ? (
      <Image source={{ uri: caregiver.icon }} style={styles.icon} />
    ) : (
      <FontAwesome size={100} name="user" style={styles.icon} />
    )}
    <Text style={styles.textHeader}>Dr. {caregiver.name}</Text>
    <Text style={styles.textHeader}>
      {caregiver.caregiverDetails.speciality}
    </Text>
    <View style={styles.button}>
      <Button size="long" styleType="primary" onPress={onPress}>
        <FontAwesome name="calendar" size={18} />
        <Text> PRENDRE RENDEZ-VOUS</Text>
      </Button>
    </View>
  </View>
);
const Body = ({ caregiver }: { caregiver: CareData }) => (
  <View style={styles.body}>
    {caregiver.address && (
      <InfoBlock
        title="Adresse"
        icon="address-book"
        lines={[
          `${caregiver.address.street},`,
          `${caregiver.address.postalCode} ${caregiver.address.city}`,
        ]}
      />
    )}
    {caregiver.caregiverDetails.presentation && (
      <InfoBlock
        title="Présentation"
        icon="user-md"
        lines={[caregiver.caregiverDetails.presentation]}
      />
    )}
    {caregiver.caregiverDetails.price && (
      <PriceBlock price={caregiver.caregiverDetails.price} />
    )}
    {caregiver.caregiverDetails.paymentMeans && (
      <PaymentBlock payment={caregiver.caregiverDetails.paymentMeans} />
    )}
    {caregiver.contact && <ContactBlock contact={caregiver.contact} />}
  </View>
);

const InfoBlock = ({
  title,
  icon,
  lines,
  onPress,
}: {
  title: string;
  icon: keyof typeof FontAwesome.glyphMap;
  lines: string[];
  onPress?: () => void;
}) => (
  <View style={styles.block}>
    <View style={styles.top}>
      <Text style={styles.title}>
        <FontAwesome name={icon} size={18} /> {title}
      </Text>
      {onPress && (
        <TouchableHighlight onPress={onPress}>
          <Text style={styles.seeMore}>Voir plus</Text>
        </TouchableHighlight>
      )}
    </View>
    {lines.map((line, index) => (
      <Text key={index} style={styles.text}>
        {line}
      </Text>
    ))}
  </View>
);

const PriceBlock = ({
  price,
}: {
  price: {
    convention: number;
    prices: {
      price: number;
      title: string;
    }[];
    thirdParty: string;
    vitalCard: boolean;
  };
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <InfoBlock
        title="Tarifs et remboursement"
        icon="euro"
        lines={
          [
            price?.convention && `Conventionné secteur ${price.convention}`,
            price?.thirdParty && `Tiers payant: ${price.thirdParty}`,
            price?.vitalCard &&
              `Carte vitale ${price.vitalCard ? "acceptée" : "refusée"}`,
          ].filter(Boolean) as string[]
        }
        onPress={() => setModalVisible(true)}
      />
      <CustomModal
        onClose={() => setModalVisible(false)}
        size="long"
        visible={modalVisible}
        title="Tarifs"
      >
        {price.prices.map((item, index) => (
          <View style={styles.prices} key={index}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.price}</Text>
          </View>
        ))}
        <Text></Text>
      </CustomModal>
    </>
  );
};

const PaymentBlock = ({
  payment,
}: {
  payment: { card: boolean; cash: boolean; check: boolean };
}) => (
  <InfoBlock
    title="Moyens de paiement"
    icon="credit-card"
    lines={
      [
        payment?.card && "Carte bancaire",
        payment?.cash && "Espèce",
        payment?.check && "Chèques",
      ].filter(Boolean) as string[]
    }
  />
);

const ContactBlock = ({
  contact,
}: {
  contact?: {
    phone?: string;
    email?: string;
  };
}) => (
  <InfoBlock
    title="Contact"
    icon="user-md"
    lines={
      [
        contact?.email && `Email: ${contact.email}`,
        contact?.phone && `Téléphone: ${contact.phone}`,
      ].filter(Boolean) as string[]
    }
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  header: {
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#34659A",
    height: 250,
    zIndex: 20,
  },
  body: {
    flex: 1,
    backgroundColor: "#DFF3FF",
    padding: 10,
  },
  icon: {
    borderColor: "white",
    backgroundColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 100,
    width: 100,
  },
  textHeader: {
    fontSize: 16,
    color: "white",
  },
  text: {
    fontSize: 16,
  },
  button: {
    bottom: -20,
  },
  block: {
    marginTop: 20,
    padding: 20,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: "white",
  },
  prices: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 50,
  },
  seeMore: {
    color: "#34659A",
    fontWeight: "bold",
  },
  top: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

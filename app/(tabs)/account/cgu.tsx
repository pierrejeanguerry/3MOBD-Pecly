import {View, Text, StyleSheet, TouchableOpacity} from "react-native";


export default function Cgu() {
    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Conditions générales d'utilisation</Text>

            <Text style={styles.paragraphe}>
                1. OBJET
                Les présentes Conditions d’Utilisation (ci-après nommées « CU »)
                ont pour objet de définir (i) les conditions d’utilisation des Services
                Pecly et (ii) les droits et obligations de Pecly et de
                l’Utilisateur.
                La Plateforme Pecly offre la possibilité pour l’Utilisateur
                d'accéder aux Services Pecly, notamment aux Services (i)
                d’Annuaire ; (ii) de Prise de Rendez-Vous en Ligne ; (iii) de
                Téléconsultation ; (iv) de Gestion de Document; (v) de Messagerie
                Patient et de Demande de Patient.
                Les Services sont fournis à l’Utilisateur à titre gratuit. Néanmoins
                l’Utilisateur reconnaît que la Plateforme Pecly renvoie à des
                actes ou soins médicaux pratiqués par des Acteurs de santé dans
                le cadre d’une consultation pouvant faire l’objet d’une facturation
                d’honoraires.
                LES CONSULTATIONS EN PRÉSENTIEL OU EN TÉLÉCONSULTATION,
                TOUT COMME LES SERVICES DE MESSAGERIE PATIENT, DE
                DEMANDE DE PATIENT, OU DE PARTAGE DE DOCUMENT NE SONT
                PAS DES SERVICES D'URGENCE. EN CAS D’URGENCE,
                L’UTILISATEUR DOIT APPELER LE 15 OU LE 112 OU SE DIRIGER
                VERS UN SERVICE D’URGENCE.
            </Text>

            <Text style={styles.paragraphe}>
                2. DÉFINITIONS
                Les définitions attachées aux présentes Conditions d’Utilisation
                sont accessibles ici.
            </Text>

            <Text style={styles.paragraphe}>
                3. CONDITIONS D’ACCÈS AUX SERVICES
                L’accès au Service d’Annuaire ne nécessite pas la création d’un
                Compte Utilisateur.
                Tout Utilisateur se créant un Compte Utilisateur afin d'accéder aux
                Services s'engage à respecter, sans réserve, les présentes CU.
                L’Utilisateur accepte les CU de manière expresse, sans restriction
                ni réserve lors de la création de son Compte Utilisateur. La
                création d’un Compte Utilisateur implique l’adhésion pleine et
                entière de l’Utilisateur au Contrat.
                Si l’Utilisateur n’est pas en accord avec tout ou partie des CU, il ne
                doit pas utiliser les Services.
                Les CU sont applicables à compter de leur acceptation par
                l’Utilisateur pendant une durée indéterminée et ce jusqu’à la
                résiliation du Contrat pour les Utilisateurs ayant un Compte
                Utilisateur.
                CAPACITÉ : L’utilisation des Services est réservée aux Utilisateurs
                personnes physiques de plus de quinze (15) ans ayant la capacité
                de souscrire des obligations conformément au droit français et
                européen.
            </Text>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFF3FF",
    },
    titre: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#43193B",
        marginBottom: 15,
    },
    paragraphe: {
        fontSize: 14,
        marginBottom: 12,
        marginHorizontal: 20,

    }


});

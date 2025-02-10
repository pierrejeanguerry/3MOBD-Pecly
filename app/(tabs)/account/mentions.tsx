import {View, Text, StyleSheet, TouchableOpacity} from "react-native";


function onPress(): void {
}

export default function Mentions() {
    return (
        <View style={styles.container}>

            <Text style={styles.titre}>Mentions légales</Text>

            <Text style={styles.paragraphe}>
                1. Éditeur du site
                Le site est édité par Pecly, société par actions simplifiées au capital de 0 euros,
                immatriculée au RCS de Clermont sous le numéro 12345678, dont le siège social est situé au
                34-36 Av. de Cournon, 63170 Aubière et dont le numéro de TVA intracommunautaire
                est FR12345678.
                Le Directeur de la publication est Monsieur Pecly.
            </Text>

            <Text style={styles.paragraphe}>
                2. Hébergement du site
                Platforme de test.
            </Text>

            <Text style={styles.paragraphe}>
                3. Hébergement des données
                Hébergeur agréé de données de santé
                En tant que fournisseur d'un service exploitant, administrant et sauvegardant des données de
                santé à caractère personnel (y compris des données médicales) Pecly est certifié HDS
                (Hébergeur de Données de Santé), conformément à la réglementation française en vigueur
                émanant de l'ANS (l’Agence du Numérique en Santé).
                Pecly a également recours à Amazon Web Services pour l’hébergement des données de
                santé. AWS, dont le siège social est situé 38 avenue John F. Kennedy, L - 1885 Luxembourg,
                est aussi certifié HDS.
                Pecly s’interdit d’utiliser les Données de santé à des fins marketings, publicitaires, ou
                statistiques.
                Hébergement des données de chiffrement
                Pour l’hébergement des données de chiffrement, Pecly a recours à Devoteam G Cloud, dont
                le siège social est situé 11 bis, Quai Perrache, 69002 Lyon.
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

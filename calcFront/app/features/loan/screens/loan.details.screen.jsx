import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useState} from "react";

const LoanDetailScreen = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
    const {monthly, totalAmount} = route.params
  
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 200,
          backgroundColor: "#3F3DFC",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Text style={styles.containerTitle}>Request Loan</Text>
      </View>

      <View style={[styles.cardContainer, {
          zIndex: 9,
          bottom: 30,
          left: 20,
      }]}>
        <Text style={styles.cardTitle}>Estimated payment</Text>
        <Text style={styles.cardText}>KSH {monthly.toFixed(2)}/month</Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center", gap: 10 }}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Estimated payment</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTextLeft}>Loan amount</Text>
            <Text style={styles.cardTextRight}>Ksh {totalAmount}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTextLeft}>Loan period</Text>
            <Text style={styles.cardTextRight}>20 years</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTextLeft}>Loan interest</Text>
            <Text style={styles.cardTextRight}>12%</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View>
            <Text style={styles.cardTitle}>Whats next?</Text>
            <Text style={styles.cardDesc}>
              After applying for loan you'll be shortly contacted by one of our
              loan experts
            </Text>
          </View>
        </View>



      
      </View>
    </View>
  );
};

export default LoanDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F8F8FF",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
  containerTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  cardContainer: {
    alignItems: "center",
    gap: 10,

    width: 350,
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardTitle: {
    color: "#616C88",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardText: { fontWeight: "bold", fontSize: 20 },
  card: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTextLeft: { color: "#616C88" },
  cardTextRight: { color: "#616C88", fontWeight: "bold" },
  cardDesc: { color: "#616C88", fontSize: 14 },
  primaryButton: {
    marginTop: 40,
    backgroundColor: '#3F3DFC',
    borderRadius: 6,
    paddingVertical: 20,
   alignItems: "center",
  },
  buttonText: {
    fontSize: 16, 
    color: '#FCFAFA', 
    fontWeight: 'normal',
  }

});
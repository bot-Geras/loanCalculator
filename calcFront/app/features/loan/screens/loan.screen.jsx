import React, { useState, useEffect } from "react";
import { FlatList,View, StatusBar, TouchableOpacity, StyleSheet, Alert, Text } from "react-native";
import axios from "axios";
import Slider from "@react-native-community/slider";
import { Ionicons } from '@expo/vector-icons'; 
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

const LoanApplicationScreen = ({ navigation }) => {
  const [borrowedAmount, setBorrowedAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(1);
  const [repaymentPeriod, setRepaymentPeriod] = useState(1);
  const [authenticated, setAuthenticated] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  

  useEffect(() => {
    const checkAuthentication = async ({navigation}) => {
      try {
        const response = await fetch(`${API_BASE_URL}/profile`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setAuthenticated(true);
          } else {
            navigation.navigate("Login");
          }
        } else {
          console.error("Error checking authentication:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, [navigation]);

  const calculateLoanDetails = () => {
    const principal = borrowedAmount;
    const rate = interestRate / 100;
    const periods = repaymentPeriod / 12;

    const interest = principal * rate * periods;

    const totalLoanAmount = principal + interest;
    const monthlyPayment = totalLoanAmount / repaymentPeriod;

    setMonthlyPayment(monthlyPayment.toFixed(2));
    setTotalInterest(totalLoanAmount.toFixed(2));
 
    navigation.navigate({name: 'Loan Detail', params: {
        monthly: monthlyPayment,
        totalAmount: totalInterest,

    }})
    
  };

  useEffect(() => {
    let timer = setTimeout(() => {
        calculateLoanDetails()
    }, 10000);
    return () => {
        clearTimeout(timer)
    }
    
  }, [borrowedAmount, repaymentPeriod, interestRate])

  const handleLoanApplication = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/loan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrowedAmount,
          interestRate,
          repaymentPeriod,
        }),
      });

      if (response.ok) {
        console.log("Loan application submitted successfully!");
        calculateLoanDetails();
       
      } else {
        console.error("Loan application failed:", response.statusText);
      }
    } catch (error) {
      console.error("Loan application failed:", error);
    }
  };

  

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "column",
          gap: 10,
        }}
      >
        <TouchableOpacity  onPress={() => navigation.navigate('Home')} style={{
            padding:2,
        }}>
        <Ionicons name="chevron-back" size={24} color="black" 
                           
                        />
        </TouchableOpacity>
        <View style={styles.loanContainer}>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 10,
            }}
          >
            <Text style={styles.header}>Borrowed Account</Text>
            <Text style={styles.loanText}>Ksh{borrowedAmount.toFixed(0)}</Text>
            <Slider
              style={{ width: 300, height: 30, margin: 0 }}
              step={500}
              minimumValue={5000}
        maximumValue={50000}
              minimumTrackTintColor="#3F3DFC"
              maximumTrackTintColor="#000000"
              thumbTintColor="#3F3DFC"
              value={borrowedAmount}
              onValueChange={(value) => setBorrowedAmount(value)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>5,000</Text>
              </View>
              <View style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>50,000</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={styles.header}>Interest Rate:</Text>
            <Text style={styles.loanText}>{interestRate.toFixed(2)}%</Text>
            <Slider
              style={{ width: 300, height: 30 }}
              minimumValue={1}
              maximumValue={30}
              step={0.1}
              minimumTrackTintColor="#3F3DFC"
              maximumTrackTintColor="#000000"
              thumbTintColor="#3F3DFC"
              value={interestRate}
        onValueChange={(value) => setInterestRate(value)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  1
                </Text>
              </View>
              <View style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  30
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text style={styles.header}>Repayment Period:</Text>
            <Text style={styles.loanText}>{repaymentPeriod} months</Text>
            <Slider
              style={{ width: 300, height: 30 }}
              minimumValue={1}
        maximumValue={60}
        step={1}
              minimumTrackTintColor="#3F3DFC"
              maximumTrackTintColor="#000000"
              thumbTintColor="#3F3DFC"
              value={repaymentPeriod}
              onValueChange={(value) => setRepaymentPeriod(value)}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  1
                </Text>
              </View>
              <View style={{ marginTop: 2 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  60
                </Text>
              </View>
            </View>
          </View>
        </View>



        <View style={styles.loanContainer}>
          <Text style={styles.header}>Borrowed Account</Text>
          <Text
            style={[
              styles.loanText,
              {
                marginBottom: 20,
              },
            ]}
          >
            Ksh {borrowedAmount}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "normal",
            }}
          >
            You are borrowing Ksh.{borrowedAmount} over {repaymentPeriod} months at {interestRate.toFixed(2)}% interest Rate with {totalInterest}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLoanApplication}
          style={styles.primaryButton}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
        padding: 20,
        backgroundColor: "#FBFBFB",
        alignItems: "center",
      },
      loanContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: 350,
        borderRadius: 16,
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
      },
      header: {
        fontSize: 16,
      },
      loanText: {
        fontSize: 32,
        fontWeight: "bold",
      },
      primaryButton: {
        marginTop: 10,
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

export default LoanApplicationScreen;



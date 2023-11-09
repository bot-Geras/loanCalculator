import React, { useEffect, useState } from 'react';
import { View,StatusBar, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

const HomeScreen = ({route, navigation}) => {
  const [loanStatus, setLoanStatus] = useState(false);
  const {userInfo} = route.params
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoanStatus = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/loan-status`);
        setLoanStatus(response.data);
      } catch (error) {
        console.error('Error fetching loan status:', error.response.data);
        
      }
    };

    fetchLoanStatus();
  }, []);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/all-loans`);
        if (response.ok) {
          const data = await response.json();
          setLoans(data);
        } else {
          console.error("Error fetching loans:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, []); 




  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'column',
        marginBottom: 20,
      }}>
        <Text style={{fontSize: 20,}}>Hello,</Text>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{userInfo.name}</Text>
      </View>
      {loanStatus ? (
        <><View style={[styles.cardContainer]}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'normal'
          }}>balance</Text>
          <Text>
          {/* Loan Status: {loanStatus.status}{'\n'} */}
          ${loanStatus.borrowedAmount}{'\n'}
          {/* Interest Rate: {loanStatus.interestRate}%{'\n'} */}
          {/* Repayment Period: {loanStatus.repaymentPeriod} months */}
        </Text>
          </View></>
      ) : (
        <Text>Loading loan status...</Text>
      )}
      <View style={[styles.cardContainer, {
        backgroundColor: '#E4E9F1',
      }]}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 24,
        }}>Make a Loan</Text>
        <Text style={{
          fontWeight: "normal",
          fontSize: 16,
        }}>Request your loans and get your money in your balance.</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Loan Application')} style={styles.primaryButton}>
        <Ionicons name="add-circle-outline" size={24} color="white" 
                     
                    />
          <Text style={{
             color: '#fff',
             fontSize: 14,
          }}>Create an Application</Text>
        </TouchableOpacity>

      </View>
      <Text style={{
         fontWeight: "bold",
         marginBottom: 20,
      }} >Loans</Text>
      <View style={{
        flex:1
      }}>
      <FlatList data={loans}
      keyExtractor={(item) => item._id} 
      ListFooterComponent={<View style={{height: 20}}/>}
      renderItem={({ item }) => (
        <View style={styles.loanItem}>
          <Text style={styles.loanText}>Loan Amount: Ksh {item.borrowedAmount}</Text>
          <Text style={styles.loanText}>Interest Rate: {item.interestRate.toFixed(2)}%</Text>
          <Text style={styles.loanText}>Repayment Period: {item.repaymentPeriod} months</Text>
          <Text style={[styles.loanText, {backgroundColor: 'green', color: '#fff'}]}>status: {item.status} </Text>
          <View style={styles.separator} />
        </View>
      )}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop: StatusBar.currentHeight,
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: "left",
    gap: 10,

    width: 350,
    borderRadius: 10,
    padding: 24,
    backgroundColor: "#fff",
    elevation: 2,
    marginBottom: 20,
  },
  primaryButton: {
    flexDirection:'row',
    alignItems: 'center',
    gap: 4,
    width: 200,
    marginTop: 10,
    backgroundColor: "#000000",
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
   
  },
  loanItem: {
    marginBottom: 20,
    padding: 24,
    backgroundColor: "#fff",
    
  },
  loanText: {
    fontSize: 16,
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
    marginVertical: 8,
  },
});

export default HomeScreen;
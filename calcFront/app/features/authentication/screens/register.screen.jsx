import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL 

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async ([navigation]) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
      });

      console.log("Registration successful!", response.data);
     
      navigation.navigate('Login')
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginVertical: 10,
          }}
        >
          Create an Account
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "normal",
            marginBottom: 36,
          }}
        >
          Sign up
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 5,
          marginTop: 10,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        onPress={handleRegistration}
        style={styles.primaryButton}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          marginTop: 40,
          alignItems: "center",
        }}
      >
        <Text>You Already have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    marginTop: StatusBar.currentHeight,
    padding: 16,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 24,

    color: "#000000",
  },
  primaryButton: {
    marginTop: 20,
    backgroundColor: "#3F3DFC",
    borderRadius: 24,
    paddingVertical: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#FCFAFA",
    fontWeight: "normal",
  },
});

export default RegistrationScreen;

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import axios from "axios";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL 
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        
        navigation.navigate('Home', {userInfo: data})
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Login failed:", error);
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
          Welcome back
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "normal",
            marginBottom: 36,
          }}
        >
          Login in with your email and password
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 10,
          marginTop: 10,
        }}
      >
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

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Accept our terms and conditions</Text>
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.primaryButton}>
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
        <Text>You dont have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Sign up
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
    width: 30,
    height: 30,
    borderColor: "#000000",
    borderRadius: 10,
  },
  label: {
    margin: 8,
    fontSize: 16,
  },
});

export default LoginScreen;

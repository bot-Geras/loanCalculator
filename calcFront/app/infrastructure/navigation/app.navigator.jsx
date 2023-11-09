import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import LoginScreen from "../../features/authentication/screens/login.screen";
import RegistrationScreen from "../../features/authentication/screens/register.screen";
import LoanApplicationScreen from "../../features/loan/screens/loan.screen";
import HomeScreen from "../../features/loan/screens/home.screen";
import LoanDetailScreen from "../../features/loan/screens/loan.details.screen";
import { Ionicons } from "@expo/vector-icons";
const AppStack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          gestureEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        }}
      >
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false,
            gestureEnabled: false,
            ...TransitionPresets.BottomSheetAndroid, }}
        />
        <AppStack.Screen
          name="Loan Application"
          component={LoanApplicationScreen}
          options={{
            headerShown: false,
            ...TransitionPresets.BottomSheetAndroid,
            headerLeft: () => (
              <Ionicons
                name="chevron-back"
                size={24}
                color="black"
                onPress={() => navigation.navigate("Home")}
              />
            ),
          }}
        />

        <AppStack.Screen
          name="Loan Detail"
          component={LoanDetailScreen}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "vertical",
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

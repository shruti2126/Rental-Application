/** @format */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  CheckBox,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authenticate } from "../environment/config.js";
import saveToFirestore from "../Hooks/registerNewUser";

import {
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../environment/config.js";
import getHousingUnits from "../Hooks/getHousing";

type screenState = "neither" | "login" | "register";

type loginScreenProps = {
  navigation: any;
};

const LoginScreen: React.FC<loginScreenProps> = ({ navigation }) => {
  const styles = getStyles();

  const [curState, setScreenState] = useState<screenState>("neither");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLandLord, setIsLandLord] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  //const isLandLord = navigation.getParam("isLandLord");

  return (
    <View style={styles.container}>
      {/* Initial Screen, user can login or register */}
      {curState == "neither" && (
        <View style={styles.card}>
          <Button
            onPress={() => {
              setScreenState("login");
            }}
            title="Login"
          />
          <Button
            onPress={() => {
              setScreenState("register");
            }}
            title="Register"
          />
        </View>
      )}

      {/* Login State, user can log in */}
      {curState == "login" && (
        <View style={styles.card}>
          <Button
            onPress={() => {
              setStatus("");
              setScreenState("neither");
            }}
            title="Back"
          />
          <Text>Email</Text>
          <TextInput onChangeText={setEmail} value={email} />
          <Text>Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <Button
            onPress={async () => {
              // login with hook and navigate to new screen
              signInWithEmailAndPassword(authenticate, email, password)
                .then(async () => {
                  // Signed in
                  let email = authenticate.currentUser?.email;
                  const q = query(
                    collection(db, "users"),
                    where("email", "==", email)
                  );
                  const querySnapshot = await getDocs(q);
                  querySnapshot.forEach((document) => {
                    const data = document.data();
                    setIsLandLord(data["Landlord"]);

                    navigationController(
                      navigation,
                      email,
                      data["Landlord"],
                      data["apartment"]
                    );
                  });

                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setStatus(error.code + error.message);
                });
            }}
            title="Login"
          />
          <Text style={{ color: "red" }}>{status}</Text>
        </View>
      )}

      {/* Register State, user can register new account */}
      {curState == "register" && (
        <View style={styles.card}>
          <Button
            onPress={() => {
              setScreenState("neither");
              setStatus("");
              setEmail("");
              setPassword("");
            }}
            title="Back"
          />
          <Text>Email</Text>
          <TextInput onChangeText={setEmail} value={email} />
          <Text>Password</Text>
          <TextInput
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <Text>I'm a LandLord</Text>
          <CheckBox value={isLandLord} onValueChange={setIsLandLord} />
          <Button
            onPress={() => {
              // Register with hook and navigate to next screen
              createUserWithEmailAndPassword(authenticate, email, password)
                .then(() => {
                  saveToFirestore(isLandLord, email);
                  navigationController(navigation, email, isLandLord);
                  console.log("User account created & signed in!");
                  //navigation.navigate("ViewProperties", { isLandLord });
                })

                .catch((error) => {
                  if (error.code === "auth/email-already-in-use") {
                    setStatus("That email address is already in use!");
                  }

                  if (error.code === "auth/invalid-email") {
                    setStatus("That email address is invalid!");
                  }

                  setStatus(error.message);
                });
            }}
            title="Register"
          />
          <Text style={{ color: "red" }}>{status}</Text>
        </View>
      )}
    </View>
  );
};

const navigationController = async (
  navigation: any,
  email: string,
  isLandLord: boolean,
  propertyName?: String
) => {
  if (isLandLord) {
    getHousingUnits().then((properties) => {
      navigation.navigate("ViewProperties", { email, isLandLord, properties });
    });
  } else {
    if (propertyName !== "" && propertyName !== undefined) {
      // GET THE SPECIFIC PROPERTY IF THE STRING IS NOT EMPTY
      let property: Object = {};
      const q = query(
        collection(db, "housing"),
        where("name", "==", propertyName)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((document) => {
        property = document.data();
        navigation.navigate("RentalAppInfo", {
          email,
          isLandLord: false,
          property,
        });
      });
    } else {
      getHousingUnits().then((properties) => {
        navigation.navigate("ViewProperties", {
          email,
          isLandLord: false,
          properties,
        });
      });
    }
  }
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d1fff4",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 20,
      marginBottom: 20,
    },
    p: {
      fontSize: 12,
      color: "#000",
    },
  });
};

export default LoginScreen;

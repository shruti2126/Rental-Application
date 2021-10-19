/** @format */

import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { signOut, getAuth } from "firebase/auth";

interface props {
  navigation: any;
}

// to use: just call the component and pass the navigation object as a prop
// <SignoutButton navigation={navigation} />

const SignOutButton: React.FC<props> = ({ navigation }) => {
  const styles = createStyles();
  return (
    <Button
      onPress={() => {
        // sign out functionality
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            navigation.popToTop();
            console.log("YOU HAVE SIGNED OUT SUCCESSFULLY");
            navigation.popToTop();
          })
          .catch((error) => {
            // An error happened.
          });
      }}
      title="Sign Out"
    />
  );
};

const createStyles = () => {
  return StyleSheet.create({
    // for Alex
  });
};

export default SignOutButton;

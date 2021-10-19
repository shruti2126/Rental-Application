/** @format */

import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../Environment/config";
import {
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";

type propType = {
  navigation: any;
};

const ApplyToProperty: React.FC<propType> = ({ navigation }) => {
  const property = navigation.getParam("property");
  //const email = 'hi@hi.hi'
  const styles = getStyles();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.h1}>Apply to {property.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.p}>email:</Text>
        <TextInput value={email} onChangeText={setEmail} />
        <Text style={styles.p}>Your Name:</Text>
        <TextInput value={name} onChangeText={setName} />
        <Text style={styles.p}>Previous Address:</Text>
		<TextInput value={addr} onChangeText={setAddr} />
        <Button
			onPress={async () => {
            const appStr = email + ":" + name + ":" + addr;
            var docName = property.name;
            const docRef = doc(db, "housing", docName);
            await updateDoc(docRef, {
              Applications: arrayUnion(appStr),
            });
            navigation.goBack();
          }}
          title="Submit Application"
        />
      </View>
    </View>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#d1fff4",
      flex: 1,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 20,
      marginBottom: 20,
    },
    h1: {
      fontSize: 18,
      color: "#000",
    },
    h2: {
      fontSize: 14,
      color: "#000",
    },
    p: {
      fontSize: 12,
      color: "#000",
    },
  });
};

export default ApplyToProperty;

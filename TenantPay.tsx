/** @format */

import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../environment/config.js";
import {
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
type propType = {
  navigation: any;
};

const TenantPay: React.FC<propType> = ({ navigation }) => {
  const property = navigation.getParam("property");
  const setBal = navigation.getParam("setBal");
  const bal = navigation.getParam("bal");
  const styles = getStyles();

  const [amnt, setAmnt] = useState("");
  const [credit, setCredit] = useState("");
  const [exprDate, setExprDate] = useState("");
  const [code, setCode] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.h1}>Apply to {property.name}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.p}>Amount:</Text>
        <TextInput value={amnt} onChangeText={setAmnt} />
        <Text style={styles.p}>Credit Card:</Text>
        <TextInput value={credit} onChangeText={setCredit} />
        <Text style={styles.p}>Expiration Date:</Text>
        <TextInput value={exprDate} onChangeText={setExprDate} />
        <Text style={styles.p}>Security Code</Text>
        <TextInput value={code} onChangeText={setCode} />
        <Button
          onPress={async () => {
            // modify document in firestore
            const amount =
              parseInt(amnt) === NaN || parseInt(amnt) < 0 || amnt === ""
                ? 0
                : parseInt(amnt);
			setBal(bal - amount);
			const docRef = doc(db, "housing", property.name);
			await updateDoc(docRef, {
				balance: bal - amount
			});
            navigation.goBack();
          }}
          title="Pay Rent"
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

export default TenantPay;

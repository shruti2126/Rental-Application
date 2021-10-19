/** @format */

import React, { useState } from "react";
import { StyleSheet, Button, View, Text, TextInput } from "react-native";
import { app } from "../environment/config";
import { db } from "../environment/config";
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
const RentalAppInfo: React.FC<propType> = ({ navigation }) => {
  const styles = getStyles();
  const property = navigation.getParam("property");
  const isLandLord = navigation.getParam("isLandLord");
  const [bal, setBal] = useState(property.balance);
  const [lateFee, setLateFee] = useState<string>("0");
  const [discount, setDiscount] = useState<string>("0");
  const [applications, setApplications] = useState<string[]>(
    property.Applications.filter((app: string) => {
      return app !== "";
    })
	);
	const removeApp = (app: string) => {
    setApplications(
      applications.filter((application) => {
        return application !== app;
      })
    );
  };
  const [requests, setRequests] = useState<string[]>(
    property.mRequests.filter((req: string) => {
      return req !== "";
    })
  );
  const removeReq = (request: string) => {
    setRequests(
      requests.filter((req) => {
        return req !== request;
      })
    );
  };
  const [rentPay, setRentPay] = useState<string>("");
  const payRent = (bal: number) => {
    setBal(bal);
    setRentPay("Thank you for paying rent!");
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.h1}>{property.name}</Text>
        <Text style={styles.p}>{property.address}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.h1}>Rent Status</Text>
        <Text style={styles.h2}>You Owe {"$" + bal}</Text>
        {isLandLord && (
          <View>
            <TextInput onChangeText={setLateFee} value={lateFee} />
            <Button
              onPress={async () => {
                let fee =
                  parseInt(lateFee) === NaN ||
                  lateFee === "" ||
                  parseInt(lateFee) < 0
                    ? 0
                    : parseInt(lateFee);
                setBal(bal + fee);
                await setDoc(doc(db, "housing", property.name), {
                  ...property,
                  balance: bal + fee,
                });
              }}
              title="Add Late Fee"
            />
            <TextInput onChangeText={setDiscount} value={discount} />
            <Button
              onPress={async () => {
                let fee =
                  parseInt(discount) === NaN ||
                  discount === "" ||
                  parseInt(discount) < 0
                    ? 0
                    : parseInt(discount);
                setBal(bal - fee);
                await setDoc(doc(db, "housing", property.name), {
                  ...property,
                  balance: bal - fee,
                });
              }}
              title="Add Discount"
            />
          </View>
        )}
      </View>
      <View style={styles.card}>
        {isLandLord && (
          <Button
            onPress={() => {
              navigation.navigate("ViewApplications", {
                property: property,
                applications: applications,
                removeApp: removeApp,
              });
            }}
            title="View Current Applications"
          />
        )}
        {!isLandLord && (
          <View>
            <Button
              onPress={() => {
                navigation.navigate("TenantPay", {
                  property: property,
                  bal: bal,
                  setBal: payRent,
                });
              }}
              title="Pay Rent"
            />
            <Text style={{ color: "green" }}>{rentPay}</Text>
          </View>
        )}
      </View>
      <View style={styles.card}>
        <Text style={styles.h1}>Maintinence</Text>
        <Button
          onPress={() => {
            navigation.navigate("Maintinence", {
              property: property,
              isLandLord: isLandLord,
              requests: requests,
              removeReq: removeReq,
            });
          }}
          title={
            isLandLord
              ? "View Maintinence Requests"
              : "Submit a Maintinence Request"
          }
        />
      </View>
    </View>
  );
};
const getStyles = () => {
  return StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#D1FFF4",
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
export default RentalAppInfo;

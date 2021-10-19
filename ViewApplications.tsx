/** @format */

import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../environment/config.js";
import { authenticate } from "../environment/config.js";
import {
  collection,
  updateDoc,
  arrayUnion,
  query,
  where,
  getDocs,
  doc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
type propType = {
  navigation: any;
};
const ViewApplications: React.FC<propType> = ({ navigation }) => {
  const removeApp = navigation.getParam("removeApp");
  const property = navigation.getParam("property");
  const styles = getStyles();
  const [applications, setApplications] = useState(
    property.Applications.filter((app: String) => {
      return app !== "";
    })
  );

  const remove_App = (app: string) => {
    setApplications(
      applications.filter((application) => {
        return application !== app;
      })
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.h1}>Current Applications for {property.name}</Text>
      </View>
      {applications.map((app: string, i: number) => {
        const details = app.split(":");
        return (
          <View style={styles.card}>
            <Text style={styles.p}>Email: {details[0]}</Text>
            <Text style={styles.p}>Previous Address: {details[1]}</Text>
            <Text style={styles.p}>Name: {details[2]}</Text>
            <Button
              onPress={async () => {
                //Populate Apartment field in user doc with property name
                const q = query(
                  collection(db, "users"),
                  where("email", "==", details[0])
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (document) => {
                  let docid = document.id;
                  const docRef = doc(db, "users", docid);
                  await updateDoc(docRef, { apartment: property.name });
                });

                removeApp(app);
                remove_App(app);
              }}
              title="Accept"
            />
            <Button
              onPress={async () => {
                //Delete application from applications list firestore housing document
                const docRef = doc(db, "housing", property.name);
                const docSnap = await getDoc(docRef);
                let apps = docSnap.data().Applications;
                let i = 0;
                apps.forEach(async (application) => {
                  if (application == app) {
                    await updateDoc(docRef, {
                      Applications: arrayRemove(application),
                    });
                  }
                  i++;
                });
                removeApp(app);
                remove_App(app);
              }}
              title="Reject"
            />
          </View>
        );
      })}
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
export default ViewApplications;

/** @format */

import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
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
  arrayRemove,
} from "firebase/firestore";

type propType = {
  navigation: any;
};

const Maintinence: React.FC<propType> = ({ navigation }) => {
  const styles = getStyles();
  const property = navigation.getParam("property");
  const removeReq = navigation.getParam("removeReq");
  const isLandLord = navigation.getParam("isLandLord");

  const [requests, setRequests] = useState(navigation.getParam("requests"));
  const removeMReq = (request: string) => {
    setRequests(
      requests.filter((req) => {
        return req !== request;
      })
    );
  };

  const [request, setRequest] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  if (isLandLord) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.h1}>Requests for {property.name}</Text>
        </View>

        {requests.map((request: string, i: number) => {
          const req = request.split(":");
          return (
            <View style={styles.card} key={i}>
              <Text style={styles.h2}>Request: </Text>
              <Text style={styles.p}>{req[0]}</Text>
              <Text style={styles.h2}>Priority: </Text>
              <Text style={styles.p}>{req[1]}</Text>
              <Button
                onPress={async () => {
                  const docRef = doc(db, "housing", property.name);
                  const docSnap = await getDoc(docRef);
                  let reqs = docSnap.data()?.mRequests;
                  let i = 0;
                  reqs.forEach(async (req) => {
                    if (req == request) {
                      await updateDoc(docRef, {
                        mRequests: arrayRemove(req),
                      });
                    }
                    i++;
                  });
                  removeReq(request);
                  removeMReq(request);
                }}
                title="Resolve Request"
              />
            </View>
          );
        })}
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.h1}>Submit request for {property.name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.h2}>Enter your request</Text>
          <TextInput onChangeText={setRequest} value={request} />
          <Text style={styles.h2}>Enter the request Priority</Text>
          <TextInput onChangeText={setPriority} value={priority} />
          <Button
            onPress={async () => {
              // submit request
              const str = request + ":" + priority;
              const docRef = doc(db, "housing", property.name);
              await updateDoc(docRef, {
                mRequests: arrayUnion(str),
              });
              setRequest("");
              setPriority("");
            }}
            title="Submit"
          />
        </View>
      </View>
    );
  }
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

export default Maintinence;

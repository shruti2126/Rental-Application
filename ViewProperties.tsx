/** @format */

import React, { useState } from "react";
import { StyleSheet, Button, ScrollView, Text } from "react-native";
import PropertyCard from "../Components/PropertyCard";
import SignOutButton from "../Components/SignOut";

type propType = {
  navigation: any;
};

type user = {
  userName: string;
  password: string;
  isLandLord: boolean;
};

type property = {
  name: string;
  address: string;
  price: number;
  LandLord: String;
  mRequests: string[][];
  applications: String[][];
};
const getProperties = (
  properties: property[],
  isLandLord: boolean,
  email: string
) => {
  if (isLandLord) {
    properties = properties.filter((prop) => {
      return prop.owner === email;
    });
  }
  return properties;
};
const ViewProperties: React.FC<propType> = ({ navigation }) => {
  const styles = getStyles();
  const email = navigation.getParam("email");
  const isLandLord = navigation.getParam("isLandLord");
  const [properties, setProperties] = useState(
    getProperties(navigation.getParam("properties"), isLandLord, email)
  );

  const removeProperty = (i: number) => {
    let newProperties = Array.from(properties);
    newProperties.splice(i, 1);
    setProperties(newProperties);
  };
  return (
    <ScrollView style={styles.container}>
      {properties.map((prop, i) => {
        return (
          <PropertyCard
            isLandLord={isLandLord}
            property={prop}
            navigation={navigation}
            key={i}
            removeProperty={removeProperty}
          />
        );
      })}
      <SignOutButton navigation={navigation} />
    </ScrollView>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#d1fff4",
    },
  });
};

export default ViewProperties;

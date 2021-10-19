import React from 'react';
import { Button, StyleSheet, Text, View } from "react-native";

interface propertyCardProps {
	isLandLord: boolean,
	property: Object
	navigation: any,
	removeProperty: any,
	key: number
}

const PropertyCard: React.FC<propertyCardProps> = ({ isLandLord, property, navigation, removeProperty, key }) => {
	const styles = createStyles();
	const btnText = isLandLord ? 'View Property' : 'Apply Now'

	return (
		<View style={styles.card}>
			<Text style={styles.h1}>{property.name}</Text>
			<Text style={styles.p}>{property.address}</Text>
			<Text style={styles.p}>{'$' + property.price}</Text>
			{isLandLord &&
				<Button 
					onPress={() => {
						navigation.navigate('RentalAppInfo', {property: property, isLandLord: isLandLord})
					}} 
					title={btnText} 
				/>
			}
			{!isLandLord && 
				<Button 
					onPress={() => {
						navigation.navigate('SubmitApplication', {property: property, removeProperty: removeProperty, key: key})
					}} 
					title={btnText} 
				/>
			}
			
		</View>
	)
}

const createStyles = () => {
	return StyleSheet.create({
		card: {
			backgroundColor: '#fff',
			borderRadius: 5,
			padding: 20,
			marginBottom: 20,
		},
		h1: {
			fontSize: 18,
			color: '#000',
		},
		p: {
			fontSize: 12,
			color: '#000',
		}
	})
}

export default PropertyCard;
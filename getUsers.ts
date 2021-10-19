// docs primarily used for development of this file 
// https://firebase.google.com/docs/firestore/query-data/get-data

const getLandLord = () => {
	return {
		userName: 'admin',
		password: 'password',
		isLandLord: true
	}
}

const getTenant = () => {
	return { 
		userName: 'guyMcMan',
		password: 'realhuman',
		isLandLord: false
	}
}

export getLandLord, getTenant;
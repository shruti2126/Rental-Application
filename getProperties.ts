const getProperties = () => {
	return [
		{
			name: 'Wowee Apartments',
			address: '123 Road St',
			price: 825,
			balance: 500,
			isRented: false,
			LandLord: "email@gmail.com",
			mRequests: [['bro, how do i do the dryer?', 'low']],
			applications: ['h:h:h']
		},
		{
			name: 'Badger House',
			address: '155 Road St',
			price: 706,
			isRented: false,
			tenants: [
				{userName: 'guyMcMan', password: 'password', isLandLord: false}
			],
			owner: {userName: 'admin', password: 'password', isLandLord: true},
			mRequests: [['The windows are just completely gone???', 'please help me']]

		},
		{
			name: 'Already Leased Row',
			address: '445 nice-part-of-town St.',
			price: 500,
			isRented: true,
			tenants: [
				{userName: 'guyMcMan', password: 'password', isLandLord: false}
			],
			owner: {userName: 'admin', password: 'password', isLandLord: true},
			mRequests: [['The windows are just completely gone???', 'please help me']]
		},
		{
			name: 'Not a methlab place',
			address: '123 meth St',
			price: 100,
			isRented: false,
			tenants: [
			],
			owner: {userName: 'admin', password: 'password', isLandLord: true},
			mRequests: [['Smells like meth', 'high'], ['left my meth there, sorry', 'extreme']]
		},
	]
}

export default getProperties
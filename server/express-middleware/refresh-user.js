import ActiveDirectory from 'activedirectory'

import generateId from '../api/utils/generate-id'


const { AD_URL, AD_BASE_DN, AD_USERNAME, AD_PASSWORD, AD_GROUP_OPERATORS } = process.env
const adConfig = {
	url: AD_URL,
	baseDN: AD_BASE_DN,
	username: AD_USERNAME,
	password: AD_PASSWORD,
}

const activeDirectory = new ActiveDirectory(adConfig)
const adOptions = {
	attributes: ['displayName', 'description', 'postalCode'],
}


const extractSamAccountName = username => username.split('\\')[1]


export default usersCollection => (req, res, next) => {
	const { user } = req
	
	let username
	
	if(user) {
		username = user.username
	} else {
		username = req.connection.user
	}
	
	const samAccountName = extractSamAccountName(username)
	
	activeDirectory.findUser(adOptions, samAccountName, (err, adUser) => {
		if(err) {
			console.log('Error finding user in AD:', err)
			
			res.status(500).send('Error finding user in AD')
		} else {
			const { displayName: englishName, description: hebrewName, postalCode: employeeId } = adUser
			
			activeDirectory.isUserMemberOf(samAccountName, AD_GROUP_OPERATORS, (err, isMember) => {
				if(err) {
					console.log('Error checking AD group membership:', err)
					
					res.status(500).send('Error checking AD group membership')
				} else {
					const role = isMember ? 'operator' : 'user'
					
					if(user) {
						if(role !== user.role ||
								((englishName || user.englishName) && (englishName !== user.englishName)) ||
								((hebrewName || user.hebrewName) && (hebrewName !== user.hebrewName)) ||
								((employeeId || user.employeeId) && (employeeId !== user.employeeId))) {
							usersCollection.update({ _id: user._id }, {
								$set: {
									role,
									englishName,
									hebrewName,
									employeeId,
								},
							}).then(() => {
								req.user = {
									_id: user._id,
									username,
									role,
									englishName,
									hebrewName,
									employeeId,
								}
								
								next()
							}).catch(err => {
								console.log('Error updating user record in DB:', err)
								
								res.status(500).send('Error updating user record in DB')
							})
						} else {
							next()
						}
					} else {
						const newUser = {
							_id: generateId(),
							username,
							role,
							englishName,
							hebrewName,
							employeeId,
						}
						
						usersCollection.insertOne(newUser).then(() => {
							req.user = newUser
							
							next()
						}).catch(err => {
							console.log('Error creating user record in DB:', err)
							
							res.status(500).send('Error creating user record in DB')
						})
					}
				}
			})
		}
	})
}

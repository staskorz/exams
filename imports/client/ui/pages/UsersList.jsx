import React from 'react'

import filter from '/imports/client/ui/hocs/filter'
import withUsers from '/imports/client/ui/containers/with-users'
import UsersTable from '/imports/client/ui/components/UsersTable'


const withFilter = filter({
	prop: 'users',
	func: (users, filterValue) => users.filter(({ hebrewName, username, employeeId }) => {
		return hebrewName && hebrewName.includes(filterValue) ||
				username && username.toLowerCase().includes(filterValue) ||
				employeeId && employeeId.includes(filterValue)
	}),
})


export default withUsers(withFilter(UsersTable))

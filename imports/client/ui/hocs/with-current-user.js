import { withProps } from 'recompose'


export default withProps({
	currentUser: {
		username: 'DUMMY_USERNAME',
		englishName: 'DUMMY English Name',
		hebrewName: 'סתם שם בעברית',
		employeeId: '1234',
		role: 'operator',
	},
})

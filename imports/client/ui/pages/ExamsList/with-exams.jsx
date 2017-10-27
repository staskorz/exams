import { lifecycle } from 'recompose'


export default lifecycle({
	state: {
		loading: true,
	},
	
	componentDidMount() {
		console.log('setting timeout')
		
		setTimeout(() => {
			console.log('timeout kicked off')
			
			this.setState({
				loading: false,
				
				exams: [{
					'_id': 'ih4MX9w7LTv8u8wke',
					'name': 'הסמכת מפעיל- בטיחות בקרינה',
					'createdAt': '2016-10-25T11:25:54.041Z',
					'updatedAt': '2017-09-27T07:57:30.250Z',
					'published': false,
				}, {
					'_id': 'xnwgSxPRziDSdJ9RC',
					'name': 'תפ"י וניהול פרויקטים- הרכבות',
					'published': false,
					'createdAt': '2016-10-31T09:37:48.490Z',
					'updatedAt': '2016-11-30T07:39:10.139Z',
				}, {
					'_id': '8HRC95QR5BrcTaztz',
					'name': 'מבחן הסמכה IPC-7711/7721',
					'createdAt': '2016-11-07T11:19:06.721Z',
					'updatedAt': '2016-12-08T10:40:01.833Z',
					'published': false,
				}],
			})
		}, 1000)
	},
})

export default fetch => (path, method, json) => fetch(path, {
	method,
	body: JSON.stringify(json),
	credentials: 'same-origin',
	headers: {
		'Content-Type': 'application/json',
	},
}).then(response => {
	if(!response.ok) {
		const error = new Error('Fetch failed')
		error.status = response.status
		error.statusText = response.statusText
		
		throw error
	}
	
	return response
}).then(response => response.json())

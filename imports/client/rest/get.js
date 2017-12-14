export default fetch => path => fetch(path).then(response => {
	if(!response.ok) {
		const error = new Error('Fetch failed')
		error.status = response.status
		error.statusText = response.statusText
		
		throw error
	}
	
	return response
}).then(response => response.json())

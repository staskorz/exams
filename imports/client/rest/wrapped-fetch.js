export default fetch => (path, method) => fetch(path, { method }).then(response => {
	if(!response.ok) {
		const error = new Error('Fetch failed')
		error.status = response.status
		error.statusText = response.statusText
		
		throw error
	}
	
	return response
}).then(response => response.json())

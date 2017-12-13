export default fetch => path => fetch(path).then(response => {
	if(!response.ok) {
		throw {
			status: response.status,
			statusText: response.statusText,
		}
	}
	
	return response
}).then(response => response.json())

export default wrappedFetch => (path, json) => wrappedFetch(path, 'PUT', json)

export default wrappedFetch => (path, json) => wrappedFetch(path, 'GET', json)

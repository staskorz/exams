export default wrappedFetch => (path, json) => wrappedFetch(path, 'POST', json)

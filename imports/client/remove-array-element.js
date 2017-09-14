export default (arr, index) => [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)]

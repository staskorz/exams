export default (arr, index, element) => [...arr.slice(0, index), element, ...arr.slice(index + 1, arr.length)]

export default tags => (tags || []).filter(tag => typeof tag === 'string' && tag.length < 100)

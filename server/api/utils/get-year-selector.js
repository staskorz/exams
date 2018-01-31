const beginningOfYear = year => new Date(Date.parse(year))


export default year => ({
	$gte: beginningOfYear(year),
	$lt: beginningOfYear(year + 1),
})

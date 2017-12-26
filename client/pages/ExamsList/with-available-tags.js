import { withProps } from 'recompose'


export default withProps(({ exams }) => ({
	availableTags: exams.reduce((acc, { tags }) => [...acc, ...tags.filter(tag => !acc.includes(tag))], []).sort(),
}))

import sanitize from './exam-answers'


const src1 = [
	[true, '', false, true],
	[true, 'asdf', false, true],
	[true, null, false, true],
	[true, undefined, false, true],
	[true, [1, 2, 3], false, true],
]

const expected = [
	[true, false, false, true],
	[true, true, false, true],
	[true, false, false, true],
	[true, false, false, true],
	[true, true, false, true],
]


describe('validates exam answers', () => {
	it('returns two-dimensional array with boolean values only', () => {
		expect(sanitize(src1)).toEqual(expected)
	})
})

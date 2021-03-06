import arrayShuffle from 'lodash.shuffle'


export default sourceArray => {
	const length = sourceArray.length
	
	const arrayWithOrderedNumbers = []
	
	for(let i = 0; i < length; i++) {
		arrayWithOrderedNumbers.push(i)
	}
	
	const arrayWithShuffledNumbers = arrayShuffle(arrayWithOrderedNumbers)
	
	const shuffledArray = arrayWithShuffledNumbers.map(number => sourceArray[number])
	
	
	const unShuffle = sourceArrayShuffled => {
		const reconstructedOriginalOrderArray = new Array(length)
		
		for(let i = 0; i < length; i++) {
			reconstructedOriginalOrderArray[arrayWithShuffledNumbers[i]] = sourceArrayShuffled[i]
		}
		
		return reconstructedOriginalOrderArray
	}
	
	
	return {
		shuffledArray,
		unShuffle,
	}
}

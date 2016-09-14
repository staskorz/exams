import arrayShuffle from 'lodash.shuffle';


export default sourceArray => {
	const length = sourceArray.length;
	
	const arrayWithOrderedNumbers = [];
	
	for(let i = 0; i < length; i++) {
		arrayWithOrderedNumbers.push(i);
	}
	
	const arrayWithShuffledNumbers = arrayShuffle(arrayWithOrderedNumbers);
	
	const shuffledArray = arrayWithShuffledNumbers.map(number => sourceArray[number]);
	
	
	const unShuffle = sourceArrayShuffled => {
		const reconstructedOriginalArray = [];
		
		for(let i = 0; i < length; i++) {
			reconstructedOriginalArray.push(sourceArrayShuffled[arrayWithShuffledNumbers.indexOf(i)]);
		}
		
		return reconstructedOriginalArray;
	};
	
	
	return {
		shuffledArray,
		unShuffle
	};
};

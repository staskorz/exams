import arrayShuffle from 'lodash.shuffle';


export default sourceArray => {
	const arrayWithEmptyElements = new Array(sourceArray.length);
	
	const arrayWithOrderedNumbers = arrayWithEmptyElements.map((elem, index) => index);
	
	const arrayWithShuffledNumbers = arrayShuffle(arrayWithOrderedNumbers);
	
	const shuffledArray = arrayWithShuffledNumbers.map(number => sourceArray[number]);
	
	
	const unShuffle = (sourceArrayShuffled) => {
		const targetArray = new Array(sourceArrayShuffled.length);

		return targetArray.map((elem, index) => sourceArrayShuffled[arrayWithShuffledNumbers.indexOf(index)]);
	};
	
	
	return {
		shuffledArray,
		unShuffle
	};
};

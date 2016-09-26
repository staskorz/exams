export default (correctAnswer, examineeAnswer) => correctAnswer.every(({ correct }, index) => !!correct === !!examineeAnswer[index]);

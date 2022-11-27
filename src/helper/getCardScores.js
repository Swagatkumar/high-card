const getCards = () => {
  let scores = [];
  let number = 1;
  while (scores.length < 5) {
    let score = Math.floor(Math.random() * 100) + 1;
    if (scores.indexOf(score) === -1) {
      scores.push({ number, score, isSelected: false });
      number++;
    }
  }
  return scores;
};

export default getCards;

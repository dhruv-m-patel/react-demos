import words from './words';

export default function generateWords(numberOfWords) {
  const randomWords = [];
  for (let i = 0; i < numberOfWords; i += 1) {
    const index = Math.floor(Math.random() * words.length);
    randomWords.push(words[index]);
  }
  return randomWords;
}

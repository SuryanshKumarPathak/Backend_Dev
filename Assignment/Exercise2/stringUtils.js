function capitalize(text) {
  if (typeof text !== "string") return "";
  if (text.length === 0) return "";
  return text[0].toUpperCase() + text.slice(1);
}


function reverseString(text) {
  if (typeof text !== "string") return "";
  return [...text].reverse().join("");
}


function countVowels(text) {
  if (typeof text !== "string") return 0;
  let count = 0;
  const vowels = "aeiouAEIOU";

  for (let char of text) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}


module.exports = {
  capitalize,
  reverseString,
  countVowels
};

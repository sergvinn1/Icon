// generateKeywords.js

/**
 * Функція для створення суфіксів слова
 * @param {string} word - Слово, для якого потрібно створити суфікси
 * @returns {string[]} - Масив суфіксів слова
 */
const generateSuffixes = (word) => {
    const suffixes = [];
    for (let i = 0; i < word.length; i++) {
      suffixes.push(word.slice(i).toLowerCase());
    }
    return suffixes;
  };
  
  /**
   * Функція для генерації ключових слів з назви іконки
   * @param {string} name - Назва іконки
   * @returns {string[]} - Масив ключових слів
   */
  export const generateKeywords = (name) => {
    const words = name.toLowerCase().split(' ').filter(word => word.length >= 3);
    let keywords = [];
    words.forEach(word => {
      keywords = keywords.concat(generateSuffixes(word));
    });
    return keywords;
  };
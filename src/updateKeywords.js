import { db } from './firebaseConfig.js';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Функція для створення суфіксів слова
const generateSuffixes = (word) => {
  const suffixes = [];
  for (let i = 0; i < word.length; i++) {
    suffixes.push(word.slice(i).toLowerCase());
  }
  return suffixes;
};

// Функція для оновлення документів із суфіксами
const updateKeywords = async () => {
  const iconsCollection = collection(db, 'icons');
  const snapshot = await getDocs(iconsCollection);

  const updatePromises = snapshot.docs.map(async (docSnap) => {
    const data = docSnap.data();
    const name = data.name || '';

    if (!name) return;

    // Розділяємо назву на слова та створюємо суфікси
    const words = name.toLowerCase().split(' ').filter(word => word.length >= 3);
    let keywords = [];
    words.forEach(word => {
      keywords = keywords.concat(generateSuffixes(word));
    });

    // Оновлюємо документ із новими keywords
    await updateDoc(doc(db, 'icons', docSnap.id), {
      keywords: keywords,
    });

    console.log(`Document ${docSnap.id} updated with keywords:`, keywords);
  });

  await Promise.all(updatePromises);
  console.log('Keywords update complete.');
};

updateKeywords().catch(console.error);
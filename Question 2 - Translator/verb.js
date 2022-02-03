const fs = require("fs");
const data = fs.readFileSync("verb.in.txt", "utf8");
const wordsArray = data.split("\n").map((word) => word.replace("\r", ""));

const verbs = [
  {
    tense: "present",
    persons: ["o", "os", "a", "om", "ons", "am"],
  },
  {
    tense: "past",
    persons: ["ei", "es", "e", "em", "est", "im"],
  },
  {
    tense: "future",
    persons: ["ai", "ais", "i", "aem", "aist", "aim"],
  },
];

const persons = ["1st", "2nd", "3rd", "4th", "5th", "6th"];

const discoverVerbName = (word) => {
  let indexLastConsonant = 0;

  for (let i = word.length - 2; i >= 0; i--) {
    const isVowel = /^[aeiou]$/i.test(word[i]);

    if (!isVowel) {
      indexLastConsonant = i;
      break;
    }
  }
  return word.slice(0, indexLastConsonant + 1) + "en";
};

const verifyDuplicates = (verifiedWords, wordObject) => {
  const duplicateIndex = verifiedWords.findIndex((object) => {
    return object.word === wordObject.word;
  });

  if (duplicateIndex !== -1) {
    if (wordObject.ending.length > verifiedWords[duplicateIndex].ending.length) {
      verifiedWords[duplicateIndex] = wordObject;
    }
    return true;
  }
  return false;
};

const structureFileAndSave = (verifiedWordsObjects) => {
  const verifiedWordsArray = verifiedWordsObjects.map((wordObject) => {
    return wordObject.isAVerb === true ? 
    `${wordObject.word} - ${wordObject.verbName}, ${wordObject.tense} tense, ${persons[wordObject.person]} person`
      : `${wordObject.word} - not a verb case`;
  });

  const verifiedWordsString = verifiedWordsArray.join("\n");

  fs.writeFileSync("verb.out.txt", verifiedWordsString);

  console.log("-------------------------");
  console.log("Lista de palavras traduzida, verifique o arquivo verb.out.txt :)");
};

const verifyWords = () => {
  console.log("Lendo a lista de palavras...");
  const verifiedWords = [];

  wordsArray.forEach((word) => {
    let found = false;

    verbs.forEach((verb, tenseIndex) => {
      const personIndex = verb.persons.findIndex((person) => word.endsWith(person));

      if (personIndex !== -1) {
        found = true;

        const wordObject = {
          word: word,
          isAVerb: true,
          verbName: discoverVerbName(word),
          tense: verb.tense,
          tenseIndex: tenseIndex,
          person: personIndex,
          ending: verbs[tenseIndex].persons[personIndex],
        };

        if (!verifyDuplicates(verifiedWords, wordObject, word)) {
          verifiedWords.push(wordObject);
        }
      }
    });

    if (found === false) {
      verifiedWords.push({
        word: word,
        isAVerb: false,
      });
    }
  });

  structureFileAndSave(verifiedWords);
};

verifyWords(wordsArray);
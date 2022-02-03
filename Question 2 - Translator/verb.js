const fs = require("fs");
const data = fs.readFileSync("verb.in.txt", "utf8");
const wordsArray = data.split("\n").map((word) => word.replace("\r", ""));

console.log(wordsArray)

const verbs = [{
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
}];

const persons = ["1st", "2nd", "3rd", "4th", "5th", "6th"]

const verifyDuplicates = (verifiedWords, wordObject) => {
    const duplicateIndex = verifiedWords.findIndex((object) => {
        return object.word === wordObject.word;
    })

    if(duplicateIndex !== -1){
        if (wordObject.ending.length > verifiedWords[duplicateIndex].ending.length){
            verifiedWords[duplicateIndex] = wordObject;
        }
        return true;
    }
    return false
}

const verifyWords = () => {
    const verifiedWords = [];

    wordsArray.forEach((word) => {
        let found = false;

        verbs.forEach((verb, tenseIndex) => {
            const personIndex = verb.persons.findIndex((person) => word.endsWith(person));

            if(personIndex !== -1){
                found = true;

                const wordObject = {
                    word: word,
                    isAVerb: true,
                    tense: verb.tense,
                    tenseIndex: tenseIndex,
                    person: personIndex,
                    ending: verbs[tenseIndex].persons[personIndex]
                }

                if(!verifyDuplicates(verifiedWords, wordObject, word)){
                    verifiedWords.push(wordObject)
                }
            }
        })

        if(found === false){
            verifiedWords.push({
                word: word,
                isAVerb: false,
            })
        }

    });
};

verifyWords(wordsArray);

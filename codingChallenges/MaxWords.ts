const sentences1 = ["alice and bob love leetcode","i think so too","this is great thanks very much"];
const sentences2 = ["please wait","continue to fight","continue to win"];


var mostWordsFound = function(sentences : Array<string>) {
    let wordCount = sentences.map((sentence) => letterCounter(sentence.split('')));
    return Math.max(...wordCount);

};

const letterCounter = (sentence: Array<string>) =>{
    let words = 1;
    sentence.map((chars:string)=> chars=== ' '? words++: null);
    return words;
}

mostWordsFound(sentences1);
mostWordsFound(sentences2);
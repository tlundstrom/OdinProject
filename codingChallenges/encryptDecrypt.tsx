class Encrypter {
  encryptedWordCount: Map<string, number> = new Map<string, number>();
  encryptionMap: Map<string, string> = new Map<string, string>();

  constructor(keys: string[], values: string[], dictionary: string[]) {
    keys.forEach((key, index) => {
      this.encryptionMap.set(key, values[index]);
    });
    dictionary.forEach((word) => {
      const encryptedWord = this.encrypt(word);
      if (encryptedWord !== "") {
        let count = this.encryptedWordCount.get(encryptedWord) ?? 0;
        this.encryptedWordCount.set(encryptedWord, count + 1);
      }
    });
  }

  encrypt(word: string): string {
    let encryptedWord = "";
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!this.encryptionMap.has(char)) {
        return "";
      }
      encryptedWord += this.encryptionMap.get(char);
    }
    return encryptedWord;
  }

  decrypt(word: string): number {
    return this.encryptedWordCount.get(word) ?? 0;
  }
}

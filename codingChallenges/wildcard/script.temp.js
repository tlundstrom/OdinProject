const Node = function () {
  this.children = {};
  this.isWord = false;
};

var WordDictionary = function () {
  this.root = new Node();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;

  console.log(JSON.stringify(node));

  for (let i = 0; i < word.length; i++) {
    if (node.children[word[i]] === undefined) node.children[word[i]] = new Node();

    node = node.children[word[i]];
  }
  node.isWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word, node = this.root, i = 0) {
  if (i === word.length) return node.isWord;

  if (word[i] === ".") {
    for (let child in node.children) {
      if (this.search(word, node.children[child], i + 1)) return true;
    }
  }
  return node.children[word[i]] !== undefined && this.search(word, node.children[word[i]], i + 1);
};

var obj = new WordDictionary();
obj.addWord("bad");
obj.addWord("dad");
obj.addWord("mad");
console.log(obj.search("pad"));
console.log(obj.search("bad"));
console.log(obj.search(".ad"));
console.log(obj.search("b.."));

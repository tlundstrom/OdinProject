class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(sortedArray) {
    this.root = this.buildTree(sortedArray);
  }

  buildTree = (sortedArray) => {
    if (sortedArray.length === 0) return null;
    const midpoint = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[midpoint]);
    newNode.left = this.buildTree(sortedArray.slice(0, midpoint));
    newNode.right = this.buildTree(sortedArray.slice(midpoint + 1));
    return newNode;
  };

  insert = (value) => {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  };

  insertNode = (root, newNode) => {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right == null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  };

  delete = (value) => {
    this.root = this.removeNode(this.root, value);
  };

  removeNode = (node, value) => {
    if (node === null) return node;
    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
    } else {
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) return node.right;
      else if (!node.right) return node.left;
      node.value = this.smallestNode(node.right);
      node.right = this.removeNode(node.right, node.value);
    }
    return node;
  };

  find = (node, value) => {
    if (!node) return null;
    else {
      if (node.value == value) return node;
      else if (value < node.value) {
        return this.find(node.left, value);
      } else {
        return this.find(node.right, value);
      }
    }
  };

  levelOrder(callback, res = [], queue = [this.root]) {
    while (queue.length > 0) {
      const node = queue.shift();
      callback ? callback(node) : res.push(node.value);

      const enqueue = [node?.left, node?.right].filter((value) => value);
      queue.push(...enqueue);
    }
    if (res.length > 0) return res;
  }

  preOrder(callback) {
    const stack = [this.root];
    const res = [];
    if (!this.root) return res;
    while (stack.length) {
      const node = stack.pop();
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
      if (callback) callback(node);
      res.push(node.value);
    }
    if (!callback) return res;
  }
  inOrder(node = this.root, callback, res = []) {
    if (!this.root) return res;
    if (node === null) return;
    this.inOrder(node.left, callback, res);
    callback ? callback(node) : res.push(node.value);
    this.inOrder(node.right, callback, res);
    if (res) return res;
  }
  postOrder(callback) {
    if (!this.root) return [];
    const stack = [this.root];
    const results = [];
    while (stack.length) {
      const node = stack.pop();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      if (callback) callback(node);
      results.push(node.value);
    }
    if (!callback) return results;
  }

  height(node) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, depth = 0, root = this.root) {
    if (root === null) return;
    if (root.value === node.value) return depth;
    if (root.value < node.value) return this.depth(node, depth + 1, root.right);
    else return this.depth(node, depth + 1, root.left);
  }

  isBalanced(root = this.root) {
    const lHeight = this.height(root.left);
    const rHeight = this.height(root.right);
    const diff = Math.abs(lHeight - rHeight);
    return diff < 2 ? true : false;
  }

  reBalance() {
    if (this.root === null) return;
    const sorted = [...new Set(mergeSort(this.preOrder()))];
    this.root = this.buildTree(sorted);
  }

  isEmpty = () => {
    return this.root === null;
  };

  smallestNode = (node) => {
    if (!node.left) {
      return node.value;
    }
    return this.smallestNode(node.left);
  };

  largestNode = (node) => {
    if (!node.right) {
      return node.value;
    }
    return this.largestNode(node.right);
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const mergeSort = (array) => {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));
  return merge(left, right);
};

const merge = (left, right) => {
  const merged = [];

  while (left.length > 0 && right.length > 0) {
    const min = left[0] < right[0] ? left : right;

    const mergeItem = min.shift();
    merged.push(mergeItem);
  }
  return merged.concat(left, right);
};

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, -37637, -34, 0, -54];

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const tree = new Tree(mergeSort(removeDuplicates(testArray)));
prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
tree.insert(123);
tree.insert(124);
tree.insert(125);
tree.insert(126);
tree.insert(126);
console.log(tree.isBalanced());
prettyPrint(tree.root);
tree.reBalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
prettyPrint(tree.root);

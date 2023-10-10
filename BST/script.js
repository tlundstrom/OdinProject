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

function traverse(node) {
  if (node) {
    const left = traverse(node.left);
    const right = traverse(node.right);
    return {
      value: node.value,
      [left && "left"]: left,
      [right && "right"]: right,
    };
  }
}

console.log(tree.root);

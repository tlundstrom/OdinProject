// Functions to sort, filter, build, and visually display a BTS

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

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, -34, 0, -54];

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const tree = new Tree(mergeSort(removeDuplicates(testArray)));

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

// Actual Serialization Happens Here

const serialize = (root) => {
  const serializedArray = [];
  const dfs = (root) => {
    if (!root) {
      serializedArray.push("N");
      return;
    }
    serializedArray.push(root.value);
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return serializedArray;
};

const deserialize = (data) => {
  i = 0;
  const dfs = () => {
    if (data[i] === "N") {
      i++;
      return null;
    }
    let node = new Node(data[i]);
    i++;
    node.left = dfs();
    node.right = dfs();
    return node;
  };
  return dfs();
};

class Node {
  constructor() {
    this.children = new Map();
    this.deleted = false;
  }
}

function buildSubtreeToNodes(node, subTreeToNodes) {
  let subTree = "(";
  for (const [subDirectory, child] of node.children.entries()) {
    subTree += subDirectory + buildSubtreeToNodes(child, subTreeToNodes);
  }
  subTree += ")";
  console.log(subTree);
  if (subTree !== "()") {
    if (!subTreeToNodes.has(subTree)) subTreeToNodes.set(subTree, []);
    subTreeToNodes.get(subTree).push(node);
    console.log(subTreeToNodes);
  }

  return subTree;
}

function constructPath(node, pathArr, ans) {
  for (const [subDirectory, child] of node.children.entries()) {
    if (!child.deleted) {
      pathArr.push(subDirectory);
      constructPath(child, pathArr, ans);
      pathArr.pop();
    }
  }
  if (pathArr.length > 0) ans.push(Array.from(pathArr));
}

function deleteDuplicateFolder(paths) {
  const ans = [];
  const pathArr = [];
  const subTreeToNodes = new Map();
  paths.sort();
  console.log(JSON.stringify(paths));

  const root = new Node();
  for (const path of paths) {
    let node = root;
    for (const subPath of path) {
      if (!node.children.has(subPath)) node.children.set(subPath, new Node());
      node = node.children.get(subPath);
    }
  }

  buildSubtreeToNodes(root, subTreeToNodes);

  for (const nodes of subTreeToNodes.values()) {
    if (nodes.length > 1) {
      for (const node of nodes) {
        node.deleted = true;
      }
    }
  }

  constructPath(root, pathArr, ans);
  console.log(pathArr);
  return ans;
}

console.log(JSON.stringify(deleteDuplicateFolder([["a"], ["c"], ["d"], ["a", "b"], ["c", "b"], ["d", "a"], ["d", "a", "x"], ["d", "a", "x", "b"]])));

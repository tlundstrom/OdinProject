class Node {
  constructor(value) {
    this.value = value || null;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    if (this.head === null) this.prepend(value);
    else {
      let node = this.head;
      while (node.nextNode !== null) node = node.nextNode;
      node.nextNode = new Node(value);
    }
  }
  prepend(value) {
    let node = null;
    if (this.head !== null) node = this.head;
    this.head = new Node(value);
    this.head.nextNode = node;
  }
  size() {
    let node = this.head;
    let runner = 0;
    while (node !== null) {
      runner++;
      node = node.nextNode;
    }
    return runner;
  }
  Head() {
    return this.head;
  }
  tail() {
    let node = this.head;
    while (node.nextNode !== null) node = node.nextNode;
    return node;
  }
  at(index) {
    let node = this.head;
    for (let runner = 0; runner < index; runner++) {
      node = node.nextNode;
      if (node == null) return "nothing here...";
    }
    return node;
  }
  pop() {
    let current = this.head;
    let previous = null;
    while (current.nextNode !== null) {
      previous = current;
      current = current.nextNode;
    }
    previous.nextNode = null;
  }
  contains(value) {
    let node = this.head;
    while (node !== null) {
      if (node.value === value) return true;
      node = node.nextNode;
    }
    return false;
  }
  find(value) {
    let node = this.head;
    let runner = 0;
    while (node !== null) {
      if (node.value === value) return runner;
      runner++;
      node = node.nextNode;
    }
    return null;
  }
  toString() {
    let node = this.head;
    let string = "";
    while (node !== null) {
      string += `${node.value} -> `;
      node = node.nextNode;
    }
    return (string += "null");
  }
  insertAt(index) {
    if (this.head == null) this.prepend(value);
    else {
      let current = this.listHead;
      let previous = null;
      for (let runner = 0; runner < index; runner++) {
        previous = current;
        current = current.nextNode;
        if (current == null) break;
        const node = new Node(value);
        previous.nextNode = node;
        node.nextNode = current;
      }
    }
  }

  removeAt(index) {
    if (this.listHead == null) return "Nothing here...";
    let current = this.head;
    let previous = null;
    for (let runner = 0; runner < index; runner++) {
      previous = current;
      current = current.nextNode;
      if (current == null) return "This index is empty...";
    }
    previous.nextNode = current.nextNode;
  }
}

const linkedList = new LinkedList();

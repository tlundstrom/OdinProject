const fibs = (num) => {
  if (num === 1) return [0];
  if (num === 2) return [0, 1];
  let fibnums = [0, 1];
  for (let i = 2; i < num; i++) {
    fibnums[i] = fibnums[i - 1] + fibnums[i - 2];
  }
  return fibnums;
};
//test case
console.log(fibs(13));

const fibonacci = (num, sequence = [0, 1]) => {
  if (sequence.length >= num) {
    return sequence.slice(0, num);
  }
  const newNumber = sequence.at(-1) + sequence.at(-2);
  sequence.push(newNumber);
  return fibonacci(num, sequence);
};
//test case
console.log(fibonacci(13));

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
//test case
console.log(mergeSort([5, 23, 67, 1, -1234, -5, 3, 0]));

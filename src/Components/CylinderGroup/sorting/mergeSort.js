let temp;
let queue = [];
let done = false;
let inProgress = false;
let index;
const pointers = {};
let middleLimit;
let highLimit;

const updateArray = (array, side) => {
  const indicesArray = [];
  indicesArray.push(index);
  array[index].height = temp[pointers[side]];
  pointers[side]++;
  index++;

  let tempIndex = index;
  let tempPointer = pointers.left;

  while (tempPointer <= middleLimit) {
    array[tempIndex].height = temp[tempPointer];
    indicesArray.push(tempIndex);
    tempPointer++;
    tempIndex++;
  }

  tempPointer = pointers.right;

  while (tempPointer <= highLimit) {
    array[tempIndex].height = temp[tempPointer];
    indicesArray.push(tempIndex);
    tempPointer++;
    tempIndex++;
  }
  return indicesArray;
};
const merge = (array, low, middle, high) => {
  if (!inProgress) {
    temp = array.slice(low, high + 1).map((item) => item.height);
    index = low;
    pointers.left = 0;
    middleLimit = middle - low;
    pointers.right = middleLimit + 1;
    highLimit = high - low;
    inProgress = true;
  }
  while (pointers.left <= middleLimit && pointers.right <= highLimit) {
    if (temp[pointers.left] >= temp[pointers.right]) {
      return updateArray(array, "left");
    } else {
      return updateArray(array, "right");
    }
  }
  while (pointers.left <= middleLimit) {
    return updateArray(array, "left");
  }
  inProgress = false;
  queue.shift();
  return false;
};

const mergeSortPrep = (array, low = 0, high = array.length - 1) => {
  if (high - low === 0) return;
  const middle = Math.floor((low + high) / 2);
  mergeSortPrep(array, low, middle);
  mergeSortPrep(array, middle + 1, high);
  queue.push([low, middle, high]);
};

const mergeSortStep = (array) => {
  if (!queue.length) return false;
  const [low, middle, high] = queue[0];
  return merge(array, low, middle, high);
};

export const mergeSort = (array) => {
  if (!done) {
    mergeSortPrep(array);
    done = true;
  }
  return mergeSortStep(array);
};

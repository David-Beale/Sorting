let temp;
let queue = [];
let done = false;
let inProgress = false;
let index;
let pointerLeft;
let pointerRight;
let middleLimit;
let highLimit;

const merge = (array, low, middle, high) => {
  if (!inProgress) {
    temp = array.slice(low, high + 1).map((item) => item.height);
    index = low;
    pointerLeft = 0;
    middleLimit = middle - low;
    pointerRight = middleLimit + 1;
    highLimit = high - low;
    inProgress = true;
  }
  while (pointerLeft <= middleLimit && pointerRight <= highLimit) {
    if (temp[pointerLeft] >= temp[pointerRight]) {
      array[index].height = temp[pointerLeft];
      pointerLeft++;
      index++;
      return [index - 1];
    } else {
      array[index].height = temp[pointerRight];
      pointerRight++;
      index++;
      return [index - 1];
    }
  }
  for (; pointerLeft <= middleLimit; ) {
    array[index].height = temp[pointerLeft];
    index++;
    pointerLeft++;
    return [index - 1];
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

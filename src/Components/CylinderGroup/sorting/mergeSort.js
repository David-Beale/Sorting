let temp;
let queue = [];
let done = false;

const merge = (array, low, middle, high) => {
  temp = array.slice(low, high + 1).map((item) => item.height);
  let current = low;
  middle -= low;
  high -= low;
  let pointerLeft = 0;
  let pointerRight = middle + 1;

  while (pointerLeft <= middle && pointerRight <= high) {
    if (temp[pointerLeft] > temp[pointerRight]) {
      array[current].height = temp[pointerLeft];
      pointerLeft++;
    } else {
      array[current].height = temp[pointerRight];
      pointerRight++;
    }
    current++;
  }
  for (let i = pointerLeft; i <= middle; i++) {
    array[current].height = temp[i];
    current++;
  }
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
  const [low, middle, high] = queue.shift();
  merge(array, low, middle, high);
  const indices = [];

  for (let i = low; i <= high; i++) {
    indices.push(i);
  }
  return indices;
};

export const mergeSort = (array) => {
  if (!done) {
    mergeSortPrep(array);
    done = true;
  }
  return mergeSortStep(array);
};

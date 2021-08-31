import { correctHeightColor, normalColor, currentColor } from "./colors";

let prepDone = false;
let maxLength;
let buckets = [];
let i = 0;
let j;
let currentIndex = 0;
let temp;
let prevIndex = null;

const resetBucket = () => {
  for (let i = 0; i < 10; i++) {
    buckets[i] = [];
  }
};
const getDigit = (num, index) => {
  const string = (num * 10).toString();
  const digit = string[string.length - 1 - index];

  return digit === undefined ? 0 : digit;
};
const radixSortPrep = (array) => {
  maxLength = array.length.toString().length;
  j = array.length - 1;
  resetBucket();
  prepDone = true;
};

export const radixSort = (array) => {
  if (!prepDone) radixSortPrep(array);

  while (i < maxLength) {
    while (j >= 0) {
      let digit = getDigit(array[j].height, i);
      buckets[digit].push(j);
      j--;
      if (j < 0)
        temp = array.map((item) => {
          return { height: item.height, selected: false };
        });
    }
    if (buckets.length) {
      let nextIndex;
      while (nextIndex === undefined) {
        const list = buckets[buckets.length - 1];
        nextIndex = list.pop();
        if (!list.length) buckets.pop();
      }

      const indices = [currentIndex];
      array[currentIndex].height = temp[nextIndex].height;
      array[currentIndex].color = currentColor;
      if (prevIndex !== null) {
        array[prevIndex].color =
          array[prevIndex].height === array[prevIndex].correctHeight
            ? correctHeightColor
            : normalColor;
        indices.push(prevIndex);
      }
      prevIndex = currentIndex;
      temp[nextIndex].selected = true;
      let tempIndex = currentIndex + 1;
      for (let i = 0; i < temp.length; i++) {
        if (!temp[i].selected) {
          if (array[tempIndex].height !== temp[i].height) {
            array[tempIndex].height = temp[i].height;
            indices.push(tempIndex);
          }
          tempIndex++;
        }
      }

      currentIndex++;
      return indices;
    }
    resetBucket();
    currentIndex = 0;
    i++;
    j = array.length - 1;
  }

  if (prevIndex) {
    let i = prevIndex;
    prevIndex = null;
    array[i].color =
      array[i].height === array[i].correctHeight
        ? correctHeightColor
        : normalColor;
    return [i];
  }

  return false;
};

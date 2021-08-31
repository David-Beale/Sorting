import { correctHeightColor, normalColor, currentColor } from "../colors";
let i = 0;
let swapped = false;
let finished = false;
let counter = 1;

const swap = (array, i1, i2) => {
  [array[i1].height, array[i2].height] = [array[i2].height, array[i1].height];
  swapped = true;
};

export const bubbleSort = (array, start) => {
  if (finished) return false;
  if (start) {
    i = 0;
    swapped = false;
    finished = false;
    counter = 1;
  }

  while (true) {
    while (i < array.length - counter) {
      if (array[i].height < array[i + 1].height) {
        swap(array, i, i + 1);
      }
      const res = [i, i + 1];
      array[i].color =
        array[i].height === array[i].correctHeight
          ? correctHeightColor
          : normalColor;
      array[i + 1].color =
        array[i + 1].height === array[i + 1].correctHeight
          ? correctHeightColor
          : currentColor;
      i++;
      return res;
    }
    if (!swapped) {
      finished = true;
      return false;
    }
    i = 0;
    swapped = false;
    counter++;
  }
};

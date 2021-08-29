import { correctHeightColor, normalColor, currentColor } from "./colors";
let i = 0;
let j = i + 1;
let max = i;

export const selectionSort = (array, start) => {
  if (start) {
    i = 0;
    j = i + 1;
    max = i;
  }
  while (i < array.length) {
    while (j < array.length) {
      //check if we find a bigger number
      if (array[j].height > array[max].height) {
        max = j;
      }
      //set color of current index and reset color of prev index
      const res = [j, j - 1];
      if (array[j - 1].color === currentColor) array[j - 1].color = normalColor;
      array[j].color = currentColor;
      j++;
      return res;
    }

    if (max !== i) {
      //swap heights
      [array[max].height, array[i].height] = [
        array[i].height,
        array[max].height,
      ];
    }
    const res = [max];
    if (i !== max) res.push(i);
    if (j - 1 !== i) res.push(j - 1);
    //color check
    res.forEach((index) => {
      array[index].color =
        array[index].height === array[index].correctHeight
          ? correctHeightColor
          : normalColor;
    });

    //next i. reset j, reset max
    i++;
    j = i + 1;
    max = i;
    return res;
  }
  return false;
};

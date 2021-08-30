import { correctHeightColor, normalColor, currentColor } from "./colors";
let stack = [];
let prepDone = false;
let inProgress = false;
let pivot;
let leftPointer;
let rightPointer;
let left;
let right;

const partition = (array) => {
  if (!inProgress) {
    inProgress = true;
    [left, right] = stack.pop();
    pivot = array[Math.floor((left + right) / 2)].height;
    leftPointer = left;
    rightPointer = right;
  }
  while (leftPointer <= rightPointer) {
    //move pointers closer together until a swap can be made
    while (
      array[leftPointer].height > pivot ||
      array[rightPointer].height < pivot
    ) {
      const res = [];
      if (array[leftPointer].height > pivot) {
        //reset prev color
        array[leftPointer].color =
          array[leftPointer].height === array[leftPointer].correctHeight
            ? correctHeightColor
            : normalColor;
        res.push(leftPointer);
        leftPointer++;
      }
      if (leftPointer <= rightPointer) {
        //set current color
        array[leftPointer].color = currentColor;
        res.push(leftPointer);
      }

      if (array[rightPointer].height < pivot) {
        //reset prev color
        array[rightPointer].color =
          array[rightPointer].height === array[rightPointer].correctHeight
            ? correctHeightColor
            : normalColor;
        res.push(rightPointer);
        rightPointer--;
      }
      if (leftPointer <= rightPointer) {
        //set current color
        array[rightPointer].color = currentColor;
        res.push(rightPointer);
      }
      return res;
    }

    const res = [leftPointer, rightPointer];
    //make swap
    [array[leftPointer].height, array[rightPointer].height] = [
      array[rightPointer].height,
      array[leftPointer].height,
    ];
    //reset colors
    array[leftPointer].color =
      array[leftPointer].height === array[leftPointer].correctHeight
        ? correctHeightColor
        : normalColor;

    array[rightPointer].color =
      array[rightPointer].height === array[rightPointer].correctHeight
        ? correctHeightColor
        : normalColor;

    leftPointer++;
    rightPointer--;
    if (leftPointer <= rightPointer) {
      //set current colors
      array[leftPointer].color = currentColor;

      array[rightPointer].color = currentColor;

      res.push(leftPointer, rightPointer);
    }

    return res;
  }
  return leftPointer;
};
const quickSortPrep = (array) => {
  stack.push([0, array.length - 1]);
};

export const quickSort = (array) => {
  if (!prepDone) {
    quickSortPrep(array);
    prepDone = true;
  }
  while (inProgress || stack.length) {
    const res = partition(array);
    if (typeof res === "object") {
      return res;
    }
    inProgress = false;
    if (left < res - 1) stack.push([left, res - 1]);
    if (right > res) stack.push([res, right]);
  }
  return false;
};

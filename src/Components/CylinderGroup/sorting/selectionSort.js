let i = 0;
export const selectionSort = (array, start) => {
  if (start) {
    i = 0;
  }
  for (; i < array.length; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j].height > array[min].height) {
        min = j;
      }
    }
    if (min !== i) {
      [array[min].height, array[i].height] = [
        array[i].height,
        array[min].height,
      ];
      return [min, i];
    }
  }
  return false;
};

let counter = 0;
let i = 0;
export const bubbleSort = (array, start) => {
  if (start) {
    counter = 0;
    i = 0;
  }
  let swapped;
  do {
    swapped = false;
    for (; i < array.length - counter; i++) {
      if (array[i].height < array[i + 1].height) {
        i++;
        return i;
      }
    }
    counter++;
  } while (swapped);
  return false;
};

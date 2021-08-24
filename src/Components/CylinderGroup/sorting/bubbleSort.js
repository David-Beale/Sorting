let counter = 1;
let i = 0;
let finished = false;
let swapped;

export const bubbleSort = (array, start) => {
  if (start) {
    counter = 1;
    i = 0;
    finished = false;
  }
  if (finished) return false;

  do {
    if (i === 0) swapped = false;
    for (; i < array.length - counter; i++) {
      if (array[i].height < array[i + 1].height) {
        [array[i].height, array[i + 1].height] = [
          array[i + 1].height,
          array[i].height,
        ];
        const indices = [i, i + 1];
        i++;
        swapped = true;
        return indices;
      }
    }
    i = 0;
    counter++;
  } while (swapped);
  finished = true;
  return false;
};

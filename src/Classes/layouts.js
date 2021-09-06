const SPIRAL_RADIUS_VAR = 2;
const SPIRAL_ANGLE_VAR = 2.5;

export const spiralLayout = (list) => {
  let theta = 0;
  const r = 1;
  for (let i = 0; i < list.length; i++) {
    const radius = Math.max(1, Math.sqrt(i + 1) * (SPIRAL_RADIUS_VAR * r));
    theta += Math.asin(1 / radius) * (SPIRAL_ANGLE_VAR * r);

    const item = list[i];
    item.x = radius * Math.cos(theta);
    item.z = radius * Math.sin(theta);
  }
};
export const lineLayout = (list) => {
  const middle = Math.floor(list.length / 2);
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    item.x = (list.length - i - middle) * 2.5;
    item.z = 0;
  }
};
export const pyramidLayout = (list) => {
  let x = 0;
  let z = 0;
  let counter = 0;
  let start = 0;
  let edgeSize = 1;

  loop1: while (true) {
    x = start - 1;
    z = start;
    let array = [];
    for (let i = 0; i < edgeSize; i++) {
      x++;
      array.push([x, z]);
    }
    for (let i = 0; i < edgeSize - 1; i++) {
      z++;
      array.push([x, z]);
    }
    for (let i = 0; i < edgeSize - 1; i++) {
      x--;
      array.push([x, z]);
    }
    for (let i = 0; i < edgeSize - 1; i++) {
      z--;
      array.push([x, z]);
    }
    let startPointer = 0;
    let endPointer = array.length - 1;
    while (startPointer <= endPointer) {
      const item1 = list[counter];
      const [x1, z1] = array[startPointer];
      item1.x = x1 * 2.5;
      item1.z = z1 * 2.5;
      counter++;
      if (counter === list.length) break loop1;
      const item2 = list[counter];
      const [x2, z2] = array[endPointer];
      item2.x = x2 * 2.5;
      item2.z = z2 * 2.5;
      counter++;
      if (counter === list.length) break loop1;
      startPointer++;
      endPointer--;
    }
    start--;
    edgeSize += 2;
  }
};
export const SquareLayout = (list) => {
  const sideLength = Math.ceil(Math.sqrt(list.length));
  const middle = Math.floor(sideLength / 2);

  let x = sideLength - middle;
  let z = -middle;
  let counter = 0;
  let size = 1;
  let currentSize = 0;
  let direction = 1;
  while (counter < list.length) {
    if (currentSize === size) {
      currentSize = 0;
      if (direction === 1 && size === sideLength) {
        direction = -1;
      }
      size += direction;
      if (direction === 1) {
        x = sideLength - middle - size + 1;
        z = -middle;
      } else {
        x = 1 - middle;
        z = sideLength - middle - size;
      }
    }
    const item = list[counter];
    item.x = x * 2.5;
    item.z = z * 2.5;
    x++;
    z++;
    currentSize++;
    counter++;
  }
};

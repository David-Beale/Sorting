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
export const triangleLayout = (list) => {
  const sideLength = Math.ceil(Math.sqrt(list.length));
  const middle = Math.floor(sideLength / 2);

  let x = sideLength - middle;
  let z = -middle;
  let counter = 0;
  let size = 1;
  let currentSize = 0;
  while (counter < list.length) {
    if (currentSize === size) {
      currentSize = 0;
      x = sideLength - middle - size;
      z = -middle;
      size++;
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

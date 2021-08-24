const SPIRAL_RADIUS_VAR = 2;
const SPIRAL_ANGLE_VAR = 2.5;

export const spiralLayout = (length) => {
  const newPositions = [];
  let theta = 0;
  const r = 1;
  for (let i = 0; i < length; i++) {
    const radius = Math.max(1, Math.sqrt(i + 1) * (SPIRAL_RADIUS_VAR * r));
    theta += Math.asin(1 / radius) * (SPIRAL_ANGLE_VAR * r);

    newPositions.push({
      x: radius * Math.cos(theta),
      z: radius * Math.sin(theta),
    });
  }
  return newPositions;
};

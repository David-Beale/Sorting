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

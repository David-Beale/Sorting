import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";

export default function Rig({ mouse, height }) {
  const { camera } = useThree();
  const mouseRange = useMemo(() => 200 / height, [height]);
  const zPos = useMemo(() => (height * 2) / Math.tan(0.45), [height]);
  useFrame(() => {
    camera.position.x +=
      (mouse.current[0] / mouseRange - camera.position.x) * 0.05;
    camera.position.y +=
      (-mouse.current[1] / mouseRange - camera.position.y) * 0.05;
    camera.position.z += (zPos - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

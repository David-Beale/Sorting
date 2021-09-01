import { useFrame, useThree } from "@react-three/fiber";

const mouseRange = 5;
export default function Rig({ mouse }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x +=
      (mouse.current[0] / mouseRange - camera.position.x) * 0.05;
    camera.position.y +=
      (-mouse.current[1] / mouseRange - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

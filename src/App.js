import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats, Loader } from "@react-three/drei";
import CylinderGroup from "./Components/CylinderGroup/CylinderGroup";
import { useState } from "react";

const length = 1000;
export default function App() {
  const [swap, setSwap] = useState(false);
  const onClick = () => {
    // setSwap([true]);
  };
  return (
    <div className="container" onPointerDown={onClick}>
      <Canvas
        camera={{
          // position: [0, length / 10, length / 3],
          position: [0, 100, 100],
          fov: 40,
          far: 100000,
        }}
      >
        <Stats />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[0, 20, 20]} />
        <directionalLight intensity={0.5} position={[20, 20, 0]} />
        <CylinderGroup length={length} swap={swap} />
        <OrbitControls />
      </Canvas>
      <Loader />
    </div>
  );
}

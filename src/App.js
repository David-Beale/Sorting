import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats, Loader } from "@react-three/drei";
import CylinderGroup from "./Components/CylinderGroup/CylinderGroup";
import { useState } from "react";

export default function App() {
  const [swap, setSwap] = useState(false);
  const onClick = () => {
    // setSwap([true]);
  };
  return (
    <div className="container" onPointerDown={onClick}>
      <Canvas camera={{ position: [0, 150, 100], fov: 40, far: 10000 }}>
        <Stats />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[0, 20, 20]} />
        <directionalLight intensity={1} position={[20, 20, 0]} />
        <CylinderGroup length={2000} swap={swap} />
        <OrbitControls />
      </Canvas>
      <Loader />
    </div>
  );
}

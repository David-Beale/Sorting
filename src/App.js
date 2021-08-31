import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats, Loader, Sky } from "@react-three/drei";
import CylinderGroup from "./Components/CylinderGroup/CylinderGroup";

const length = 500;
export default function App() {
  return (
    <div className="container">
      <Canvas
        camera={{
          position: [0, 50, 200],
          fov: 40,
          far: 100000,
        }}
      >
        <Stats />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[0, 20, 20]} />
        <directionalLight intensity={0.5} position={[20, 20, 0]} />
        <Sky
          distance={10000}
          inclination={0.51}
          azimuth={0.6}
          rayleigh={1.25}
        />
        <CylinderGroup length={length} />
        <OrbitControls />
      </Canvas>
      <Loader />
    </div>
  );
}

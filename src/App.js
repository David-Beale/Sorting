import "./App.css";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stats, Loader, Sky } from "@react-three/drei";
import CylinderGroup from "./Components/CylinderGroup/CylinderGroup";
import Rig from "./Components/Rig/Rig";
import Menu from "./Components/Menu/Menu";
import Controls from "./Components/CameraAnimation/Controls";

export default function App() {
  const [length, setLength] = useState(528);
  const [sortMethod, setSortMethod] = useState(["Selection"]);
  const [speed, setSpeed] = useState(1);
  const [cameraLock, setCameraLock] = useState(true);
  const [height, setHeight] = useState(0);
  const [layout, setLayout] = useState("Spiral");
  const mouse = useRef([0, 0]);

  const onMouseMove = (e) => {
    mouse.current = [
      2500 * (e.clientX / window.innerWidth - 0.5),
      1500 * (e.clientY / window.innerHeight - 0.5),
    ];
  };

  return (
    <div className="container" onPointerMove={onMouseMove}>
      <Menu
        cameraLock={cameraLock}
        setCameraLock={setCameraLock}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
        layout={layout}
        setLayout={setLayout}
        speed={speed}
        setSpeed={setSpeed}
        length={length}
        setLength={setLength}
      />
      <Canvas
        camera={{
          position: [0, 86, 175],
          fov: 40,
          far: 100000,
        }}
      >
        <Stats className="stats" />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} position={[0, 20, 20]} />
        <directionalLight intensity={0.5} position={[20, 20, 0]} />
        <Sky distance={100000} inclination={1} azimuth={0.6} rayleigh={0.1} />
        <CylinderGroup
          length={length}
          sortMethod={sortMethod}
          speed={speed}
          height={height}
          layout={layout}
          setHeight={setHeight}
        />
        {!cameraLock && <Rig mouse={mouse} height={height} />}
        <Controls height={height} cameraLock={cameraLock} layout={layout} />
      </Canvas>
      <Loader />
    </div>
  );
}

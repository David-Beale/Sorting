import React from "react";
import { useData } from "./useData";

export default function CylinderGroup({ length, swap }) {
  const meshRef = useData(length, swap);

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, length]}
        frustumCulled={false}
        position={[0, 0, 0]}
      >
        <cylinderBufferGeometry args={[1, 1, 1, 16]} />

        <meshStandardMaterial attach="material" color="cornflowerblue" />
      </instancedMesh>
    </>
  );
}

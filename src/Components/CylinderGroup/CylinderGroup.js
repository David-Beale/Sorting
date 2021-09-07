import React from "react";
import { VertexColors } from "three";
import { useSortableList } from "./useSortableList";

export default function CylinderGroup({
  length,
  sortMethod,
  speed,
  height,
  setHeight,
  layout,
}) {
  const [meshRef, colorRef, colorArray] = useSortableList({
    length,
    layout,
    speed,
    sortMethod,
    setHeight,
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, length]}
        frustumCulled={false}
        position={[0, -height, 0]}
      >
        <cylinderBufferGeometry args={[1, 1, 1, 16]}>
          <instancedBufferAttribute
            ref={colorRef}
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </cylinderBufferGeometry>

        <meshStandardMaterial attach="material" vertexColors={VertexColors} />
      </instancedMesh>
    </>
  );
}

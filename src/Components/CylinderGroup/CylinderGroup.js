import React, { useRef } from "react";
import { useColor } from "./useColor";
import { useData } from "./useData";
import { VertexColors, Object3D, Color } from "three";
import { useFrame } from "@react-three/fiber";

const scratchObject3D = new Object3D();
const scratchColor = new Color();

export default function CylinderGroup({ length, swap }) {
  const { meshRef, positions } = useData(length, swap);
  const { colorAttrib, colorArray } = useColor(length);
  const finished = useRef({});

  useFrame(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < 10; i++) {
      if (Object.keys(finished.current).length === length) return;
      let random1;
      do {
        random1 = Math.floor(Math.random() * length);
      } while (finished.current[random1]);

      finished.current[random1] = true;
      const pos1 = positions[random1];

      scratchObject3D.position.set(pos1.x, pos1.correctY, pos1.z);
      scratchObject3D.scale.set(1, pos1.correctHeight, 1);
      scratchObject3D.updateMatrix();
      meshRef.current.setMatrixAt(random1, scratchObject3D.matrix);

      scratchColor.set("rgb(43,191,48)");
      scratchColor.toArray(colorArray, random1 * 3);
    }
    colorAttrib.current.needsUpdate = true;

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[null, null, length]}
        frustumCulled={false}
        position={[0, -length / 35, 0]}
      >
        <cylinderBufferGeometry args={[1, 1, 1, 16]}>
          <instancedBufferAttribute
            ref={colorAttrib}
            attachObject={["attributes", "color"]}
            args={[colorArray, 3]}
          />
        </cylinderBufferGeometry>

        <meshStandardMaterial
          attach="material"
          // color="cornflowerblue"
          vertexColors={VertexColors}
        />
      </instancedMesh>
    </>
  );
}

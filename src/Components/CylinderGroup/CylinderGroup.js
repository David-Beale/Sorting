import React, { useCallback } from "react";
import { useColor } from "./useColor";
import { useData } from "./useData";
import { VertexColors, Object3D, Color } from "three";
import { useFrame } from "@react-three/fiber";
import { bubbleSort } from "./sorting/bubbleSort";
import { selectionSort } from "./sorting/selectionSort";
import { mergeSort } from "./sorting/mergeSort";
import { normalColor } from "./sorting/colors";

const scratchObject3D = new Object3D();
const scratchColor = new Color();

export default function CylinderGroup({ length }) {
  const { meshRef, positions } = useData(length);
  const { colorAttrib, colorArray } = useColor(length);

  const updateVisuals = useCallback(
    (index) => {
      scratchObject3D.position.set(
        positions[index].x,
        positions[index].height / 2,
        positions[index].z
      );
      scratchObject3D.scale.set(1, positions[index].height, 1);
      scratchObject3D.updateMatrix();
      meshRef.current.setMatrixAt(index, scratchObject3D.matrix);
      // const color =
      //   positions[index].height === positions[index].correctHeight
      //     ? "rgb(43,191,48)"
      //     : "rgb(36,102,177)";
      scratchColor.set(positions[index].color);
      scratchColor.toArray(colorArray, index * 3);
    },
    [colorArray, meshRef, positions]
  );

  useFrame(() => {
    if (!meshRef.current || !positions) return;
    const indices = new Set();
    for (let i = 0; i < 1; i++) {
      // const res = selectionSort(positions);
      // const res = mergeSort(positions);
      const res = bubbleSort(positions);
      if (res === false) break;
      res.forEach((index) => indices.add(index));
    }
    indices.forEach((index) => {
      updateVisuals(index);
    });
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

        <meshStandardMaterial attach="material" vertexColors={VertexColors} />
      </instancedMesh>
    </>
  );
}

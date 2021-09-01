import React, { useEffect, useMemo, useRef } from "react";
import SortableList from "../../Classes/SortableList";
import { VertexColors } from "three";
import { useFrame } from "@react-three/fiber";

export default function CylinderGroup({
  length,
  sortMethod,
  speed,
  height,
  setHeight,
}) {
  const meshRef = useRef();
  const colorRef = useRef();
  const colorArray = useMemo(() => new Float32Array(length * 3), [length]);

  const sortableList = useMemo(
    () => new SortableList(length, meshRef, colorRef, colorArray),
    [length, colorArray]
  );

  useEffect(() => {
    setHeight(sortableList.width / 2);
  }, [sortableList, setHeight]);

  useEffect(() => {
    sortableList.setSpeed(speed);
  }, [sortableList, speed]);

  useEffect(() => {
    sortableList.updateSortMethod(sortMethod[0]);
  }, [sortableList, sortMethod]);

  useFrame(() => {
    sortableList.sort();
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

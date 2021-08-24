import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { spiralLayout } from "./layouts";
import { shuffle } from "./shuffle";
// re-use for instance computations
const scratchObject3D = new THREE.Object3D();
const scratchColor = new THREE.Color();

export const useData = (length, swap) => {
  const meshRef = useRef();

  const heights = useMemo(() => {
    const list = [];
    for (let i = length; i >= 1; i--) {
      list.push(i);
    }
    return list;
  }, [length]);
  const positions = useMemo(() => spiralLayout(length), [length]);

  useEffect(() => {
    const shuffled = shuffle(heights);
    // const shuffled = heights;
    for (let i = 0; i < positions.length; i++) {
      const height = shuffled[i] / 10;
      const correctHeight = heights[i] / 10;
      positions[i].y = height / 2;
      positions[i].height = height;
      positions[i].correctHeight = correctHeight;
      positions[i].correctY = correctHeight / 2;
    }
  }, [positions, heights]);

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < length; i++) {
      const position = positions[i];
      scratchObject3D.position.set(position.x, position.y, position.z);
      scratchObject3D.scale.set(1, position.height, 1);
      scratchObject3D.updateMatrix();
      meshRef.current.setMatrixAt(i, scratchObject3D.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [length, positions]);

  useEffect(() => {
    if (!meshRef.current || !swap) return;
    const random1 = Math.floor(Math.random() * length);
    // let random2 = random1;
    // while (random2 === random1) {
    //   random2 = Math.floor(Math.random() * length);
    // }
    const pos1 = positions[random1];
    // const pos2 = positions[random2];

    // [pos1.height, pos2.height] = [pos2.height, pos1.height];
    // [pos1.y, pos2.y] = [pos2.y, pos1.y];

    scratchObject3D.position.set(pos1.x, pos1.correctY, pos1.z);
    scratchObject3D.scale.set(1, pos1.correctHeight, 1);
    scratchObject3D.updateMatrix();
    meshRef.current.setMatrixAt(random1, scratchObject3D.matrix);

    // scratchObject3D.position.set(pos2.x, pos2.y, pos2.z);
    // scratchObject3D.scale.set(1, pos2.height, 1);
    // scratchObject3D.updateMatrix();
    // meshRef.current.setMatrixAt(random2, scratchObject3D.matrix);

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [swap, length, positions]);

  return { meshRef, positions };
};

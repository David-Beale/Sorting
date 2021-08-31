import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { spiralLayout } from "./layouts";
import { shuffle } from "./shuffle";
import { normalColor } from "./sorting/colors";

// re-use for instance computations
const scratchObject3D = new THREE.Object3D();

export const useData = (length, swap) => {
  const meshRef = useRef();

  const heights = useMemo(() => {
    const list = [];
    for (let i = length; i >= 1; i--) {
      list.push(i / 10);
    }
    return list;
  }, [length]);
  const positions = useMemo(() => spiralLayout(length), [length]);

  useEffect(() => {
    const shuffled = shuffle(heights);
    // const shuffled = heights;
    for (let i = 0; i < positions.length; i++) {
      const height = shuffled[i];
      const correctHeight = heights[i];
      positions[i].y = height / 2;
      positions[i].height = height;
      positions[i].correctHeight = correctHeight;
      positions[i].correctY = correctHeight / 2;
      positions[i].color = normalColor;
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

  return { meshRef, positions };
};

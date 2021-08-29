import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { normalColor } from "./sorting/colors";
// re-use for instance computations
const scratchColor = new THREE.Color();

export const useColor = (length) => {
  const colorAttrib = useRef();
  const colorArray = useMemo(() => new Float32Array(length * 3), [length]);

  useEffect(() => {
    for (let i = 0; i < length; ++i) {
      scratchColor.set(normalColor);
      scratchColor.toArray(colorArray, i * 3);
    }
    colorAttrib.current.needsUpdate = true;
  }, [length, colorArray]);

  return { colorAttrib, colorArray };
};

import React, { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import useCameraAnimation from "./useCameraAnimation";

// extend THREE to include OrbitControls
extend({ OrbitControls });

const disabled = { LEFT: null, MIDDLE: null, RIGHT: null };
const enabled = {
  LEFT: THREE.MOUSE.ROTATE, // make pan the default instead of rotate
  MIDDLE: THREE.MOUSE.ZOOM,
  RIGHT: THREE.MOUSE.PAN,
};
export default function Controls({ height, lock }) {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    // update the view as the vis is interacted with
    controls.current.update();
  });

  // run the layout, animating on change
  useCameraAnimation(controls, height);

  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dynamicDampingFactor={0.1}
      maxDistance={3000}
      mouseButtons={lock ? disabled : enabled}
      keys={[]}
    />
  );
}

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function updateSource(parameter) {
  parameter.sourceX = parameter.x;
  parameter.sourceY = parameter.y;
  parameter.sourceZ = parameter.z;
}
const interpolate = (parameter, progress) => {
  if (parameter.sourceX === undefined) return;
  parameter.x =
    (1 - progress) * parameter.sourceX + progress * parameter.targetX;
  parameter.y =
    (1 - progress) * parameter.sourceY + progress * parameter.targetY;
  parameter.z =
    (1 - progress) * parameter.sourceZ + progress * parameter.targetZ;
};

const interpolateParameters = (parameters, progress) => {
  Object.values(parameters).forEach((parameter) => {
    interpolate(parameter, progress);
  });
};

const setTargetParameters = (parameters, height) => {
  parameters.position.targetX = 0;
  parameters.position.targetY = height * 2;
  parameters.position.targetZ = (height * 2) / Math.tan(0.45);

  parameters.up.targetX = 0;
  parameters.up.targetY = 1;
  parameters.up.targetZ = 0;
};

export default function useCameraAnimation(height) {
  const { camera } = useThree();
  const parameters = useRef({ position: null, up: null });
  const progress = useRef(0);
  const animating = useRef(false);
  const ignoreStart = useRef(true);

  useEffect(() => {
    if (!height) return;
    if (ignoreStart.current) {
      ignoreStart.current = false;
      return;
    }
    parameters.current.position = { ...camera.position };
    parameters.current.up = { ...camera.up };
    progress.current = 0;
    animating.current = true;
    Object.values(parameters.current).forEach((parameter) =>
      updateSource(parameter)
    );
    setTargetParameters(parameters.current, height);
    camera.lookAt(0, 0, 0);
  }, [camera, height]);

  useFrame(() => {
    if (!animating.current) return;

    progress.current += 0.05;
    interpolateParameters(parameters.current, progress.current);
    camera.position.set(...Object.values(parameters.current.position));
    camera.up.set(...Object.values(parameters.current.up));

    if (progress.current >= 1) animating.current = false;
  });
}

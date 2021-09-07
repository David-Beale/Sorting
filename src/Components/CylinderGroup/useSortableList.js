import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import SortableList from "../../Classes/SortableList";

export const useSortableList = ({
  length,
  layout,
  speed,
  sortMethod,
  setHeight,
}) => {
  const meshRef = useRef();
  const colorRef = useRef();
  const colorArray = useMemo(() => new Float32Array(length * 3), [length]);

  const sortableList = useMemo(
    () => new SortableList(length, meshRef, colorRef, colorArray),
    [length, colorArray]
  );

  useEffect(() => {
    sortableList.setLayout(layout);
  }, [sortableList, layout]);

  useEffect(() => {
    sortableList.setSpeed(speed);
  }, [sortableList, speed]);

  useEffect(() => {
    sortableList.setSortMethod(sortMethod[0]);
  }, [sortableList, sortMethod]);

  useEffect(() => {
    switch (layout) {
      case "Spiral":
        return setHeight(sortableList.width / 2);
      case "Line":
        return setHeight(sortableList.width / 2.5);
      case "Pyramid":
        return setHeight(sortableList.width / 2);
      case "Square":
        return setHeight(sortableList.width / 2);
      default:
        break;
    }
  }, [sortableList, layout, setHeight]);

  useFrame(() => {
    sortableList.sort();
  });

  return [meshRef, colorRef, colorArray];
};

import React, { useEffect, useRef, useState } from "react";
import CustomSlider from "../../../../Styling/Components/CustomSlider";
import { SubContainer } from "../../MenuStyle";

export default function SpeedSlider({ speed, length, setSpeed }) {
  const prevLen = useRef(length);
  const [localSliderValue, setLocalSliderValue] = useState(speed);

  useEffect(() => {
    if (prevLen.current === length) return;
    const prevLenCopy = prevLen.current;
    setSpeed((prevSpeed) => {
      return Math.ceil((prevSpeed / prevLenCopy) * length);
    });
    setLocalSliderValue((prevSpeed) => {
      return Math.ceil((prevSpeed / prevLenCopy) * length);
    });
    prevLen.current = length;
  }, [length, setSpeed]);

  const onCommit = (e, value) => {
    setSpeed(value);
  };
  const onChange = (e, value) => {
    setLocalSliderValue(value);
  };
  return (
    <SubContainer>
      Speed
      <CustomSlider
        value={localSliderValue}
        min={1}
        max={length}
        step={1}
        onChange={onChange}
        onChangeCommitted={onCommit}
        valueLabelDisplay="auto"
      />
    </SubContainer>
  );
}

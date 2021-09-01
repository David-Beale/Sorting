import React, { useState } from "react";
import { Input, LengthContainer } from "./LengthStyle";

const formatNumber = (number) => {
  const array = [];
  let counter = 0;
  for (let i = number.length - 1; i >= 0; i--) {
    if (counter > 0 && counter % 3 === 0) array.push(",");
    counter++;
    array.push(number[i]);
  }
  return array.reverse().join("");
};
export default function SpeedSlider({ length, setLength }) {
  const [localLength, setLocalLength] = useState(length);

  const onChange = (e) => {
    const regex = /[^0-9,]/gi;
    const newValue = e.target.value;
    if (newValue && regex.test(newValue)) return;
    let unFormatted = newValue.replace(/,/gi, "");
    setLocalLength(formatNumber(unFormatted));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    let unFormatted = localLength.replace(/,/gi, "");
    if (+unFormatted > 10000) {
      unFormatted = "10000";
    } else if (!unFormatted || +unFormatted < 10) {
      unFormatted = "10";
    }
    setLength(+unFormatted);
    setLocalLength(formatNumber(unFormatted));
  };

  return (
    <LengthContainer row>
      Length
      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <Input
          type="text"
          value={localLength}
          onChange={onChange}
          autoComplete="off"
        />
      </form>
    </LengthContainer>
  );
}

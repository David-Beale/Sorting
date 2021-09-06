import React from "react";
import Button from "./Buttons/Button";

import { ButtonsOuterContainer, ButtonContainer } from "../../MenuStyle";

export default function MethodButtons({ sortMethod, setSortMethod }) {
  return (
    <ButtonsOuterContainer>
      Sorting method
      <ButtonContainer>
        <Button
          text="S"
          name="Selection"
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
        <Button
          text="B"
          name="Bubble"
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
        <Button
          text="Q"
          name="Quick"
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
        <Button
          text="M"
          name="Merge"
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
        <Button
          text="R"
          name="Radix"
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </ButtonContainer>
    </ButtonsOuterContainer>
  );
}

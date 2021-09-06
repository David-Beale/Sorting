import React from "react";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import Button from "./Buttons/Button";
import { ButtonsOuterContainer, ButtonContainer } from "../../MenuStyle";

export default function LayoutButtons({ layout, setLayout }) {
  return (
    <ButtonsOuterContainer>
      Layouts
      <ButtonContainer>
        <Button
          Icon={ShowChartIcon}
          name="Line"
          layout={layout}
          setLayout={setLayout}
        />
        <Button
          Icon={RadioButtonUncheckedIcon}
          name="Circular"
          layout={layout}
          setLayout={setLayout}
        />
        <Button
          Icon={CheckBoxOutlineBlankIcon}
          name="Square"
          layout={layout}
          setLayout={setLayout}
        />
      </ButtonContainer>
    </ButtonsOuterContainer>
  );
}

import React from "react";

import { StyledIconButton } from "../MethodStyle";
import { Tooltip } from "@material-ui/core";

export default function Button({ text, name, setSortMethod, sortMethod }) {
  const onClick = () => {
    setSortMethod([name]);
  };
  return (
    <Tooltip title={name}>
      <StyledIconButton
        enabled={sortMethod[0] === name ? 1 : 0}
        onClick={onClick}
      >
        {text}
      </StyledIconButton>
    </Tooltip>
  );
}

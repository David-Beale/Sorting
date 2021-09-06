import React from "react";

import { StyledIconButton } from "../../../MenuStyle";
import { Tooltip } from "@material-ui/core";

export default function Button({ Icon, name, setLayout, layout }) {
  const onClick = () => {
    setLayout(name);
  };
  return (
    <Tooltip title={name}>
      <StyledIconButton enabled={layout === name ? 1 : 0} onClick={onClick}>
        <Icon />
      </StyledIconButton>
    </Tooltip>
  );
}

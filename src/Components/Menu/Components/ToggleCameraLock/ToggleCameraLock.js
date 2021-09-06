import React from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

import { Tooltip } from "@material-ui/core";
import { StyledIconButtonTop } from "../../MenuStyle";

export default function ToggleCameraLock({ cameraLock, setCameraLock }) {
  const onClick = () => {
    setCameraLock(!cameraLock);
  };
  return (
    <Tooltip title="Toggle camera lock">
      <StyledIconButtonTop enabled={cameraLock ? 1 : 0} onClick={onClick}>
        <PhotoCameraIcon />
      </StyledIconButtonTop>
    </Tooltip>
  );
}

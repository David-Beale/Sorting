import React, { useState, memo } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton/MenuButton";
import ToggleCameraLock from "./Components/ToggleCameraLock/ToggleCameraLock";

import { Container, TopContainer } from "./MenuStyle";

export default memo(function Menu({ cameraLock, setCameraLock }) {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <>
      <MenuButton setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <Drawer variant="persistent" anchor="left" open={menuOpen}>
        <Container>
          <TopContainer>
            <ToggleCameraLock
              cameraLock={cameraLock}
              setCameraLock={setCameraLock}
            />
          </TopContainer>
        </Container>
      </Drawer>
    </>
  );
});

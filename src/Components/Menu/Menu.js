import React, { useState, memo } from "react";
import Drawer from "@material-ui/core/Drawer";

import MenuButton from "./Components/MenuButton/MenuButton";
import ToggleCameraLock from "./Components/ToggleCameraLock/ToggleCameraLock";

import { Container, TopContainer } from "./MenuStyle";
import MethodButtons from "./Components/MethodButtons/MethodButtons";
import SpeedSlider from "./Components/SpeedSlider/SpeedSlider";
import Length from "./Components/Length/Length";

export default memo(function Menu({
  cameraLock,
  setCameraLock,
  sortMethod,
  setSortMethod,
  speed,
  setSpeed,
  length,
  setLength,
}) {
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
          <MethodButtons
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
          <SpeedSlider speed={speed} setSpeed={setSpeed} length={length} />
          <Length length={length} setLength={setLength} />
        </Container>
      </Drawer>
    </>
  );
});

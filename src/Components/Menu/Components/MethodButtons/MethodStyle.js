import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const MethodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 5px 0;
  padding: 5px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px slategray;
  height: 125px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
`;

export const StyledIconButton = styled(IconButton)`
  color: darkslategray;
  font-weight: 600;
  height: 50px;
  width: 50px;
  box-shadow: ${(props) =>
    props.enabled
      ? "inset -4px -4px 8px rgba(255, 255, 255, 0.6), inset 8px 8px 16px rgba(0, 0, 0, 0.2)"
      : "-6px -6px 10px rgba(255, 255, 255, 0.7), 6px 6px 10px rgba(0, 0, 0, 0.3)"};
`;

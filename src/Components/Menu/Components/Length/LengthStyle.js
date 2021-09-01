import styled from "styled-components";

export const LengthContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
  padding: 20px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px -1px slategray;
  height: 70px;
`;

export const Input = styled.input`
  width: 100px;
  height: 45px;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 10px 20px;
  background-color: transparent !important;
  color: darkslategray;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #ffffff;
  font-weight: 700;
  font-size: 1rem;
  text-align: end;
`;

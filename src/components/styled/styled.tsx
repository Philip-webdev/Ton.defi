import styled from "styled-components";


export const Card = styled.div`
  padding: 18px 20px;
  border-radius: 8px;
  border-style: groove;
  border-width:1px;
  border-color:none ;
  background-color: whitesmoke;
font-family: Lexend;
  
`;

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap:5px;
  align-items: center;
  font-family: Lexend;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  left:0;
    gap: 20px;
`;

export const Button = styled.button`
  background-color: ${(props) =>
    props.disabled ? "grey" : "var(--tg-theme-button-color)"};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: var(--tg-theme-button-text-color);
  font-weight: 700;
  font-family: Lexend;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "inherit")};
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Input = styled("input")`
  padding: 10px 20px;
  border-radius: 10px;
  width: 100%;
  font-family: Lexend;
  border: 1px solid black;

  @media (prefers-color-scheme: dark) {
    border: 1px solid #fefefe;
  }
`;


import styled from "styled-components";
import '../index.css';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Button } from "./styled/styled";
import FootNavig from "./footnavig";
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  
    font-family: 'Sora', sans-serif ;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;
   
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: 'Sora', sans-serif ;
`;

function contact(){
return(
    <StyledApp>
        <AppContainer>
         
       <div><FootNavig/></div></AppContainer>
    </StyledApp>
)
}

export default contact;
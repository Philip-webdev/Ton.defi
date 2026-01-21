import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from "lucide-react";

const Packages = styled.div`
background-color: white;
 border-radius:7px;  
  padding:20px;
  color: black;
  font:bolder;
  margin: 7px;
  display:flex;
  justify-contents: auto;
  box-shadow: 2px 2px 2px rgb(1,7,43);
 @media (prefers-color-scheme: dark) {
     background-color: rgb(1,1,1);
      justify-content:center;
     color: white;
        padding:17px;
         margin: 7px;
        
  }
`;

const Price = styled.div`
position: absolute;
left:79%;

font-weight: 1000;
padding: 6px;
color: black;
font-size: 19px;

 @media (prefers-color-scheme: dark) {
     color: white;
        
  }

`;

const TypeOf = styled.div`
border-style: solid;
border-left: none;
border-top: none;
border-bottom: none;
padding: 7px;
border-width: 2px;

`;

const IconWrapper = styled.div`
position:absolute;
margin-top: 17px;
left:79%;
padding: 17px;
`;

const PackagesPage = () => {
   const navigate = useNavigate();
  return (
  <div>
    <div style={{display:'flex', justifyContent:'center'}}><h2>Our Packages</h2></div>

    <div style={{display:'inline'}}> 
      <Packages style={{boxShadow: '2px 2px 7px yellowgreen'}} onClick={() => navigate('', {state:{type: 'starter', price: '$20'}})}><TypeOf style={{borderRightColor:'yellowgreen'}}  >Starter package <br/><small style={{fontSize:'smaller', color:'gray'}}>A basic food plan for freshmen</small></TypeOf><Price>$20</Price>
      <IconWrapper><ChevronRight style={{color:'gray'}}/></IconWrapper></Packages>
       <Packages style={{boxShadow: '2px 2px 7px lightblue'}} onClick={() => navigate('', {state:{type: 'frequent', price: '$50'}})}><TypeOf style={{borderRightColor:'lightblue', marginRight:'27px'}} >Mini package<br/><small style={{fontSize:'smaller', color:'gray'}}>A compact food plan for guys</small></TypeOf><Price>$50</Price>
       <IconWrapper><ChevronRight style={{color:'gray'}}/></IconWrapper></Packages>
        <Packages style={{boxShadow: '2px 2px 7px purple'}} onClick={() => navigate('', {state:{type: 'maestro', price: '$100'}})}><TypeOf style={{borderRightColor:'purple'}} >Maestro package<br/><small style={{fontSize:'smaller', color:'gray'}}>A compact food plan for damsels</small></TypeOf><Price>$100</Price>
        <IconWrapper><ChevronRight style={{color:'gray'}}/></IconWrapper></Packages>
    </div>

  </div>
  );
};

export default PackagesPage;

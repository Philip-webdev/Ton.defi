import styled from "styled-components";
import { useNavigate } from 'react-router-dom';


const Packages = styled.div`
background-color: white;
 border-radius:7px;  
  padding:7px;
  color:  white;
  font:bolder;
  margin: auto;
  justify-contents: auto;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(1,1,1);
      justify-content:center;
     color: white;
        padding:7px;
         margin:auto;
        
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
border: none;
border-radius: 10px;
height:200px;
padding: 7px;
border-width: 2px;

`;

const Button = styled.button`
display:flex;
color: black;
justify-content: center;
border-radius:7px;
padding: 7px;
border:none;
width:70%;
justifySelf:center;
margin-top: 7px;
`;

const PackagesPage = () => {
   const navigate = useNavigate();
  return (
  <div>
    <div style={{display:'flex', justifyContent:'center'}}><h2>Food Packages</h2></div>

    <div style={{display:'grid', gridTemplateColumns:'auto auto auto'}}> 
      <Packages  onClick={() => navigate('/checkout', {state:{type: 'starter', price: '$20'}})}><TypeOf style={{background:'rgb(51, 232, 191)'}} ><div style={{height:'auto'}}><img src="/close-up-fork-with-broccoli-tomato-fusilli (1).jpg"style={{width:'100%', borderRadius:'7px'}}/>
      </div>Starter <br/><small style={{ fontSize:'smaller', marginTop:'100px'}}>A basic food plan</small>
      <br/><Button>Get</Button></TypeOf>
    </Packages>
       <Packages onClick={() => navigate('', {state:{type: 'frequent', price: '$50'}})}><TypeOf style={{background:'rgb(139, 48, 241)'}}><div style={{height:'auto'}}><img src="/close-up-fork-with-broccoli-tomato-fusilli (1).jpg"style={{width:'100%', borderRadius:'7px'}}/></div>
      Mini<br/><small style={{fontSize:'smaller'}}>A compact food plan</small>
       <br/><Button>Get</Button></TypeOf>
     </Packages>
        <Packages onClick={() => navigate('', {state:{type: 'maestro', price: '$100'}})}><TypeOf style={{background:'rgb(250, 117, 52)'}}><div><img src="/close-up-fork-with-broccoli-tomato-fusilli (1).jpg"style={{width:'100%' ,height:'10%', borderRadius:'7px'}}/></div>
        Maestro<br/><small style={{fontSize:'smaller'}}>A top food plan</small>
        <br/><Button>Get</Button></TypeOf>
      </Packages>
    </div>

  </div>
  );
};

export default PackagesPage;

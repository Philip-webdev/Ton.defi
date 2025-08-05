import   { useEffect, useState } from "react";
import styled from "styled-components";
import 'react-icons/bs';
import { BsArrowLeft } from "react-icons/bs";
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  
  font-family: Lexend;
   min-height: 150vh;
  padding: 20px;
 zoom :100%;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(33,33,33);
    color: white;
  }
`;
const AppContainer = styled.div`
  width: 100%;
  height:fit-content;
  margin: 0;
`;
const Input = styled.input`
background-color: white;
padding: 20px;
width: 90%;
height: 40px;

font-size: 16px;
font-family: Lexend;
placeholder :transparent;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
    
      color: gray ;
  }
`;
 function Latest() {
const [newsList, setNewsList] = useState(<div></div>);

useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await fetch("https://twa-backend-g83o.onrender.com/cryptofund", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        setNewsList(
          <div>
            {data.map((news: { title: string; content?: string }) => (
              <div>
                <p>{news.title}</p>
                 <p>{news.content}</p>
              </div>
            ))}
          </div>
        );
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  fetchNews();
}, []);


return (
<StyledApp>
<AppContainer>
  <div style={{display:'flex', top:'0'}}><div  style={{ margin:'auto', justifyContent:'space-around'}}><a href="#/market" style={{color:'gray'}}><BsArrowLeft/></a></div><div>Updates</div></div>
  {newsList}
</AppContainer>
</StyledApp>
);
};
export default Latest;
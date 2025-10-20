import { useState } from "react";
import { Address, toNano } from "ton";
 
import { Card, FlexBoxCol, FlexBoxRow,Button , Input } from "./styled/styled";
import { useLocation } from "react-router-dom";

export default  function cartList() { 

   const {state} = useLocation() ;
  const [content , setContent] = useState();
  setContent(state)
   
  return (
    <Card  style={{ background: 'linear-gradient(110deg, #0098EA  0%,white 100%)' , aspectRatio:'10/5' }}>
  <textarea value={content} style ={{width:'inherit', height :'inherit'}} />
    </Card>
  );
}

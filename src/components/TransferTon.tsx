import { useState } from "react";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow,Button , Input } from "./styled/styled";
import { useLocation } from "react-router-dom";

export function TransferTon() { 

  const { sender, connected } = useTonConnect();
  const { state } = useLocation();
  const price = state.priceTosend;
  const [tonAmount, setTonAmount] = useState(price);
  const [tonRecipient, setTonRecipient] = useState(
    "UQBx_jqTG0klK4UJZlaEfK0J5TvJmj3B3-vbpFBTmYdOODMR"
  );

  return (
    <Card  style={{ background: 'linear-gradient(110deg, #0098EA  0%,white 100%)' , aspectRatio:'10/5' }}>
      <FlexBoxCol>
       <div style={{display:'flex', justifyContent:'space-between', margin:'7px', color:'black'}}><div>Debit</div><div> TON </div></div>
     
        <FlexBoxRow style={{justifyContent:'flex'}}>
          
          <Input
           style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(Number(e.target.value))}
          ></Input> <Button
          disabled={!connected}
          style={{ marginTop: 0 }}
          onClick={async () => {
            sender.send({
              to: Address.parse(tonRecipient),
              value: toNano(tonAmount),
            });
          
          }}
        >
          Transfer
        </Button>
        </FlexBoxRow>
        <FlexBoxRow>
        
          <Input
            style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            value={tonRecipient}
             
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input> 
        </FlexBoxRow>
      
      </FlexBoxCol>
    </Card>
  );
}

import { useState } from "react";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";


export function TransferTon() {
  const { sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState(0);
  const [tonRecipient, setTonRecipient] = useState(
    "UQBx_jqTG0klK4UJZlaEfK0J5TvJmj3B3-vbpFBTmYdOODMR"
  );
  const dropdown = () => {
   
    const section = document.getElementById('ton-qr') as HTMLElement | null;
  
    if (section != null && section.style.display == 'block') {
        section.style.display = 'none'; 
    } else if(section != null) {
      section.style.display = 'block';
    }
  };
  
  return (
    <Card  style={{ background: 'linear-gradient(110deg, #0098EA  0%,white 100%)' }}>
      <FlexBoxCol>
        <h3>Transfer TON </h3> 
     
        <FlexBoxRow>
          
          <Input
           style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(Number(e.target.value))}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
        
          <Input
            style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            value={tonRecipient}
             
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            sender.send({
              to: Address.parse(tonRecipient),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
    </Card>
  );
}

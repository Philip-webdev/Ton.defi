import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import QRScanner from "./QRcode";
import { BsQrCodeScan } from "react-icons/bs";

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
    <Card>
      <FlexBoxCol>
        <h3>Transfer TON <Button onClick={dropdown}><BsQrCodeScan/></Button></h3> 
        <div id='ton-qr' style={{ position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)' }}><QRScanner onRender={(address: string) =>  setTonRecipient(address)} /></div>
        <FlexBoxRow>
          <label>Amount </label> 
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(Number(e.target.value))}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>To </label>
          <Input
            style={{ marginRight: 8 }}
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

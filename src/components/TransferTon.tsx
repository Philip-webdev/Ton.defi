import { useState } from "react";
import styled from "styled-components";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";
import { Scanner } from "./Send";
import { BsQrCodeScan } from "react-icons/bs";

export function TransferTon() {
  const { sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0");
  const [tonRecipient, setTonRecipient] = useState(
    "UQBx_jqTG0klK4UJZlaEfK0J5TvJmj3B3-vbpFBTmYdOODMR"
  );

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer TON <Button onClick={Scanner}><BsQrCodeScan/></Button></h3> 
        <div style={{position:'absolute'}}><Scanner    onResult={(address: string) =>  setTonRecipient(address)} /></div>
        <FlexBoxRow>
          <label>Amount </label> 
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
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

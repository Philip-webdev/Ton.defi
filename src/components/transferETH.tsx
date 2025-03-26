import { connected } from "process";
import { useState } from "react";
import { Button, FlexBoxCol, FlexBoxRow, Input, Card} from "../components/styled/styled";
import * as multichainWallet from 'multichain-crypto-wallet';


export  function TransferETH() {
    const [ETHAmount, setETHAmount] = useState<number>(0);
    const [ETHRecipient, setETHRecipient] = useState<string>("");
    var ethprivatekey = localStorage.getItem('ethereumWalletkey') as string ;
    var messageElement = document.getElementById('message');
    var message = messageElement ? messageElement.innerText : '';

    const transferEth = async() => await multichainWallet.transfer({
      recipientAddress: ETHRecipient,
      amount: Number((document.getElementById('ethAmt') as HTMLInputElement).value) ,
      network: 'ethereum',
      rpcUrl: 'https://rpc.ankr.com/eth_goerli',
      privateKey:
      ethprivatekey,
      gasPrice: '50', // Gas price is in Gwei. Leave empty to use default gas price
      data: message, // Send a message
    })// NOTE - For other EVM compatible blockchains all you have to do is change the rpcUrl.
    .then(res => {
      if (res.ok) {
          const S_button = document.getElementById('info');
          if (S_button) {
              S_button.innerText = 'Success';
              S_button.style.backgroundColor = 'green';
          }

}
});

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer ETH</h3>
        <FlexBoxRow>
          <label>Amount </label>
          <Input id= 'ethAmt' 
            style={{ marginRight: 8 }}
            type="number"
            value={ETHAmount}
            onChange={(e) => setETHAmount(Number(e.target.value))}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>To </label>
          <Input
            style={{ marginRight: 8 }}
            value={ETHRecipient}
            onChange={(e) => setETHRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Message </label>
          <Input  id="message"
            style={{ marginRight: 8 }}
          ></Input>
        </FlexBoxRow>
        <Button id="info"
         disabled={!ETHRecipient || ETHAmount <= 0}
          style={{ marginTop: 18 }}
          onClick={async () => {transferEth}
          }
        >
          Transfer
        </Button>
      </FlexBoxCol>
    </Card>
  );
}

import { connected } from "process";
import { useState } from "react";
import { Button, FlexBoxCol, FlexBoxRow, Input, Card} from "../components/styled/styled";
import * as multichainWallet from 'multichain-crypto-wallet';
import { url } from "inspector";
 
 

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
      rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq',
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
const dropdown = () => {
   
  const section = document.getElementById('eth-qr') as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};
  return (
    <Card style={{aspectRatio:'16/9', width:'100%',   backgroundImage: 'url(https://raw.githubusercontent.com/Philip-webdev/nexr-landing-hub/refs/heads/main/ethcard1.svg)',  backgroundSize: 'cover',  backgroundRepeat: 'no-repeat' }} id="eth-qr">
      <FlexBoxCol>
      <div style={{  display:'flex', justifyContent:'space-between', margin:'7px', color:'black'}}><div>Debit</div><div> ETH </div></div>
        
        <FlexBoxRow style={{justifyContent:'flex'}}>
         
          <Input id= 'ethAmt' 
            style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            type="number"
            value={ETHAmount}
            onChange={(e) => setETHAmount(Number(e.target.value))}
          ></Input>
            <Button   
         disabled={!ETHRecipient || ETHAmount <= 0}
          style={{ marginTop: 0 }}
          onClick={async () => {transferEth}
          }
        >
          Transfer
        </Button>
        </FlexBoxRow>
        <FlexBoxRow>
         
          <Input
            style={{background:'transparent',borderBottom:'none',borderRadius:'0px', marginRight: 8 ,borderRight:'none' , borderLeft:'none', borderTop:'0px', color:'black'}}
            value={ETHRecipient}
            placeholder="0x9b9..."
            onChange={(e) => setETHRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          
          <Input  id="message" placeholder="Say something..."
           style={{background:'transparent',borderBottom:'none',borderRadius:'0px', marginRight: 8 ,borderRight:'none' , borderLeft:'none', borderTop:'0px', color:'black'}}
          ></Input>
        </FlexBoxRow>
      
      </FlexBoxCol>
    </Card>
  );
}

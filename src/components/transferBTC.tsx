import { Button, FlexBoxCol, FlexBoxRow, Input, Card} from "../components/styled/styled";
import * as multichainWallet from 'multichain-crypto-wallet';
import { useState } from "react";


export  function TransferBTC() {
    const [BTCAmount, setBTCAmount] = useState<number>(0);
    const [BTCRecipient, setBTCRecipient] = useState<string>("");
    var bitprivatekey = localStorage.getItem('bitcoinWalletkey') as string ;

     const transferBitcoin = async () => multichainWallet.transfer({
        privateKey:bitprivatekey ,
        recipientAddress: BTCRecipient,
        amount: BTCAmount,
        network: 'bitcoin', // 'bitcoin' or 'bitcoin-testnet'
        fee: 10000, // Optional param default value is 10000
        subtractFee: true, // Optional param default value is false
      })
      .then(res => {
        if (res.ok) {
          console.log('Transaction successful:', res);
            const S_button = document.getElementById('info');
            if (S_button) {
                S_button.innerText = 'Success';
                S_button.style.backgroundColor = 'green';
            }

}
else {
  console.log('Transaction failed:', res);
  const S_button = document.getElementById('info');
  if (S_button) {
      S_button.innerText = 'Failed';
      S_button.style.backgroundColor = 'red';
  }
}
});
 
  

  return (
    <Card style={{ backgroundImage: 'url(https://raw.githubusercontent.com/Philip-webdev/nexr-landing-hub/refs/heads/main/bitcard.svg)',aspectRatio:'10/5',  backgroundSize: 'cover',  backgroundRepeat: 'no-repeat' }}>
      <FlexBoxCol>
      <div style={{display:'flex', justifyContent:'space-between', margin:'7px', color:'black'}}><div>Debit</div><div> BTC </div></div>

        <FlexBoxRow style={{justifyContent:'flex'}}>

          <Input
             style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            type="number"
            value={BTCAmount}
            onChange={(e) => setBTCAmount(Number(e.target.value))}
          ></Input> <Button id="info"
          disabled={!BTCRecipient || BTCAmount <= 0}
          style={{ marginTop: 0 }}
          onClick={async () => {transferBitcoin}
          }
        >
          Transfer
        </Button>
        </FlexBoxRow>
        <FlexBoxRow>
           
          <Input
            style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            value={BTCRecipient}
            placeholder="17s..."
            onChange={(e) => setBTCRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
       
      </FlexBoxCol>
    </Card>
  );
}

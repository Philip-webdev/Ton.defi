import { Button, FlexBoxCol, FlexBoxRow, Input, Card} from "../components/styled/styled";
import * as multichainWallet from 'multichain-crypto-wallet';
import { useState } from "react";
import { connected } from "process";


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
      });

  

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer BTC</h3>
        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={BTCAmount}
            onChange={(e) => setBTCAmount(Number(e.target.value))}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>To </label>
          <Input
            style={{ marginRight: 8 }}
            value={BTCRecipient}
            onChange={(e) => setBTCRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!BTCRecipient || BTCAmount <= 0}
          style={{ marginTop: 18 }}
          onClick={async () => {transferBitcoin}
          }
        >
          Transfer
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
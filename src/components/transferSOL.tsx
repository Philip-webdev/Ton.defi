import { useState } from "react";
import { Button, FlexBoxCol, FlexBoxRow, Input, Card } from "../components/styled/styled";
import * as multichainWallet from 'multichain-crypto-wallet';


export function TransferSOL() {
    const [SOLAmount, setSOLAmount] = useState<number>(0);
    const [SOLRecipient, setSOLRecipient] = useState<string>(""); // Initialize as an empty string
    const solPrivateKey = localStorage.getItem('solanaWalletkey') as string;

    const transferSol = async () => {
        try {
            const transferResponse = await multichainWallet.transfer({
                recipientAddress: SOLRecipient,
                amount: SOLAmount, // Use SOLAmount directly
                network: 'solana',
                rpcUrl: 'https://solana-mainnet.g.alchemy.com/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq',
                privateKey: solPrivateKey
            })
            .then(res => {
                if (res.ok) {
                    const S_button = document.getElementById('info');
                    if (S_button) {
                        S_button.innerText = 'Success';
                        S_button.style.backgroundColor = 'green';
                    }

        }
        });
            console.log("Transfer successful:", transferResponse);
        } catch (error) {
            console.error("Error transferring SOL:", error);
        }
    };
    const dropdown = () => {
   
        const section = document.getElementById('sol-qr') as HTMLElement | null;
      
        if (section != null && section.style.display == 'block') {
            section.style.display = 'none'; 
        } else if(section != null) {
          section.style.display = 'block';
        }
      };
    return (
        <Card style={{ backgroundImage: 'url(https://raw.githubusercontent.com/Philip-webdev/nexr-landing-hub/refs/heads/main/solcard.svg)', height:'190px',  backgroundSize: 'cover',  backgroundRepeat: 'no-repeat'}}>
            <FlexBoxCol>
            <div style={{display:'flex', justifyContent:'space-between', margin:'7px', color:'white'}}><div>Debit</div><div> SOL </div></div>
      <FlexBoxRow style={{justifyContent:'flex'}}>
         
          <Input id= 'ethAmt' 
            style={{background:'transparent',borderBottom:'none', borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black'}}
            type="number"
            value={SOLAmount}
            onChange={(e) => setSOLAmount(Number(e.target.value))}
          ></Input>
            <Button   
         disabled={!SOLRecipient || SOLAmount <= 0}
          style={{ marginTop: 0 }}
          onClick={async () => {transferSol}
          }
        >
          Transfer
        </Button>
        </FlexBoxRow>
                <FlexBoxRow>
                    
                    <Input
                        style={{background:'transparent', borderBottom:'none',borderRadius:'0px',marginRight: 8, borderRight:'none' , borderLeft:'none', borderTop:'0px',  borderColor:'black ', color:'black '}}
                        value={SOLRecipient}
                        placeholder="3sN..."
                        onChange={(e) => setSOLRecipient(e.target.value)} // Capture recipient address
                    />
                </FlexBoxRow>

            </FlexBoxCol>
        </Card>
    );
}

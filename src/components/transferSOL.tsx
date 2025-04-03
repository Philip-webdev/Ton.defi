import { useState } from "react";
import { Button, FlexBoxCol, FlexBoxRow, Input, Card } from "../components/styled/styled";
import * as multichainWallet from 'multichain-crypto-wallet';
 
import { BsQrCodeScan } from "react-icons/bs";
import QRScanner from "./QRcode";

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
                rpcUrl: 'https://api.devnet.solana.com',
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
        <Card>
            <FlexBoxCol>
                <h3>Transfer SOL </h3>
     <FlexBoxRow>
                    <label>Amount </label>
                    <Input
                        style={{ marginRight: 8 }}
                        type="number"
                        value={SOLAmount}
                        onChange={(e) => setSOLAmount(Number(e.target.value))} // Convert to number
                    />
                </FlexBoxRow>
                <FlexBoxRow>
                    <label>To </label>
                    <Input
                        style={{ marginRight: 8 }}
                        value={SOLRecipient}
                        onChange={(e) => setSOLRecipient(e.target.value)} // Capture recipient address
                    />
                </FlexBoxRow>
                <Button id="info"
                    disabled={!SOLRecipient || SOLAmount <= 0} // Disable if no recipient or amount is invalid
                    style={{ marginTop: 18 }}
                    onClick={transferSol} // Call transfer function on click
                >
                    Transfer
                </Button>
            </FlexBoxCol>
        </Card>
    );
}

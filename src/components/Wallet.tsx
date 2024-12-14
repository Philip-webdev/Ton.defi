import "@twa-dev/sdk";


const { Wallet, WalletVersion } = require('tonsdk');

async function generateWallet() {
    const wallet = new Wallet(WalletVersion.v4R2);
    const mnemonic = wallet.mnemonic;
    const privateKey = wallet.privateKey;
    const address = wallet.address;

    // Store mnemonic and private key securely
    console.log('Mnemonic:', mnemonic);
    console.log('Private Key:', privateKey);
    console.log('Address:', address);
}
function createWallet(){
    generateWallet();
}

export default createWallet;


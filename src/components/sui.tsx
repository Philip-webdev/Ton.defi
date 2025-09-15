// import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
// import { getFullnodeUrl } from '@mysten/sui/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '@mysten/dapp-kit/dist/index.css';
// import { ConnectButton, useConnectWallet, useWallets } from '@mysten/dapp-kit';
// import styled from "styled-components";

// const StyledApp = styled.div`
//   background-color: #F9F9F9;
//   color: black;
//   margin:0;
// font-family: Lexend;
 
//    @media (prefers-color-scheme: dark) {
// 	 background-color: rgb(15,15,15);
// 	 color: white ;
// }
// 	  height : 190vh;
//   padding: 20px;
//    zoom :100%;
   
// `;

// const { networkConfig } = createNetworkConfig({
// 	localnet: { url: getFullnodeUrl('localnet') },
// 	mainnet: { url: getFullnodeUrl('mainnet') },
// });
// const queryClient = new QueryClient();

// function suiWallet() {

// 	// const wallets = useWallets();
// 	// const { mutate: connect } = useConnectWallet();
// 	return (
// 		<StyledApp>
// 		<QueryClientProvider client={queryClient}>
// 			<SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
// 				<WalletProvider
// 				slushWallet={{
// 				name: 'nekstpei'
// 			}}>
// 					<div>
// 		<div style={{ padding: 20 }}>
// 			<ConnectButton />
// 			{/* <ul>
// 				{wallets.map((wallet) => (
// 					<li key={wallet.name}>
// 						<button
// 							onClick={() => {
// 								connect(
// 									{ wallet },
// 									{
// 										onSuccess: () => console.log('connected'),
// 									},
// 								);
// 							}}
// 						>
// 							Connect to {wallet.name}
// 						</button>
// 					</li>
// 				))}
// 			</ul> */}
// 		</div>
//                     </div>
// 				</WalletProvider>
// 			</SuiClientProvider>
// 		</QueryClientProvider>
// 		</StyledApp>
// 	);
// }
// export default suiWallet;
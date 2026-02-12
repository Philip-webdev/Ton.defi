import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import FaucetJetton from "../contracts/faucetJetton";
import { Address, OpenedContract } from "@ton/core";
import FaucetJettonWallet from "../contracts/faucetJettonWallet";
import { useQuery } from "@tanstack/react-query";

export function useFaucetJettonContract() {
  const { wallet, sender } = useTonConnect();
  const { client } = useTonClient();

  const faucetJettonContract = useAsyncInitialize(async () => {
    if (!client || !wallet) return;
    const contract = new FaucetJetton(
      Address.parse("UQBx_jqTG0klK4UJZlaEfK0J5TvJmj3B3-vbpFBTmYdOODMR") 
    );
    return client.open(contract);
  }, [client, wallet]);

  const jwContract = useAsyncInitialize(async () => {
    if (!faucetJettonContract || !client || !wallet) return;
    const jettonWalletAddress = await faucetJettonContract.getWalletAddress(
      Address.parse(wallet)
    );
    return client.open(
      new FaucetJettonWallet(Address.parse(jettonWalletAddress))
    );
  }, [faucetJettonContract, client, wallet]);

  const { data, isFetching } = useQuery({
    queryKey: ["jetton"],
    queryFn: async () => {
      if (!jwContract) return null;

      const balance = await jwContract.getBalance();
      return balance.toString();
    },
    refetchInterval: 3000
  });

  return {
    mint: () => {
      if (faucetJettonContract && wallet) {
        faucetJettonContract.sendMintFromFaucet(sender, Address.parse(wallet));
      }
    },
    jettonWalletAddress: jwContract?.address.toString(),
    balance: isFetching ? null : data,
  };
}
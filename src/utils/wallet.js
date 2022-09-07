// TODO 2.a - Setup a Beacon Wallet instance
import { BeaconWallet } from "@taquito/beacon-wallet";
export const wallet = new BeaconWallet({
  name: "Key",
  preferredNetwork: "jakartanet",
});

// TODO 2.b - Complete connectWallet function (for ithacanet)
export const connectWallet = async () => {
  await wallet.requestPermissions({ network: { type: "jakartanet" } });
};

// TODO 2.c - Complete getAccount function
export const getAccount = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  } else {
    return "";
  }
};

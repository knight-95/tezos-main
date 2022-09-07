import { tezos } from "./tezos";

//Tezos doesnt accept decimals
let x = 3 * 10 ** 18;
let y = 7 * 10 ** 18;
export const generateKeys = async () => {
  try {
    const contract = await tezos.wallet.at(
      "KT1STdXhtaGLKXHdopCrMpoQWtez9e2rmmfF"
    );
    const op = await contract.methods.setUserKey(x, y).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
};

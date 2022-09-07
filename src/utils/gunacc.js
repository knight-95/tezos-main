import Gun from "gun";
import "gun/sea";
import "gun/axe";
// initialize gun locally
const gun = Gun({
  peers: [
    "http://localhost:8765/gun",
    "https://gun-manhattan.herokuapp.com/gun",
    "https://quilt-chat.herokuapp.com/gun",
  ],
  localStorage: false,
});
//Database
let client = gun.user().recall({ localStorage: true });

async function account() {
  let rand = Math.random().toString();
  client.create(rand, rand);
  client.auth(rand, rand);
}
if (client.is) {
  console.log("You are logged in");
} else {
  account();
}
//Gun User

export const user = gun;

export function getIndex() {
  let d = Date.now();
  let r = d / 10 ** 7; //almost 3hrs
  let index = Math.floor(r);
  return index;
}

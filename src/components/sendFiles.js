import { user, getIndex } from "../utils/gunacc";
import { getAccount } from "../utils/wallet";
import { upload, retrieve } from "./web3";
import { path, convert } from "./sendImg";

let account;
const index = getIndex();

export function fileUP() {
  let upload = document.getElementById("fileUpload");
  upload.click();
}

export const uploadFile = async (e) => {
  account = await getAccount();
  const file = e.target.files[0];
  upload(file).then((e) => {
    sendFile(e);
  });
};

function sendFile(base) {
  const d = new Date().getTime();
  const messageData = {
    name: account,
    message: base,
    createdAt: d,
    type: "file",
  };
  let metadata = JSON.stringify(messageData);

  path.get(index).set(metadata);

  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
    /* you can also use 'auto' behaviour 
         in place of 'smooth' */
  });
}

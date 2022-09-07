import { user, getIndex } from "../utils/gunacc";
import { getAccount } from "../utils/wallet";
import { upload, retrieve } from "./web3";

let account;
const index = getIndex();

export function picUP() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

export const uploadImg = async (e) => {
  const file = e.target.files[0];
  // console.log(file);
  // const cid =
  upload(file).then((e) => {
    sendPic(e);
  });

  // const base64 = await convert(file);
  account = await getAccount();
  // sendPic(cid);
  //   console.log(base64);
};

export const convert = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const path = user
  .get("/orbitdb/zdpuB3Hq67P1fd2C6EBVGFH2qT3fCHYwHD1Tv5Rnjx5TW8jN3")
  .get("global");

function sendPic(base) {
  const d = new Date().getTime();

  const messageData = {
    name: account,
    message: base,
    createdAt: d,
    type: "img",
  };
  let metadata = JSON.stringify(messageData);
  // console.log(metadata);

  path.get(index).set(metadata);
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
    /* you can also use 'auto' behaviour 
       in place of 'smooth' */
  });
}

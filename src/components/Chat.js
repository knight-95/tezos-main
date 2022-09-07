import { getAccount } from "../utils/wallet";
import { useState } from "react";
import global from "../assets/global.png";
import { user, getIndex } from "../utils/gunacc";
import pic from "../assets/pic.png";
import video from "../assets/video.png";
import file from "../assets/file.png";
import download from "../assets/download.png";
import close from "../assets/close.png";
import uploadIcon from "../assets/uploadIcon.png";
import attachment from "../assets/attachment.png";
import attachment2 from "../assets/attachment2.ico";
import send from "../assets/send.png";
import { picUP, uploadImg, path } from "./sendImg";
import { fileUP, uploadFile } from "./sendFiles";
import { upload, retrieve, Download } from "./web3";

// import './chat.css';

export default function Chat() {
  const [acc, setAcc] = useState(false);
  const [display, setDisplay] = useState(false);
  let account;
  const index = getIndex();

  async function isAccount() {
    account = await getAccount();
    if (account !== "") {
      setAcc(true);
      clearInterval(isLogged);
    }
  }
  function scroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    });
  }

  const isLogged = setInterval(isAccount, 500);
  // let show;
  function OpenForm() {
    if (display === false) {
      document.getElementById("myForm").style.display = "block";
      setDisplay(true);
      Display();
      setTimeout(scroll, 1000);
      let input = document.getElementById("input");
      input.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
          globalChat();
        }
      });
      // show = setInterval(Display, 1000);
    } else {
      closeForm();
    }
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
    // clearInterval(show);
    setDisplay(false);
  }

  // add msgs to gun
  async function globalChat() {
    let input = document.getElementById("input");
    let text;
    if (input.value === "") {
      return;
    } else {
      text = input.value;
    }

    // let index = d.toISOString();
    const d = new Date().getTime();
    const messageData = {
      name: account,
      message: text,
      createdAt: d,
      type: "txt",
    };
    let metadata = JSON.stringify(messageData);

    path.get(index).set(metadata);
    input.value = "";
    scroll();
  }

  //get msgs from gun
  let diff = 1;
  let Name = [],
    Message = [],
    CreatedAt = [],
    Type = [];

  //load previous msgs
  function load() {
    let i = index - diff;
    let msg = [],
      nam = [],
      created = [],
      typ = [];
    path
      .get(i)
      .map()
      .once(function (data, key) {
        if (data !== undefined) {
          try {
            data = JSON.parse(data);
            nam.push(data.name);
            msg.push(data.message);
            created.push(data.createdAt);
            typ.push(data.type);
          } catch (err) {
            console.log(err);
          }
        }
      });
    diff = diff + 1;
    Message = msg.concat(Message);
    Name = nam.concat(Name);
    CreatedAt = created.concat(CreatedAt);
    Type = typ.concat(Type);
    // console.log(Message);
    // if ((message.length = 0)) {
    //   load();
    // }
    Display();
  }

  function getMsg(index) {
    path
      .get(index)
      .map()
      .once(function (data, key) {
        if (data !== undefined) {
          try {
            data = JSON.parse(data);
            Name.push(data.name);
            Message.push(data.message);
            CreatedAt.push(data.createdAt);
            Type.push(data.type);
          } catch (err) {
            console.log(err);
          }

          if (display === true) {
            Display();
          }
        }
      });
  }

  //add msgs to html
  const Display = async () => {
    document.getElementById("txt").innerHTML = "";
    if (Name.length > 0) {
      for (let i = 0; i < Message.length; ++i) {
        let datetime = new Date(CreatedAt[i]);
        if (Type[i] === "txt") {
          let txtmsg = document.createElement("div");
          txtmsg.innerHTML = `<h4 style="color:white">${Message[i]}</h4><p style="color:grey;">
              ${Name[i]}<br />${datetime}</p><br/><br/>`;
          document.getElementById("txt").appendChild(txtmsg);
        } else if (Type[i] === "file") {
          let dwnload = document.createElement("a");
          dwnload.type = "button";
          dwnload.innerHTML = `<img src=${download} height="200px" alt=""/>`;
          dwnload.onclick = () => Download(Message[i]);
          document.getElementById("txt").appendChild(dwnload);
          let frm = document.createElement("div");
          frm.innerHTML = `<br /><h6 style="color:grey;">${Name[i]}<br />${datetime}</h6><br/><br/>`;
          document.getElementById("txt").appendChild(frm);
        }
      }
    } else {
      console.log("pls load previous msgs");
    }
    scroll();
  };
  getMsg(index);

  if (acc === false) {
    return (
      <div className="notConnected">
        <h1>Please connect wallet to continue...</h1>;
      </div>
    );
  } else {
    return (
      <div>
        <img
          src={global}
          type="button"
          className="open-button"
          onClick={() => OpenForm()}
          alt=""
        />
        <div className="chat-popup" id="myForm">
          <header id="heading" className="heading">
            <h1>Global Chat</h1>
          </header>
          <button
            className="button"
            type="button"
            onClick={() => load()}
            id="load"
          >
            Load previous messages
          </button>
          <div className="chats" id="chats">
            <div id="txt"></div>
          </div>
          <form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              className="txt-input"
              type="text"
              placeholder=" Write something..."
              id="input"
            />

            <input
              className="fileUpload"
              id="fileUpload"
              type="file"
              onChange={(e) => {
                uploadFile(e);
              }}
              style={{ display: "none " }}
            />

            <img
              className="file"
              id="file"
              type="button"
              src={attachment2}
              onClick={() => fileUP()}
              alt="uploadIcon"
              width="50"
              height="50"
            />

            <img
              src={send}
              alt="send"
              type="button"
              className="button-new"
              onClick={() => globalChat()}
              value="Send"
              id="send"
              height="40"
              width="50"
            />

            {/* <input
              type="button"
              className="button"
              onClick={() => globalChat()}
              value="Send"
              id="send"
            /> */}

            {/* <button
              type="button"
              className="button"
              onClick={() => closeForm()}
            >
              Close
            </button> */}

            <img
              src={close}
              alt="close"
              type="button"
              className="button-new"
              onClick={() => closeForm()}
              height="50"
              width="50"
            />
          </form>
        </div>
      </div>
    );
  }
}

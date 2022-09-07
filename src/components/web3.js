import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";

let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRBMUQxMzRiODgxNTQ1OEEzOWM3YmIxRTdmRjZiM0JFQTVBZmE5MkEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk5NDc4NTgwODgsIm5hbWUiOiJ0ZXpvcyJ9.l40fHgNQsymrAsuDCRmxpGVaH_6p1OjpHYWSiMZq5RE";

const web3storage = new Web3Storage({ token });

export async function upload(imageFile) {
  const cid = await web3storage.put([imageFile]);
  // console.log(cid);
  return cid;
}

export async function retrieve(cid) {
  const res = await web3storage.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();

  for (const file of files) {
    // console.log(`${file.cid} -- ${file.path} -- ${file.size} -- ${file.name}`);
    console.log(file);
  }
  return files[0];
}

// retrieve("bafybeie6ajlephkjjdkgbv4edmmrpi3ks264oiyu3j62l5crucygti3kja");

export async function Download(cid) {
  // console.log(cid);

  // let file = retrieve(cid);

  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = `https://ipfs.io/ipfs/${cid}`;
  // link.download = file.name;
  link.target = `_blank`;
  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    link.parentNode.removeChild(link);
  }, 0);
}

const urlX =
  "https://api.jakartanet.tzkt.io/v1/contracts/KT1STdXhtaGLKXHdopCrMpoQWtez9e2rmmfF/bigmaps/xkey/keys";
const urlY =
  "https://api.jakartanet.tzkt.io/v1/contracts/KT1STdXhtaGLKXHdopCrMpoQWtez9e2rmmfF/bigmaps/ykey/keys";
export let xkey = {};
export let ykey = {};
fetch(urlX)
  .then((r) => r.json())
  .then((data) => {
    Array.from(data).forEach((e) => {
      xkey[e.key] = e.value;
      console.log(xkey["tz1Sw1gGA6bi2drimg1yUYF6ZcTsmaCyNnuw"]);
    });
  });

fetch(urlY)
  .then((r) => r.json())
  .then((data) => {
    Array.from(data).forEach((e) => {
      ykey[e.key] = e.value;
    });
  });
// console.log(xkey, ykey);

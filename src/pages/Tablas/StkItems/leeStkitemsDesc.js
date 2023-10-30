import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leeStkItemsDesc(StkRubroAbr) {
  return new Promise(function (resolve) {
    const url = IpServidor + "/stkitemsleedescabrrub/?StkRubroAbr=" +
      StkRubroAbr;

    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const items = JSON.parse(res.text);
        resolve(items);
      });
  });
}

import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleetbr = () => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkrubroleerTBR/";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubrotbr = JSON.parse(res.text);
        resolve(stkrubrotbr);
      });
  });
};

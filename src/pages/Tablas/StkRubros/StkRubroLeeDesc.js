import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleedesc = codgrupo => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkrubroleerdesc/" + codgrupo;;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubrodesc = JSON.parse(res.text);
        resolve(stkrubrodesc);
      });
  });
};

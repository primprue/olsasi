import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleecodgrupo = idStkGrupo => {
  return new Promise(resolve => {
    if (idStkGrupo !== '') {
      const url = IpServidor + "/stkrubroleecodgrupo/" + idStkGrupo;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then(res => {
          const stkrubro = JSON.parse(res.text);
          resolve(stkrubro);
        });
    }
  });
};

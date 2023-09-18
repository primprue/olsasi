import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo


export const stkrubroleecodgrupored = idStkGrupo => {
  return new Promise(resolve => {
    if (idStkGrupo !== 0) {
      const url = IpServidor + "/stkrubroleecodgrupored/" + idStkGrupo;
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


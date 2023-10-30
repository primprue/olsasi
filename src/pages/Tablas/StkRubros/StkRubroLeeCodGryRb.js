import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const stkrubroleecodgryrb = (idStkGrupo, idStkRubro) => {
  return new Promise((resolve) => {
    if (idStkGrupo !== "" && idStkRubro !== "") {
      const url =
        IpServidor +
        "/stkrubroleecodgryrb/?idStkRubro=" +
        idStkRubro +
        "&idStkGrupo=" +
        idStkGrupo;
      request
        .get(url)
        .set("Content-Type", "application/json")
        .then((res) => {
          const stkrubroele = JSON.parse(res.text);
          resolve(stkrubroele);
        });
    }
  });
};

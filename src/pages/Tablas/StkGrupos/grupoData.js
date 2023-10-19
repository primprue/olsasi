import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function grupoData() {
  return new Promise(function (resolve) {
    const url = IpServidor + "/stkgrupoleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const grupos = JSON.parse(res.text);

        resolve(grupos);
        //.catch() //Todo: agregar el catch error.
      });
  });
}

import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leeStkItemsDetalles() {
  console.log('está en leeStkItemsDetalles ')
  return new Promise(function (resolve) {
    const url = IpServidor + "/stkitemsleedetalles";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const items = JSON.parse(res.text);
        resolve(items);
      });
  });
}

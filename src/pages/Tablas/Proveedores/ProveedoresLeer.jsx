import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function leerproveedores() {
  return new Promise(function (resolve) {
    const url = IpServidor + "/proveedoresleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const proveedores = JSON.parse(res.text);
        resolve(proveedores);
      });
  });
}

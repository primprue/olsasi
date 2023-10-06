import IpServidor from '../VariablesDeEntorno'
import request from "superagent";

export function clientestraeNuevos() {
  console.log('vino a clientes nuevos')
  return new Promise(function (resolve) {
    const url = IpServidor + "/clientestraenuevos";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const clientes = JSON.parse(res.text);
        resolve(clientes);
      });

  });
}

import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";

import CodigoError from "../../../lib/CodigoError";


export function ClientesPresupAgregar(props) {
  return new Promise(function () {
    const {
      ClientesPresupDesc,
      ClientesPresupTel,
      ClientesPresupMail,

    } = props;
    const url = IpServidor + "/clientespresupagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cliendesc: ClientesPresupDesc })
      .send({ clientelefono: ClientesPresupTel })
      .send({ clienmail: ClientesPresupMail })

      .set("X-API-Key", "foobar")
      .then(function () { })
      .catch((err) => CodigoError(err),
    );


  });
}

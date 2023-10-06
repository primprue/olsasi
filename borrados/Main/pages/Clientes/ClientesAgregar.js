import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";

import CodigoError from "../../../lib/CodigoError";


export function ClientesAgregar(props) {
  return new Promise(function () {
    const {
      ClientesDesc,
      ClientesCalle,
      ClientesNroCalle,
      ClientesPiso,
      ClientesDto,
      ClientesCodPos,
      ClientesLoc,
      ClientesPcia,
      ClientesTel,
      ClientesMail,
      ClientesIVA,
      ClientesCUIT,
      ClientesTipo,
    } = props;
    const url = IpServidor + "/clientesagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cliendesc: ClientesDesc })
      .send({ cliencalle: ClientesCalle })
      .send({ cliennrocalle: ClientesNroCalle })
      .send({ clienpiso: ClientesPiso })
      .send({ cliendto: ClientesDto })
      .send({ cliencodpostal: ClientesCodPos })
      .send({ clienlocalidad: ClientesLoc })
      .send({ clienprovincia: ClientesPcia })
      .send({ clientelefono: ClientesTel })
      .send({ clienmail: ClientesMail })
      .send({ clieniva: ClientesIVA })
      .send({ cliencuit: ClientesCUIT })
      .send({ clientipo: ClientesTipo })

      .set("X-API-Key", "foobar")
      .then(function () { })
      .catch((err) => CodigoError(err),
    );


  });
}

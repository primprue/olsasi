import CodigoError from "../../../lib/CodigoError";
import IpServidor from "../VariablesDeEntorno";
import request from "superagent";
import "react-table/react-table.css";

export function StkMonedasAgregar(props) {
  return new Promise(function () {
    const { idStkMonedas,
      StkMonedasDescripcion,
      StkMonedasCotizacion
    } = props;
    const url = IpServidor + "/stkmonedasagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ idStkMonedas: idStkMonedas })
      .send({ StkMonedasDescripcion: StkMonedasDescripcion })
      .send({ StkMonedasCotizacion: StkMonedasCotizacion })
      .set("X-API-Key", "foobar")
      .then(function () { })
      .catch((err) => CodigoError(err));
  });
}

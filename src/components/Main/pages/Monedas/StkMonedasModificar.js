import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import CodigoError from "../../../lib/CodigoError";
import "react-table/react-table.css";

export function StkMonedasModificar(props) {
  const { idStkMonedas,
    StkMonedasDescripcion,
    StkMonedasCotizacion
  } = props;
  const url = IpServidor + "/stkmonedasmodificar/" + idStkMonedas;
  request
    .post(url)
    .set("Content-Type", "application/json")
    .send({ StkMonedasDescripcion: StkMonedasDescripcion })
    .send({ StkMonedasCotizacion: StkMonedasCotizacion })
    .set("X-API-Key", "foobar")
    .then(function () {
    })
    .catch((err) => CodigoError(err));
}

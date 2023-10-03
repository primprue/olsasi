import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";


export function ClientesBorrar(props) {
  const { idClientes } = props;
  const url = IpServidor + "/clientesborrar/?id=" + idClientes;
  request
    .delete(url)
    .set("Content-Type", "application/json")
    .then(function (res) {
      MuestraMensaje(res);
    })
    .catch((err) => MuestraMensaje(err));
}

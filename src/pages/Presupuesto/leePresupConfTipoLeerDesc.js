import IpServidor from "../VariablesDeEntorno";
import request from "superagent";

export default function leePresupConfTipoLeerDesc(props) {
  const descripcion = props;
  return new Promise((resolve) => {
    const url = IpServidor + "/presupconftipoleerdesc/?descripcion=" + descripcion;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const datosconf = JSON.parse(res.text);
        resolve(datosconf);
      });
  });
}

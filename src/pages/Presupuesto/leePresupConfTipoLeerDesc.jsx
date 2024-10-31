import IpServidor from "../VariablesDeEntorno";
import request from "superagent";

export default function leePresupConfTipoLeerDesc(props) {
  console.log('leePresupConfTipoLeerDesc props', props)
  const descripcion = props;
  return new Promise((resolve) => {
    const url = IpServidor + "/presupconftipoleerdesc/?descripcion=" + descripcion;
    console.log('url leePresupConfTipoLeerDesc', url)
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then((res) => {
        const datosconf = JSON.parse(res.text);
        resolve(datosconf);
      });
  });
}

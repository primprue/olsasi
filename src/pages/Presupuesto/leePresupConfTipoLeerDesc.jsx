import IpServidor from "../VariablesDeEntorno";
import request from "superagent";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export async function leePresupConfTipoLeerDesc(props) {
  const descripcion = props;
  const url = `${IpServidor}/presupconftipoleerdesc/?descripcion=${descripcion}`;
  try {
    const res = await request
      .get(url)
      .set("Content-Type", "application/json")
      .set("X-API-Key", "foobar")
    // Superagent coloca el JSON parseado en res.body automáticamente
    const resultadolectura = res.body || JSON.parse(res.text);
    return resultadolectura;
  } catch (err) {
    MuestraMensaje(err);
    throw err; // Es importante lanzar el error para que el llamador lo detecte
  }

}

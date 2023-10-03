import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
// import "react-table/react-table.css";
import MuestraMensaje from "../../../../lib/MuestraMensaje";
import "react-toastify/dist/ReactToastify.css";
export function stkProveedoresAgregar(props) {

  return new Promise(function () {
    const {
      ProveedoresDesc,
      ProveedoresTipo,
      ProveedoresCUIT,
      ProveedoresCalle,
      ProveedoresNroCalle,
      ProveedoresPiso,
      ProveedoresDto,
      ProveedoresCodPos,
      ProveedoresLoc,
      ProveedoresPcia,
      ProveedoresTel,
      ProveedoresContacto,
      ProveedoresMail,
      ProveedoresWeb,
      ProveedoresCodMon,
    } = props;
    const url = IpServidor + "/proveedoresagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ provdesc: ProveedoresDesc })
      .send({ provtipo: ProveedoresTipo })
      .send({ provcuit: ProveedoresCUIT })
      .send({ provcalle: ProveedoresCalle })
      .send({ provnrocalle: ProveedoresNroCalle })
      .send({ provpiso: ProveedoresPiso })
      .send({ provdto: ProveedoresDto })
      .send({ provcodpostal: ProveedoresCodPos })
      .send({ provlocalidad: ProveedoresLoc })
      .send({ provprovincia: ProveedoresPcia })
      .send({ provtelefono: ProveedoresTel })
      .send({ provcontacto: ProveedoresContacto })
      .send({ provmail: ProveedoresMail })
      .send({ provpagweb: ProveedoresWeb })
      .send({ provcodmon: ProveedoresCodMon })
      .then(function (res) {
        MuestraMensaje(res)
        // res.body, res.headers, res.status
      })
      .catch((err) => MuestraMensaje(err));

  });
}

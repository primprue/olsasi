import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";

import CodigoError from "../../../../lib/CodigoError";

export function presupDetPieAgregar(props) {

    const {
        PresupDetPieLeyenda,
    } = props;

    const url = IpServidor + "/presupdetpieagregar";
    request
        .post(url)
        .set("Content-Type", "application/json")
        .send({ PresupDetPieLeyenda: PresupDetPieLeyenda })
        // .send({ PresupDetPieSelec: PresupDetPieSelec })
        .set("X-API-Key", "foobar")
        // .then(function (res) {
        //     const respuesta = JSON.parse(res.text);
        //     if (respuesta.affectedRows !== 0) alert("EXITO");
        //     else alert("No modifico");
        // })
        .catch((err) => CodigoError(err));
}

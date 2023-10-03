import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";

import CodigoError from "../../../../lib/CodigoError";

export function presupDetPieBorrar(props) {
    const { idPresupDetPie } = props;
    const url = IpServidor + "/presupdetpieborrar/" + idPresupDetPie;
    request
        .delete(url)
        .set("Content-Type", "application/json")
        .then(function () { })
        .catch((err) => CodigoError(err));
}

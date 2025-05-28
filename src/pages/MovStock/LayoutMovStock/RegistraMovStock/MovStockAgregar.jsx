import request from "superagent";
import IpServidor from "../../../VariablesDeEntorno.js";
import MuestraMensaje from "../../../../components/lib/MuestraMensaje.js";
export const MovStockAgregar = (movareg) => {
    return new Promise(function (resolve) {

        const url1 = IpServidor + "/movstockagregar";
        request
            .post(url1)
            .set("Content-Type", "application/json")
            .send({ movareg: movareg })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                MuestraMensaje(err);
            });
    });
};

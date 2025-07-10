import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

import request from "superagent";

export const ProveedoresValueLeer = (_) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const url = IpServidor + "/proveedoresvalueleer";
            request
                .get(url)
                .set("Content-Type", "application/json")
                .then((res) => {
                    const proveedores = JSON.parse(res.text);
                    resolve(proveedores);
                })
                .catch((err) => MuestraMensaje(err));
        }, 300);
    });
};

import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export const CajaInternaLeer = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const url = IpServidor + "/cajainternaleer";

            request
                .get(url)
                .then((res) => {
                    const cajainternaleer = JSON.parse(res.text);
                    resolve(cajainternaleer);
                })
                .catch((err) => MuestraMensaje(err));

        }, 300); // ← ahora sí está dentro del setTimeout
    });
};

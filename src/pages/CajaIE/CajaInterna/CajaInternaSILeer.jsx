import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

export const CajaInternaSILeer = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const url = IpServidor + "/cajainternasileer";

            request
                .get(url)
                .then((res) => {
                    const cajainternasileer = JSON.parse(res.text);
                    resolve(cajainternasileer);
                })
                .catch((err) => MuestraMensaje(err));

        }, 300); // ← ahora sí está dentro del setTimeout
    });
};

import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";
// Lee Rubro por codigo de gupo

export const CajaIELeer = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/cajaieleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajaieleer = JSON.parse(res.text);
                resolve(cajaieleer);
            })
            .catch((err) => MuestraMensaje(err));
    });
};
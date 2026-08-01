import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export const MedCliConvertidor = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/medcliconvertidor/";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const resultado = JSON.parse(res.text);
                console.log('resultado', resultado);
                resolve(resultado);
            })
            .catch((err) => MuestraMensaje(err));
    });
};

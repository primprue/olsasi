import request from "superagent";
import IpServidor from "../../pages/VariablesDeEntorno";
import MuestraMensaje from "./MuestraMensaje";
// Lee Rubro por codigo de gupo


export default function VerificaClave(props) {
    const { usuario, Clave } = props;
    return new Promise((resolve) => {
        setTimeout(() => {
            const url = IpServidor + "/verificaclave?usuario=" + usuario + "&password=" + Clave;
            request
                .get(url)
                .set("Content-Type", "application/json")
                .then((res) => {
                    const verificaclave = JSON.parse(res.text);

                    resolve(verificaclave);
                })
                .catch((err) => {
                    MuestraMensaje(err);
                });
        }, 300);
    })
};
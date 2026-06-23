import request from "superagent";
import IpServidor from "../VariablesDeEntorno.js";


export const copiafact = () => {

    return new Promise(resolve => {
        const url = IpServidor + "/copiafact";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then(res => {
                // EXPLICACIÓN: res.body contiene el JSON { status: "success", message: "..." }
                resolve(res.body);
            })
            .catch(err => {
                // Es vital capturar el error si el backend responde con un código 500 o falla la red
                // console.error("Error en la petición de backup:", err);
                // Si el backend envió un JSON de error, está en err.response.body
                if (err.response && err.response.body) {
                    resolve(err.response.body);
                } else {
                    resolve({ status: "error", message: "Error de conexión con el servidor backend." });
                }
            });
    });
}

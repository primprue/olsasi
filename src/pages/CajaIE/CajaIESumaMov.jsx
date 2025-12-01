import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";

export const CajaIESumaMov = () => {

    // fecha.setDate(fecha.getDate() - 1);
    return new Promise((resolve) => {
        const url = IpServidor + "/cajaiesumamov";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const cajaiesumam = JSON.parse(res.text);
                resolve(cajaiesumam);
            })
            .catch((err) => MuestraMensaje(err));
    });
};


// export const CajaIESumaMov = () => {
//     // const fecha = fechaSeleccionada || '2025-11-05'; // o la que elija el usuario
//     // const url = IpServidor + "/cajaiesumamov/?fecha=" + fecha;
//     const url = IpServidor + "/cajaiesumamov";
//     return new Promise((resolve) => {
//         request
//             .get(url)
//             .set("Content-Type", "application/json")
//             .then((res) => {
//                 const cajaiesumam = JSON.parse(res.text);
//                 resolve(cajaiesumam);
//             })
//             .catch((err) => MuestraMensaje(err));
//     });
// };

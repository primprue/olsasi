import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";

// export const CajaInternaSumTot = (fechadesde, fechahasta) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const url = `${IpServidor}/cajainternasumtot/?fechad=${encodeURIComponent(fechadesde)}&fechah=${encodeURIComponent(fechahasta)}`;
//             // const url = IpServidor + "/cajainternasumtot/?fechad=" + fechadesde + "&fechah=" + fechahasta;
//             console.log('ur  ', url)
//             request
//                 .get(url)
//                 .set("Content-Type", "application/json")
//                 .then((res) => {
//                     const cajainternasumtot = JSON.parse(res.text);
//                     resolve(cajainternasumtot);
//                 })
//                 .catch((err) => MuestraMensaje(err));

//         }, 300); // ← ahora sí está dentro del setTimeout
//     });
// };

export const CajaInternaSumTot = (fechadesde, fechahasta) => {
    return new Promise((resolve, reject) => {
        const url = `${IpServidor}/cajainternasumatot/`;
        request
            .get(url)
            .query({ fechad: fechadesde, fechah: fechahasta }) // Superagent escapa los parámetros por ti
            .set("Accept", "application/json")
            .then((res) => {
                // res.body suele ser ya el JSON parseado en superagent
                resolve(res.body || JSON.parse(res.text));
            })
            .catch((err) => {
                MuestraMensaje(err.message);
                reject(err);
            });
    });
};
import MuestraMensaje from "./lib/MuestraMensaje";
import IpServidor from "../pages/VariablesDeEntorno";
import swal from "sweetalert";
import request from "superagent";
export async function ActividadesEsp(props, ejecutorbackend) {

    const url = `${IpServidor}/${ejecutorbackend}/`;
    try {
        const res = await request
            .post(url)
            .set("Content-Type", "application/json")
            .send(props); // Enviamos todo el objeto de una vez

        MuestraMensaje(res);

        return res.statusCode; // Esto resuelve la promesa
    } catch (err) {
        MuestraMensaje(err);
        throw err; // Es importante lanzar el error para que el llamador lo detecte
    }
    // swal({
    //     title: "Aguarde",
    //     text: "Generando reporte",
    //     icon: "info",
    //     toast: true,
    //     position: "top-end", // Lo ubica como una notificación en la esquina
    //     showConfirmButton: false, // Quita el botón OK definitivamente
    //     allowOutsideClick: false,
    //     timer: 3000,
    //     timerProgressBar: true, // Una barrita visual que muestra el progreso del tiempo
    //     background: "#d4edda", // Color verde claro sólido (puedes usar el hex que quieras)
    //     color: "#155724" // Color del texto oscuro para que contraste bien y sea legible
    // });
    // try {
    //     const res = await request
    //         .get(url)
    //         .set("X-API-Key", "foobar");

    //     // Superagent pone el JSON en res.body automáticamente
    //     const datos = res.body;

    //     if (datos.success) {
    //         // Construimos la URL hacia la carpeta pública donde se guardó
    //         const urlPdf = `/archivos-pdf/${datos.archivo}`;

    //         // Abrimos el PDF en una pestaña nueva
    //         window.open(urlPdf, '_blank');
    //         return datos;
    //     }
    // } catch (err) {
    //     MuestraMensaje("Error al generar reporte: " + err.message);
    //     throw err;
    // }

}

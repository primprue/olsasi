import request from 'superagent'
import swal from "sweetalert";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from '../../components/lib/MuestraMensaje';

export async function PBListaPrebalance(fechaActual, impVentas, ejecutorbackend) {
    // 1. Generar la URL
    const url = `${IpServidor}/${ejecutorbackend}/?fechaActual=${fechaActual}&&impVentas=${impVentas}`;
    swal({
        title: "Aguarde",
        text: "Generando Pre-Balance",
        icon: "info",
        toast: true,
        position: "top-end", // Lo ubica como una notificación en la esquina
        showConfirmButton: false, // Quita el botón OK definitivamente
        allowOutsideClick: false,
        timer: 3000,
        timerProgressBar: true, // Una barrita visual que muestra el progreso del tiempo
        background: "#d4edda", // Color verde claro sólido (puedes usar el hex que quieras)
        color: "#155724" // Color del texto oscuro para que contraste bien y sea legible
    });


    try {
        const res = await request
            .get(url)
            .set("X-API-Key", "foobar");

        // Superagent pone el JSON en res.body automáticamente
        const datos = res.body;
        if (datos.success) {
            // Construimos la URL hacia la carpeta pública donde se guardó
            const urlPdf = `/archivos-pdf/${datos.archivo}`;

            // Abrimos el PDF en una pestaña nueva
            window.open(urlPdf, '_blank');

            return datos;
        }
    } catch (err) {
        MuestraMensaje("Error al generar reporte: " + err.message);
        throw err;
    }
};



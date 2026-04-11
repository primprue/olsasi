// export const EnvioWa = () => {
//     const telefono = "542914229059";
//     const mensaje = "Hola, esto es un mensaje de prueba";

//     // Formato: whatsapp://send?phone=NUMERO&text=TEXTO
//     window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');

// };
// //   return (
// //     <div>EnvioWa</div>
// //   )


import MuestraMensaje from "../../components/lib/MuestraMensaje";
import IpServidor from "../../pages/VariablesDeEntorno";

import request from "superagent";
export async function EnvioWa() {
    const url = `${IpServidor}/enviowa`;
    try {
        const response = await request
            .get(url)
            .set("Content-Type", "application/json")
            .set("X-API-Key", "foobar")
        const data = await response.json();

        if (data.qr === "CONNECTED") {
            setStatus("¡Conectado con éxito!");
            setQrImage("");
            clearInterval(interval); // Dejamos de pedir el QR
        } else if (data.qr) {
            setQrImage(data.qr);
            setStatus("Escanea el código con tu WhatsApp");
        }
    } catch (err) {
        MuestraMensaje(err);
        throw err; // Es importante lanzar el error para que el llamador lo detecte
    }

}


// import React, { useState, useEffect } from 'react';

// function WhatsAppLogin() {
//     const [qrImage, setQrImage] = useState("");
//     const [status, setStatus] = useState("Cargando...");

//     useEffect(() => {
//         // Función para revisar si hay un QR nuevo cada 5 segundos
//         const interval = setInterval(async () => {
//             const response = await fetch('http://localhost:3000/get-qr');
//             const data = await response.json();

//             if (data.qr === "CONNECTED") {
//                 setStatus("¡Conectado con éxito!");
//                 setQrImage("");
//                 clearInterval(interval); // Dejamos de pedir el QR
//             } else if (data.qr) {
//                 setQrImage(data.qr);
//                 setStatus("Escanea el código con tu WhatsApp");
//             }
//         }, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//             <h2>Conectar WhatsApp</h2>
//             <p>{status}</p>
//             {qrImage && (
//                 <img src={qrImage} alt="QR Code" style={{ border: '1px solid #ccc' }} />
//             )}
//         </div>
//     );
// }

// export default WhatsAppLogin;
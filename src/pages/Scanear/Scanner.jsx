import React, { useState } from 'react';
import IpServidor from "../VariablesDeEntorno";
import { columnsStateInitializer } from '@mui/x-data-grid/internals';
const SERVIDOR_URL = import.meta.env.VITE_API_URL_MEDIDAS;
// export default function Scanner({ datos, onSave }) {
export default function Scanner({ onSave }) {
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');


    // NUEVO ESTADO: Para saber si ya tenemos una previsualización lista
    const [esPreview, setEsPreview] = useState(false);
    const datos = ""
    // Tu función adaptada para pedir la PREVISUALIZACIÓN
    function manejarEscaneoPreview() {
        setCargando(true);
        setError('');
        setImagenUrl('');
        setEsPreview(false);

        const xhr = new XMLHttpRequest();
        // Tip: Podrías pasarle un parámetro al backend como &preview=true para que sepa qué hacer
        // xhr.open('GET', `${IpServidor}/scans/?datos=${JSON.stringify(datos)}`);
        xhr.open('GET', `${IpServidor}/scans/?datos=${SERVIDOR_URL}`);
        //  xhr.open('GET', `${IpServidor}/scans/ll&preview=true`);

        xhr.onload = function () {
            setCargando(false);
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    // El backend te devuelve la URL temporal o el Base64 de la imagen
                    setImagenUrl(data.urlPantalla);
                    setEsPreview(true); // ¡Ya tenemos preview!
                } catch (e) {
                    setError('Error al procesar la respuesta del servidor.');
                }
            } else {
                try {
                    const errorData = JSON.parse(xhr.responseText);
                    setError(errorData.detalle || errorData.error || 'Error en el servidor');
                } catch {
                    setError('Hubo un problema con el escáner (Código ' + xhr.status + ').');
                }
            }
        };

        xhr.onerror = function () {
            setCargando(false);
            setError('No se pudo conectar con el servidor de escaneo.');
        };

        xhr.send();
    }

    // NUEVA FUNCIÓN: Se ejecuta cuando el usuario acepta el preview
    function confirmarYGuardar() {

        // Le avisamos al componente padre que el usuario aceptó.
        // Pasamos la url o los datos que el padre necesite para impactar la BD.

        onSave({

            // ...datos,
            imagenUrl: imagenUrl
        });
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
            {/* <div className="scanner-box"> */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {cargando && <p>Escanenado... por favor espere...</p>}
            {/* Renderizado de la imagen escaneada */}
            {imagenUrl && (
                <img
                    /* Le sumamos ?t=NumeroAleatorio para romper la caché del navegador */
                    src={`${SERVIDOR_URL}/${imagenUrl}?t=${new Date().getTime()}`}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '400px' }}
                />
            )}

            <div className="acciones">
                {/* Botón principal para escanear/re-escanear */}
                <button onClick={manejarEscaneoPreview} disabled={cargando}>
                    {imagenUrl ? 'Escanear de nuevo' : 'Iniciar Escaneo'}
                </button>

                {/* Este botón SÓLO aparece si ya hay una imagen en pantalla */}
                {esPreview && !cargando && (
                    <button onClick={confirmarYGuardar} style={{ backgroundColor: 'green', color: 'white' }}>
                        ✔ Confirmar y Guardar en BD
                    </button>
                )}
            </div>
        </div>
    );
};




// import React, { useState } from 'react';
// import TextFieldComun from '../../components/comppropios/TextFieldComun';
// import CustomSwitch from '../../components/comppropios/CustomSwitch';
// import IpServidor from "../VariablesDeEntorno";
// import { Button } from '@mui/material';

// export default function Scanner({ datos, onSave }) {
//     const [imagenUrl, setImagenUrl] = useState('');
//     const [cargando, setCargando] = useState(false);
//     const [error, setError] = useState('');
//     const [datosscaneo, setDatosscaneo] = useState([]);



//     function manejarEscaneo() {
//         // Iniciamos la carga y limpiamos errores o imágenes previas
//         setCargando(true);
//         setError('');
//         setImagenUrl('');

//         const xhr = new XMLHttpRequest();
//         xhr.open('GET', `${IpServidor}/scans/?datos=${JSON.stringify(datos)}`);
//         xhr.onload = function () {
//             // Finaliza la carga de la petición
//             setCargando(false);
//             if (xhr.status >= 200 && xhr.status < 300) {
//                 try {
//                     const data = JSON.parse(xhr.responseText);
//                     // Actualizamos el estado con la URL que manda el backend
//                     setImagenUrl(data.urlPantalla);
//                 } catch (e) {
//                     setError('Error al procesar la respuesta del servidor.');
//                 }
//             } else {
//                 // Manejo de errores que vienen del backend (Ej: No se detectó escáner)
//                 try {
//                     const errorData = JSON.parse(xhr.responseText);
//                     setError(errorData.detalle || errorData.error || 'Error en el servidor');
//                 } catch {
//                     setError('Hubo un problema con el escáner (Código ' + xhr.status + ').');
//                 }
//             }
//         };

//         xhr.onerror = function () {
//             setCargando(false);
//             setError('No se pudo conectar con el servidor de escaneo. ¿Está el backend encendido?');
//         };

//         xhr.send();
//     }
//     const handleBotonClick = () => {
//         // Si necesitas enviarle datos nuevos al padre (ej. la ruta de la imagen creada)


//         // Ejecutamos la función del padre pasándole los datos
//         onSave(imagenUrl);
//     };
//     return (
//         <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
//             <h2>Escanear Documento (Brother)</h2>

//             <button
//                 onClick={manejarEscaneo}
//                 disabled={cargando}
//                 style={{
//                     padding: '10px 20px',
//                     fontSize: '16px',
//                     backgroundColor: cargando ? '#ccc' : '#007bff',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '4px',
//                     cursor: cargando ? 'not-allowed' : 'pointer'
//                 }}
//             >
//                 {cargando ? 'Escaneando... Por favor espere' : 'Iniciar Escaneo'}
//             </button>

//             {error && (
//                 <p style={{ color: 'red', marginTop: '15px' }}>
//                     <strong>Error:</strong> {error}
//                 </p>
//             )}

//             {imagenUrl && (
//                 <div style={{ marginTop: '20px' }}>
//                     <h3>Vista previa del documento:</h3>
//                     <img
//                         src={imagenUrl}
//                         alt="Documento escaneado"
//                         style={{
//                             maxWidth: '100%',
//                             maxHeight: '600px',
//                             border: '1px solid #ddd',
//                             boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
//                         }}
//                     />
//                 </div>
//             )}
//             <Button onClick={handleBotonClick}>
//                 Confirmar y Guardar en BD
//             </Button>
//         </div>
//     );
// }

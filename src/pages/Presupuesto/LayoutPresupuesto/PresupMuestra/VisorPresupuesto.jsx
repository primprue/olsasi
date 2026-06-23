import { Button, Dialog, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import request from 'superagent'; // Asumiendo que usas superagent
import BCierraDialogo from "../../../../Styles/Boton.module.css";
import CloseIcon from "@mui/icons-material/Close";
const REACT_APP_API_URL = import.meta.env.VITE_API_URL;
const PORT = import.meta.env.VITE_PORT || 8080;

const VisorPresupuesto = ({ open, datos, alCerrar }) => {
    const [urlFinal, setUrlFinal] = useState('');
    const [error, setError] = useState(false);
    useEffect(() => {
        if (datos) {
            const datosreales = datos.rowsel
            // 1. Armamos el nombre igual que como lo grabás en el disco
            // Ejemplo: "123_Sandra_Bahia_Blanca"

            let Cliente = datosreales.NombreCliente.trimEnd();
            let fecha = datosreales.PresupEncabFecha
            //sacar el espacio en blanco al final antes de la extension desde terminal
            //for f in *\ .*; do mv "$f" "${f%\ .*}.${f##*.}"; done 
            const nombrepresupue = `Presupuesto nro ${datosreales.id} ${Cliente} ${fecha}.pdf`;

            const nombrepresupueconvertido = encodeURIComponent(nombrepresupue);
            // const host = window.location.hostname;
            // const servidorBase = import.meta.env.VITE_API_URL.replace('/api', '');


            request
                .get(`${import.meta.env.VITE_API_URL}/preparar-vista-previa/${nombrepresupueconvertido}`)
                .end((err, res) => {
                    if (!err && res.body.urlFinal) {

                        // const servidorBase = import.meta.env.VITE_FRONT
                        const servidorBase = import.meta.env.VITE_FRONT.replace(/['"]+/g, '').trim();
                        // 2. Quitamos cualquier "/" que traiga urlFinal al principio para evitar el "//"
                        const rutaLimpia = res.body.urlFinal.startsWith('/')
                            ? res.body.urlFinal.substring(1)
                            : res.body.urlFinal;

                        // 3. Armamos la URL final uniendo todo con una sola barra
                        // Solo agregamos UN timestamp aquí
                        const urlParaIframe = `${servidorBase}/${rutaLimpia}`;
                        setUrlFinal(urlParaIframe);
                    }
                });
        }
    }, [datos]); // Se ejecuta cada vez que 'datos' cambie
    return (

        <div>
            <Dialog fullScreen open={open} onClose={alCerrar}>
                <DialogTitle>

                    <Button
                        className={BCierraDialogo.botoncierradialogo}
                        variant="contained"
                        startIcon={<CloseIcon />}
                        onClick={alCerrar}
                    >
                        Cerrar
                    </Button>
                </DialogTitle>

                <div className="cuerpo-modal" style={{ height: '80vh' }}>
                    {error ? (
                        <p>No se encontró el archivo físico en el servidor.</p>
                    ) : urlFinal ? (
                        <iframe
                            src={urlFinal}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            // Esto evita que el iframe intente navegar en el historial de tu app principal
                            // sandbox="allow-scripts allow-same-origin allow-forms"
                            // Esto asegura que no haya problemas de envío de cabeceras de origen
                            // referrerPolicy="no-referrer"
                            // Forzamos a que no use el sistema de rutas
                            loading="lazy"
                        />
                    ) : (
                        <p>Preparando documento...</p>
                    )}
                </div>
            </Dialog>
        </div>
    );
};
export default VisorPresupuesto;
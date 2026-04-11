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
            const host = window.location.hostname;
            // 2. Llamada al servidor (Backend puerto 8080)
            request
                // .get(`http://${host}:3001/api/preparar-vista-previa/${nombrepresupueconvertido}`)
                .get(`${REACT_APP_API_URL}/preparar-vista-previa/${nombrepresupueconvertido}`)
                .end((err, res) => {
                    if (err) {
                        console.error("Error al preparar preview", err);
                        setError(true);
                    } else {
                        // 3. El server nos devuelve la ruta con el timestamp (?t=...)
                        // La pegamos a la URL del backend
                        setUrlFinal(`http://${host}:${PORT}/${res.body.urlFinal}`);
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
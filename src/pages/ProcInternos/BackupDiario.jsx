import React, { useEffect } from "react";
import { copiafact } from "./CopiaFact";
import swal from 'sweetalert';
import { Dialog } from "@mui/material";

export default function BackupDiario(props) {
    // 1. Recibimos las props correctas que envía el padre
    const { open, handleClose } = props;

    const fechaComoCadena = Date();
    const numeroDia = new Date(fechaComoCadena).getDay();
    const diasemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];
    const hoyes = diasemana[numeroDia];

    async function copiafacturacion() {
        const result = await copiafact();
        if (result && result.status === 'success') {
            await swal({
                title: "Backup Realizado!",
                text: "Retirar el PenDrive de forma segura",
                icon: "success",
                button: "OK!",
            });
            handleClose(); // Cierra el modal/diálogo
        } else {
            // Si el backend respondió pero con error
            await swal({
                title: "Backup NO Realizado!",
                text: result.message || "Atención, ocurrió un problema inesperado.",
                icon: "error",
                button: "OK!",
            });
            handleClose();
        }

    }

    const inicio = () => {
        swal({
            title: "BACKUP DIARIO",
            text: "Hoy es " + hoyes,
            icon: "info",
            dangerMode: true,
            buttons: ["No", "SI"],
        })
            .then(respuesta => {
                if (respuesta) {
                    copiafacturacion();
                } else {
                    handleClose(); // 3. Si dice que NO, cerramos inmediatamente
                }
            });
    };

    // 4. CORRECCIÓN DEL USEEFFECT: Array de dependencias vacío [] bien cerrado
    useEffect(() => {
        inicio();
    }, []);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                {/* Nota: Tu Dialog actualmente está vacío, 
                    si quieres mostrar algo dentro de él además de SweetAlert, 
                    deberías poner aquí los DialogTitle y DialogContent */}
            </Dialog>
        </>
    );
}

{/* {finsn === true && <HaceBackup></HaceBackup>} */ }
{/* <Button className="btn btn-danger" onClick={inicio}>
                Alerta
            </Button> */}

{/* <Button className="btn btn-danger" onClick={handleClickOpen}>
                Alerta
            </Button> */}
{/*ventana emergente de borrado*/ }
{/*     <DialogTitle id="responsive-dialog-title">
                    {"Titulo de alerta"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Soy el mensaje de la alerta</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={inicio} className="btn btn-success">
                        Aceptar
                    </Button>
                    <Button onClick={handleClose} className="btn btn-danger">
                        Cancelar
                    </Button>
                </DialogActions>*/}

// }
// const [open, setOpen] = useState(true);

// const handleClickOpen = () => {
//     setOpen(
//         true
//     );
// };
// const handleClose = () => {
//     setOpen(false);
// };

// const alertaNormal = () => {
//     alert("alerta normal");
// };
import React, { useEffect } from "react";
import { copiafact } from "./CopiaFact";

import swal from 'sweetalert';


export default function BackupDiario() {
    // const [finsn, setFinsn] = useState(true);
    // const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        inicio()


    });


    const fechaComoCadena = Date()
    const numeroDia = new Date(fechaComoCadena).getDay();
    const diasemana = ['DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']
    const hoyes = diasemana[numeroDia]
    async function copiafacturacion() {
        const result = await copiafact();
        if (result === '""') {
            swal({
                title: "Backup Realizado!",
                text: "Retirar el PenDrive",
                icon: "success",
                button: "OK!",
            })
            // setOpen(false)
        }
        else {
            swal({
                title: "Backup NO Realizado!",
                text: "Atención NO SE HIZO EL BACKUP ",
                text1: result,
                icon: "error",
                button: "OK!",
            })

        }

    }
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

    const inicio = () => {
        swal({
            title: "BACKUP DIARIO",
            text: "Hoy es " + hoyes,
            icon: "info",
            dangerMode: true,
            buttons: ["No", "SI"],  //el true es el de la derecha
        })
            .then(respuesta => {
                if (respuesta) {
                    console.log('esta en el si  ')
                    copiafacturacion()
                    // swal("Poof! Your imaginary file has been deleted!", {
                    //     icon: "success",
                    // });
                }
            })
    }

    return (

        <React.Fragment>
            {/* {finsn === true && <HaceBackup></HaceBackup>} */}
            {/* <Button className="btn btn-danger" onClick={inicio}>
                Alerta
            </Button> */}

            {/* <Button className="btn btn-danger" onClick={handleClickOpen}>
                Alerta
            </Button> */}
            {/*ventana emergente de borrado*/}
            {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
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
                </DialogActions>
            </Dialog> */}

        </React.Fragment>
    );
}


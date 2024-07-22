import React, { useState, useEffect } from "react";
import { copiafact } from "./CopiaFact";
import Grid from "@material-ui/core/Grid";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog, GridListTile, TextField } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogContentText } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import swal from 'sweetalert';
import Select from '@material-ui/core/Select';
import { MenuItem, FormControl, InputLabel } from "@material-ui/core";
import CodigoError from "../../../lib/CodigoError";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core";
import Estilos from './Estilos.module.css'

import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import {
    red,

} from "@material-ui/core/colors";
// import { GridOff, Title } from "@material-ui/icons";
export default function RecuperaDatos() {
    const [finsn, setFinsn] = useState(true);
    const [progress, setProgress] = React.useState(0);
    const [diaeleg, setDiaeleg] = React.useState('');

    const handleChange = (event) => {
        inicio(diasemana[event.target.value].label)
    };

    // useEffect(() => {
    //     inicio()
    //    if (finsn === true) {
    // const result = CopiaFact();
    // if (result === '""') {
    //     console.log('en if result ', result)
    //     setFinsn(true)
    // }

    // });

    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    //     }, 800);
    //     return () => {
    //         clearInterval(timer);
    //     }
    // }, []);
    // const fechaComoCadena = Date()
    // const numeroDia = new Date(fechaComoCadena).getDay();
    const diasemana = [
        {
            value: 0,
            label: 'LUNES'
        },
        {
            value: 1,
            label: 'MARTES'
        },
        {
            value: 2,
            label: 'MIERCOLES',
        },
        {
            value: 3,
            label: 'JUEVES',
        },
        {
            value: 4,
            label: 'VIERNES',
        },]


    // const hoyes = diasemana[numeroDia]
    async function copiafacturacion() {
        const result = await copiafact();
        console.log('result  ', result)
        if (result === '""') {
            swal({
                title: "Backup Realizado!",
                text: "Retirar el PenDrive",
                icon: "success",
                button: "OK!",
            })
            setOpen(false)
        }
        else {
            swal({
                title: "Backup NO Realizado!",
                text: "Atención NO SE HIZO EL BACKUP ",
                text: result,
                icon: "error",
                button: "OK!",
            })

        }

    }
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
        setOpen(
            true
        );
    };
    const handleClose = () => {
        setOpen(false);
    };

    const alertaNormal = () => {
        alert("alerta normal");
    };

    const inicio = (deldia) => {
        swal({
            title: "Recupera Datos Facturación",
            text: "Del Día : " + deldia,
            icon: "info",
            dangerMode: true,
            buttons: ["No", "SI"],  //el true es el de la derecha
        })
            .then(respuesta => {
                if (respuesta) {
                    copiafacturacion()
                    // swal("Poof! Your imaginary file has been deleted!", {
                    //     icon: "success",
                    // });
                }
            })
    }

    return (
        <FormControl className={Estilos.contenedor2} >
            <h3 className={Estilos.banner}>RECUPERACION DE INFORMACION!!!</h3>
            <TextField className={Estilos.selector}
                id="filled-select-currency"
                select
                label="Día de la Semana"
                value={diaeleg}
                onChange={handleChange}
                helperText="Elegir el día"
                variant="filled"
            >
                {diasemana.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </FormControl>

    );
}


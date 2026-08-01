
import React, { use } from 'react'
import { Button, Dialog, TextField } from '@mui/material'
import IpServidor from '../../VariablesDeEntorno'
import request from "superagent";
import MuestraMensaje from '../../../components/lib/MuestraMensaje';
import TextFieldComun from '../../../components/comppropios/TextFieldComun';

const datosnuevos = async (formData, nroid, opcioneleg) => {
    const newDatosSelect = {
        // OTDatosDesc: formData.get('OTDatosDesc'),
        DetaOpcion: formData.DetaOpcion,
        Vpdef: formData.Vpdef,
        nroid: nroid,
        opcion: opcioneleg
    }

    const url =
        opcioneleg === 'agrega' ? IpServidor + `/otdatosagregaselec` :
            IpServidor + `/otdatosborrarselec/?datos=${JSON.stringify(newDatosSelect)}`;

    return new Promise(function () {
        setTimeout(() => {
            if (newDatosSelect.opcion === 'agrega') {
                request
                    .post(url)
                    .set("Content-Type", "application/json")
                    .send({ newDatosSelect: newDatosSelect })
                    .set("X-API-Key", "foobar")
                    .then((res) => {
                        MuestraMensaje(res);
                    })
                    .catch((err) => {
                        MuestraMensaje(err);
                    });
            }
            else {
                request
                    .delete(url)
                    .set("Content-Type", "application/json")
                    .send({ newDatosSelect: newDatosSelect })
                    .then((res) => {
                        MuestraMensaje(res);
                    })
                    .catch((err) => {
                        MuestraMensaje(err);
                    });
            }
        }, 1000);
    });
}

export default function OTDatosAgrOpc(props) {
    const { open, handleClose, params, accion
    } = props;
    let opcioneleg = accion === 'agrega' ? '' :
        params.opcion;


    let nroid = params.idOTDatos;

    let leyendalabel = accion === 'agrega'
        ? `Agregar Opción para el código ${params.OTDatosDesc}`
        :
        `Borrar Opción para el código ${params.OTDatosDesc}`

    const BorraOpcion = () => {
        datosnuevos(params.OTDatosDesc, nroid, opcioneleg);
        // datosnuevos({ DetaOpcion: opcioneleg, Vpdef: 0 }, nroid);
        handleClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Capturamos el formulario
        const formElement = e.currentTarget;
        const formData = new FormData(formElement);

        // 2. Convertimos FormData a un objeto JS fácil de leer { DetaOpcion: "...", Vpdef: "..." }
        const datosFormulario = Object.fromEntries(formData.entries());

        // 3. Pasamos los datos limpios a tu función
        datosnuevos(datosFormulario, nroid, accion);

        handleClose();
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
                        <label>{leyendalabel} </label>
                        <TextField
                            required
                            id="Descripción"
                            label="Descripción de la Opción"
                            name='DetaOpcion'
                            defaultValue={opcioneleg}
                            width="100px"
                        />


                        <TextField
                            required
                            id="Vpdef"
                            label="Valor por Defecto  de la Opción"
                            name="Vpdef"
                            defaultValue="0"
                            width="100px"
                        />

                    </div>
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        {accion === 'borra' &&
                            <Button variant="contained" onClick={BorraOpcion}>Borra</Button>
                            ||
                            <Button type='submit' variant="contained">Aceptar</Button>}
                        <Button variant="contained" onClick={handleClose}>Cerrar</Button>
                    </div>
                </form>
            </Dialog >

        </>
    )
}

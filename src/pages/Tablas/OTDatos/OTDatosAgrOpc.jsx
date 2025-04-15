
import React from 'react'
import { Dialog, TextField } from '@mui/material'
import IpServidor from '../../VariablesDeEntorno'
import request from "superagent";
import MuestraMensaje from '../../../components/lib/MuestraMensaje';
const datosnuevos = async (formData, nroid) => {
    const newDatosSelect = {
        OTDatosDesc: formData.get('OTDatosDesc'),
        Vpdef: formData.get('Vpdef'),
        nroid: nroid
    }

    return new Promise(function () {
        setTimeout(() => {
            const url = IpServidor + "/otdatosagregaselec";
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
        }, 1000);
    });
}

export default function OTDatosAgrOpc(props) {
    const { open, handleClose, params
    } = props;
    let nroid = params.id.split("-")[0];
    console.log(nroid);


    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        datosnuevos(formData, nroid);
        handleClose(); // si querés cerrarlo después
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>{nroid}</label>
                        <TextField
                            required
                            id="Descripción"
                            label="Descripción"
                            name='OTDatosDesc'
                            defaultValue=""
                        />

                    </div>
                    <div>

                        <TextField
                            required
                            id="Vpdef"
                            label="Valor por Defecto"
                            name="Vpdef"
                            defaultValue="0"
                        />
                    </div>
                    <button type='submit'>Aceptar</button>
                    <button onClick={handleClose}>Cerrar</button>
                </form>
            </Dialog >

        </>
    )
}

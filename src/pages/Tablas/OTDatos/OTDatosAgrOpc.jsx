
import { Dialog, TextField } from '@mui/material'
import React from 'react'
const datosnuevos = async (OTDatosIng) => {
    const newUser = {
        OTDatosDesc: OTDatosIng.get('OTDatosDesc'),
        Vpdef: OTDatosIng.get('Vpdef')
    }

}
export default function OTDatosAgrOpc(props) {
    console.log('props  ', props)
    const { open, handleClose
    } = props;
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <form action={datosnuevos}>
                    <div>
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

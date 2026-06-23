import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import React from 'react';
import TextFieldComun from './TextFieldComun';
import MuestraMensaje from '../lib/MuestraMensaje';
import { Row } from "antd";

export default function PideFechas({ open, handleClose, fechaDesde, fechaHasta, setFechaDesde, setFechaHasta, onAceptar }) {
    let fechaValida = true
    const handleChange = (value, id) => {
        if (id === "FechaDesde") {
            setFechaDesde(value);
        }
        if (id === "FechaHasta") {
            setFechaHasta(value);
        }
    };

    const verificaFechas = () => {
        if (fechaDesde > fechaHasta) {
            fechaValida = false;
            MuestraMensaje(461, "Fecha Desde mayor a Fecha Hasta");
        };
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs" // Ajustado para que no ocupe toda la pantalla innecesariamente
            fullWidth={true}
        >
            <DialogContent>
                <Row style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <TextFieldComun
                        id="FechaDesde"
                        type="date"
                        label="Desde"
                        value={fechaDesde}
                        onChange={handleChange}
                        width="150px"
                    />

                    <TextFieldComun
                        id="FechaHasta"
                        type="date"
                        label="Hasta"
                        value={fechaHasta}
                        onChange={handleChange}
                        width="150px"
                    />
                </Row>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancelar</Button>
                <Button
                    onClick={() => {
                        verificaFechas();
                        onAceptar(); // Ejecuta la función del padre (ej. buscar en BD)
                        fechaValida && handleClose(); // Cierra el diálogo si la fecha es válida

                    }}
                    variant="contained"
                    color="primary"
                >
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
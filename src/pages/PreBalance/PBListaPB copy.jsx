import React, { useEffect, useRef, useState } from 'react';
import { format } from "date-fns";
import PideFechas from '../../components/comppropios/PideFechas';
import { PBListaPrebalance } from './PBListaPrebalance';
import TextFieldComun from '../../components/comppropios/TextFieldComun';
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Typography } from '@mui/material';
import { DatosLeer } from '../../components/DatosLeer';
import MuestraMensaje from '../../components/lib/MuestraMensaje';
import { DatosModificar } from '../../components/DatosModificar';

export default function PBListaPB() {
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const [modalOpen, setModalOpen] = useState(true);
    const muchosmesesabiertos = useRef()
    const [mesabierto, setMesabierto] = useState([]);
    // Los estados viven aquí, en el padre
    const [fechaActual, setFechaActual] = useState(format(new Date(), "yyyy-MM-dd"));
    const [impVentas, setImpVentas] = useState(0);
    const [pereleg, setPereleg] = useState(false);
    async function handleConsultar() {
        const [año, mes, dia] = fechaActual.split('-');
        const id = fechaActual
        const datos = { id, impVentas }
        const nuevoimpvta = await DatosModificar(datos, 'pbvtasmodivta');

        const rows = await PBListaPrebalance(fechaActual, impVentas, 'pblistaprebalance');
    };

    const handleChange = (value) => {
        setImpVentas(value);
    };


    const cambiarEstadoCierre = async (index, nuevoValor) => {
        const nuevosDatos = [...mesabierto];
        nuevosDatos[index].PBMesCerV = nuevoValor;
        setMesabierto(nuevosDatos);
        const nuevoDatos = await DatosModificar(nuevosDatos[index], 'pbvtasmodifcierre');
        MiraMesAbierto()
        // console.log("Datos actualizados:", nuevosDatos[index]);
    };
    async function MiraMesAbierto() {
        const mesabiertoleido = await DatosLeer('pbvtasleeabierto')
        setMesabierto(mesabiertoleido)
        if (mesabiertoleido.length > 2) {
            setSnackbar({
                children: "Hay más de un mes abierto",
                severity: "warning",
            })
            muchosmesesabiertos.current = true
        } else {
            setSnackbar(null)
            muchosmesesabiertos.current = false
        }

    }
    useEffect(() => {
        MiraMesAbierto()
    }, []);

    return (
        <div>
            {/* <button onClick={() => setModalOpen(true)}>Abrir Filtro de Fechas</button> */}

            {/* <PideFechas
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                fechaDesde={fechaDesde}
                fechaHasta={fechaHasta}
                setFechaDesde={setFechaDesde}
                setFechaHasta={setFechaHasta}
                onAceptar={handleConsultar}
            /> */}

            <div>
                <h3>Listado Prebalance : {fechaActual}</h3>


                <TextFieldComun
                    id="impVentas"
                    type="number"
                    label="Importe de Ventas"
                    value={impVentas}
                    onChange={handleChange}
                    width="150px"
                />
                <Button {...muchosmesesabiertos.current && { disabled: true }} onClick={handleConsultar}>Consultar</Button>
                {
                    !!snackbar && (
                        <Snackbar
                            open
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            onClose={handleCloseSnackbar}
                            autoHideDuration={5200}
                            sx={{ width: '100%' }}
                        >
                            <Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
                        </Snackbar>
                    )
                }
                {mesabierto.length !== 0 &&
                    mesabierto.map((item, index) => (
                        <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1 }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center', // Alinea verticalmente el texto con el Select
                                justifyContent: 'space-between', // Separa el texto a la izquierda y el Select a la derecha
                                gap: 3, // Espacio mínimo entre el texto y el Select si la pantalla se achica
                                width: '100%'
                            }}>
                                <Typography variant="subtitle1" sx={{ color: 'text.primary' }}>
                                    Período: <Box component="span" sx={{ fontWeight: 'bold', mr: 3 }}>{item.PBMesV}-{item.PBAnioV}</Box>
                                    Importe: <Box component="span" sx={{ fontWeight: 'bold', mr: 3 }}>
                                        {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }).format(item.PBImporteV)}
                                    </Box>
                                    Fecha: <Box component="span" sx={{ fontWeight: 'bold' }}>{item.PBFechaV}</Box>
                                </Typography>

                                <FormControl size="small" sx={{ minWidth: 120, mt: 3 }}  >
                                    <InputLabel>Estado Cierre</InputLabel>
                                    <Select
                                        value={item.PBMesCerV}
                                        label="Estado Cierre"
                                        onChange={(e) => cambiarEstadoCierre(index, e.target.value)}
                                    >
                                        <MenuItem value="N">Abierto</MenuItem>
                                        <MenuItem value="S">Cerrado</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Paper>
                    ))}
            </div>
        </div>
    );
}
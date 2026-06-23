import React, { useEffect, useRef, useState } from 'react';
import { format } from "date-fns";
import PideFechas from '../../components/comppropios/PideFechas';
import { PBListaPrebalance } from './PBListaPrebalance';
import TextFieldComun from '../../components/comppropios/TextFieldComun';
// MODIFICADO: Importamos Radio para la selección del período
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Typography, Radio } from '@mui/material';
import { DatosLeer } from '../../components/DatosLeer';
import MuestraMensaje from '../../components/lib/MuestraMensaje';
import { DatosModificar } from '../../components/DatosModificar';

export default function PBListaPB() {
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const [modalOpen, setModalOpen] = useState(true);
    const muchosmesesabiertos = useRef()
    const [mesabierto, setMesabierto] = useState([]);

    const [fechaActual, setFechaActual] = useState(format(new Date(), "yyyy-MM-dd"));
    const [impVentas, setImpVentas] = useState(0);
    const [pereleg, setPereleg] = useState(false);

    // MODIFICADO: Estado para guardar el período seleccionado por el usuario
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);

    async function handleConsultar() {
        // MODIFICADO: Validación por si intenta consultar sin elegir un período
        if (!periodoSeleccionado) {
            setSnackbar({
                children: "Por favor, seleccione un período antes de consultar.",
                severity: "error",
            });
            return;
        }

        const [año, mes, dia] = fechaActual.split('-');

        // MODIFICADO: Ahora puedes mandar los datos del período seleccionado a la API
        const datos = {
            id: fechaActual,
            impVentas,
            anioV: periodoSeleccionado.PBAnioV, // <--- Aquí tienes el año elegido
            mesV: periodoSeleccionado.PBMesV     // <--- Aquí tienes el mes elegido
        }

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
    };

    async function MiraMesAbierto() {
        const mesabiertoleido = await DatosLeer('pbvtasleeabierto')
        setMesabierto(mesabiertoleido)

        // Si hay datos y aún no se ha seleccionado ninguno por defecto, seleccionamos el primero
        if (mesabiertoleido.length > 0 && !periodoSeleccionado) {
            setPeriodoSeleccionado(mesabiertoleido[0]);
        }

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
            <div>
                <h3>Listado Prebalance : {fechaActual}</h3>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <TextFieldComun
                        id="impVentas"
                        type="number"
                        label="Importe de Ventas"
                        value={impVentas}
                        onChange={handleChange}
                        width="150px"
                    />
                    <Button
                        variant="contained"
                        {...muchosmesesabiertos.current && { disabled: true }}
                        onClick={handleConsultar}
                    >
                        Consultar
                    </Button>
                </Box>

                {/* MODIFICADO: Texto informativo para saber qué período se está afectando */}
                {periodoSeleccionado && (
                    <Typography variant="body2" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                        El importe se asignará al período: {periodoSeleccionado.PBMesV}-{periodoSeleccionado.PBAnioV}
                    </Typography>
                )}

                {!!snackbar && (
                    <Snackbar
                        open
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        onClose={handleCloseSnackbar}
                        autoHideDuration={5200}
                        sx={{ width: '100%' }}
                    >
                        <Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}

                {mesabierto.length !== 0 &&
                    mesabierto.map((item, index) => (
                        <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1 }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 3,
                                width: '100%'
                            }}>
                                {/* MODIFICADO: Agregamos el Radio Button al inicio de la fila */}
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Radio
                                        checked={periodoSeleccionado?.PBMesV === item.PBMesV && periodoSeleccionado?.PBAnioV === item.PBAnioV}
                                        onChange={() => setPeriodoSeleccionado(item)}
                                        value={`${item.PBMesV}-${item.PBAnioV}`}
                                        name="periodo-activo"
                                        inputProps={{ 'aria-label': `Seleccionar periodo ${item.PBMesV}-${item.PBAnioV}` }}
                                    />
                                    <Typography variant="subtitle1" sx={{ color: 'text.primary', ml: 1 }}>
                                        Período: <Box component="span" sx={{ fontWeight: 'bold', mr: 3 }}>{item.PBMesV}-{item.PBAnioV}</Box>
                                        Importe: <Box component="span" sx={{ fontWeight: 'bold', mr: 3 }}>
                                            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }).format(item.PBImporteV)}
                                        </Box>
                                        Fecha: <Box component="span" sx={{ fontWeight: 'bold' }}>{item.PBFechaV}</Box>
                                    </Typography>
                                </Box>

                                <FormControl size="small" sx={{ minWidth: 120 }} >
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
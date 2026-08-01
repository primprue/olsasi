import React, { useEffect, useRef, useState } from 'react';
import { format, endOfMonth } from 'date-fns';
import PideFechas from '../../components/comppropios/PideFechas';
import { PBListaPrebalance } from './PBListaPrebalance';
import TextFieldComun from '../../components/comppropios/TextFieldComun';
// MODIFICADO: Importamos Radio para la selección del período
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Typography, Radio } from '@mui/material';
import { DatosLeer } from '../../components/DatosLeer';
import { DatosModificar } from '../../components/DatosModificar';

export default function PBListaPB() {
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);
    const [modalOpen, setModalOpen] = useState(true);
    const muchosmesesabiertos = useRef()
    const [mesabierto, setMesabierto] = useState([]);

    const [fechaActual, setFechaActual] = useState(format(new Date(), "yyyy-MM-dd"));
    // const [fechaultimodia, setFechaUltimoDia] = useState('')
    // const [fechaActual, setFechaActual] = useState(
    //     format(endOfMonth(new Date()), "yyyy-MM-dd")
    // );
    const [impVentas, setImpVentas] = useState(0);
    const [pereleg, setPereleg] = useState(false);

    // MODIFICADO: Estado para guardar el período seleccionado por el usuario
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
    async function crearPeriodo() {
        const fechaOriginal = periodoSeleccionado.PBFechaV;

        // 1. Parsear la fecha original (DD-MM-YYYY)
        const [dia, mes, anio] = fechaOriginal.split('-').map(Number);

        // Nota: Los meses en JavaScript van de 0 (enero) a 11 (diciembre).
        // El mes siguiente numérico sería exactamente el valor de 'mes' (si junio es 6, pasamos 6 que equivale a julio)
        const añoSiguiente = mes === 12 ? anio + 1 : anio;
        const mesSiguienteIndex = mes === 12 ? 0 : mes;

        // 2. Obtener el último día del mes siguiente
        // Pasamos el índice del mes subsiguiente y el día 0 para que retroceda al último día del mes que queremos
        const ultimoDiaObjeto = new Date(añoSiguiente, mesSiguienteIndex + 1, 0);
        const ultimoDia = String(ultimoDiaObjeto.getDate()).padStart(2, '0');

        // 3. Obtener el mes siguiente (en número con dos dígitos, o en texto si lo prefieres)
        const mesSiguienteNumero = String(mesSiguienteIndex + 1).padStart(2, '0');

        const datos = {
            id: fechaActual,
            impVentas: 0,
            anioV: añoSiguiente, // <--- Aquí tienes el año elegido
            mesV: mesSiguienteNumero     // <--- Aquí tienes el mes elegido
        }
        const resultado = await DatosModificar(datos, 'pbvtasmodivta');
        if (resultado === 200) {
            MiraMesAbierto()
        }

    }
    async function handleConsultar() {
        // MODIFICADO: Validación por si intenta consultar sin elegir un período
        if (!periodoSeleccionado) {
            setSnackbar({
                children: "Por favor, seleccione un período antes de consultar.",
                severity: "error",
            });
            return;
        }
        if (periodoSeleccionado.PBAnioV !== null || periodoSeleccionado.PBMesV !== null) {
            const fechames = periodoSeleccionado.PBAnioV + '-' + periodoSeleccionado.PBMesV + '-' + 15;
            const fechaultimodia = format(endOfMonth(fechames), "yyyy-MM-dd");
            //setFechaUltimoDia(format(endOfMonth(fechames), "yyyy-MM-dd"))

            const [año, mes, dia] = fechaActual.split('-');
            // MODIFICADO: Ahora puedes mandar los datos del período seleccionado a la API
            const datos = {
                id: fechaultimodia,
                impVentas,
                anioV: periodoSeleccionado.PBAnioV, // <--- Aquí tienes el año elegido
                mesV: periodoSeleccionado.PBMesV     // <--- Aquí tienes el mes elegido
            }
            const nuevoimpvta = await DatosModificar(datos, 'pbvtasmodivta');
            // const rows = await PBListaPrebalance(fechaActual, impVentas, 'pblistaprebalance');
            const rows = await PBListaPrebalance(fechaultimodia, impVentas, 'pblistaprebalance');
        }
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
                    <Button
                        variant="contained"
                        onClick={crearPeriodo}
                    >
                        Crear Período
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
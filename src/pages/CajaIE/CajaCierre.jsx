import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField, Stack, IconButton, Grid } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextoPesos from '../../components/comppropios/TextoPesos';
import moment from "moment";
import { BilletesLeer } from './BilletesLeer';
import { CajaSaldoEfLeer } from './CajaSaldoEfLeer';
import { CajaIESumaMov } from './CajaIESumaMov';
import BilletesPorMoneda from './BilletesPorMoneda';
import ArchiveIcon from "@mui/icons-material/Archive";
import { leerStkMonedas } from '../Tablas/Monedas/StkMonedasLeer';

import { red, green } from "@mui/material/colors";
import { set } from 'react-hook-form';
export default function CajaCierre({ rows, onClose }) {
    const [snackbar, setSnackbar] = useState(null);
    const [valoresCalculados, setValoresCalculados] = useState(null);
    const [fechaHoy] = useState(moment().format("DD/MM/YYYY"));
    const [totalConSaldo, setTotalConSaldo] = useState(0);
    const [billetes, setBilletes] = useState([]);
    const [saldoEf, setSaldoEf] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const [diferencia, setDiferencia] = useState(0);
    const [sumademov, setSumademov] = useState([]);
    const [monedas, setMonedas] = useState([]);
    const [totales, setTotales] = useState({});
    const [valorEsperado, setValorEsperado] = useState({});

    async function buscaBilletes() {
        const data = await BilletesLeer();
        setBilletes(data);
    }

    async function buscaSaldoEf() {
        const data = await CajaSaldoEfLeer();
        setSaldoEf(data);
    }
    async function cajaiesumamov() {
        const data = await CajaIESumaMov();

        const jsonString = data[0].TotalesPorMoneda;

        // Lo parseo a objeto
        const totales = JSON.parse(jsonString);
        // setSumademov(data);
        setTotales(totales);
    }
    /*este es para agregar el saldo anterior al total*/
    async function leemonedas() {
        const data = await leerStkMonedas();
        setMonedas(data);
    }



    useEffect(() => {
        leemonedas()
        buscaBilletes();
        buscaSaldoEf();
        cajaiesumamov()
    }, []);


    const handleCloseSnackbar = () => setSnackbar(null);
    const handleGrabar = () => {
        console.log('Grabar')
        console.log('cantidades', cantidades)
        console.log('valorEsperado', valorEsperado)
    }
    const handleChangeBilletes = (moneda, label, e) => {
        const valor = e.target.value;
        setCantidades(prev => ({
            ...prev,
            [moneda]: {
                ...prev[moneda],
                [label]: valor
            }
        }));


    };
    const calculavaloresperado = (moneda) => {
        if (moneda === "ARS") {
            setValorEsperado(prev => ({
                ...prev,
                [moneda]:
                    (valoresCalculados.totalesPorMoneda[moneda].EfectivoSinPunto ?? 0) +
                    (valoresCalculados.totalesPorMoneda[moneda].EfectivoConPunto ?? 0) +
                    (saldoEf[0]?.CajaSaldoEfImporte ?? 0),

            }));
        } else {
            setValorEsperado(prev => ({
                ...prev,
                [moneda]:
                    (valoresCalculados.totalesPorMoneda[moneda].EfectivoSinPunto ?? 0) +
                    (valoresCalculados.totalesPorMoneda[moneda].EfectivoConPunto ?? 0)
            }));
        }
    }
    function formatDate(fechaISO) {
        if (!fechaISO) return "";
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }

    // función que calcula el total de billetes para una moneda
    const calcularTotalBilletes = (monedaId) => {
        if (!cantidades[monedaId]) return 0;

        return Object.entries(cantidades[monedaId]).reduce((acum, [denominacion, cant]) => {
            return acum + parseInt(denominacion, 10) * cant; // denominación * cantidad
        }, 0);
    };
    // if (sumademov[0]?.TotalesPorMoneda) {
    //Obtengo el string JSON
    // if (totales) {

    //     console.log('monedas', monedas)
    //     monedas.forEach((moneda) => {
    //         console.log(
    //             `ID: ${moneda.id}, Descripción: ${moneda.StkMonedasDescripcion}, Cotización: ${moneda.StkMonedasCotizacion}, Signo: ${moneda.StkMonedasSigno}`
    //         );
    //         console.log('totales[moneda.id]', totales[moneda.id])
    //     });



    // }



    // {
    //   ARS: { totalInstr: 158000, totalConPunto: 758000, totalSinPunto: 308000 },
    //   USD: { totalInstr: 0, totalConPunto: 0, totalSinPunto: 25 }
    // }

    return (
        <Dialog open={true} onClose={onClose} maxWidth="xl" fullWidth>

            <DialogContent>
                {(totales) && (
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <DialogTitle>Cierre de Caja  </DialogTitle>
                        <Stack direction="row" spacing={2} alignItems="center" padding={5}>
                            <Typography color="#0502ac" fontSize={18} >
                                Saldo al  {formatDate(saldoEf[0]?.idCajaSaldoEfFecha)}
                            </Typography>
                            <TextoPesos value={saldoEf[0]?.CajaSaldoEfImporte} color="#0502ac" fontSize={18} />
                        </Stack>

                        {Array.isArray(monedas) && (
                            <Grid container spacing={2}>
                                {monedas.map((moneda) => {
                                    const valores = totales[moneda.id] || {};

                                    return (
                                        <Grid item xs={6} key={moneda.id}>
                                            <Typography variant="h6" color="primary">
                                                {moneda.StkMonedasDescripcion} ({moneda.StkMonedasSigno})
                                            </Typography>

                                            {/* Totales */}
                                            <Stack spacing={1} mt={2}>
                                                <Typography>Total Instr: {valores.totalInstr ?? 0}</Typography>
                                                <Typography>Total con Punto: {valores.totalConPunto ?? 0}</Typography>
                                                <Typography>Total sin Punto: {valores.totalSinPunto ?? 0}</Typography>
                                            </Stack>

                                            {/* Denominaciones de billetes */}
                                            <Box mt={2} display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>
                                                {billetes
                                                    .filter((b) => b.BilletesMoneda === moneda.id) // 👈 ojo: acá usás moneda.id
                                                    .map(({ label }) => (
                                                        <TextField
                                                            key={`${moneda.id}-${label}`}
                                                            label={`${label} ${moneda.StkMonedasSigno}`}
                                                            type="number"
                                                            value={cantidades[moneda.id]?.[label] || ""}
                                                            onChange={(e) => handleChangeBilletes(moneda.id, label, e)}
                                                        />
                                                    ))}
                                            </Box>
                                            {/* Total de billetes para esa moneda */}
                                            <Stack mt={2} direction="row" spacing={2}>
                                                <Typography fontWeight="bold">Total billetes:</Typography>
                                                <Typography color="green">
                                                    {calcularTotalBilletes(moneda.id).toLocaleString("es-AR", {
                                                        style: "currency",
                                                        currency: moneda.id,
                                                    })}
                                                </Typography>
                                                <Typography fontWeight="bold">Total esperado:</Typography>
                                                <Typography color="green">
                                                    {totales[moneda.id]?.totalConPuntoEsp.toLocaleString("es-AR", {
                                                        style: "currency",
                                                        currency: moneda.id,
                                                    })}
                                                </Typography>
                                            </Stack>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        )}

                        {/* 
                        {Array.isArray(monedas) && (
                            <Grid container spacing={2}>
                                {monedas.map((moneda) => {
                                    const valores = totales[moneda.id] || {};

                                    return (
                                        <Grid item xs={6} key={moneda.id}>
                                            <Typography variant="h6" color="primary">
                                                {moneda.StkMonedasDescripcion} ({moneda.StkMonedasSigno})
                                            </Typography>

                                            <Stack spacing={1} mt={2}>
                                                <Typography>Total Instr: {valores.totalInstr ?? 0}</Typography>
                                                <Typography>Total con Punto: {valores.totalConPunto ?? 0}</Typography>
                                                <Typography>Total sin Punto: {valores.totalSinPunto ?? 0}</Typography>
                                            </Stack>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            
                        )} */}
                    </Box>

                    // })
                )}

                {/* {Object.entries(totales).forEach(([moneda, valores]) => {
                    console.log(moneda, valores.totalConPunto, valores.totalSinPunto, valores.totalInstr);
                })} */}



                <IconButton onClick={() => handleGrabar()} >
                    <ArchiveIcon
                        style={{ color: green[500] }}
                    // fontSize="large"
                    // titleAccess="Grabar"
                    />
                </IconButton>
            </DialogContent>

            {snackbar && (
                <Snackbar
                    open
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={handleCloseSnackbar}
                >
                    <Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Dialog>
    );
}

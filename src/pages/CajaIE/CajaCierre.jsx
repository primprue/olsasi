import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField, Stack, IconButton, Grid } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextoPesos from '../../components/comppropios/TextoPesos';
import { BilletesLeer } from './BilletesLeer';
import { CajaSaldoEfLeer } from './CajaSaldoEfLeer';
import { CajaIESumaMov } from './CajaIESumaMov';
import ArchiveIcon from "@mui/icons-material/Archive";
// import { leerStkMonedas } from '../Tablas/Monedas/StkMonedasLeer';
import { DatosLeer } from "../../components/DatosLeer.jsx";
import { green } from "@mui/material/colors";
import BilletesQuedan from './BilletesQuedan';
import { CajaCierreParamLee } from './CajaCierreParamLee';
import formdata from "../Tablas/Monedas/formdata.js";
export default function CajaCierre({ rows, onClose }) {
    const [snackbar, setSnackbar] = useState(null);
    const [billetes, setBilletes] = useState([]);
    const [cierreparam, setCierreparam] = useState([]);
    const [saldoEf, setSaldoEf] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const [monedas, setMonedas] = useState([]);
    const [totales, setTotales] = useState({});
    const [bilquedan, setBilquedan] = useState(false);
    const [cantidadesBilquedan, setCantidadesBilquedan] = useState({});
    const [totalqueda, setTotalqueda] = useState(0);
    const [resultados, setResultados] = useState({});


    async function buscaBilletes() {
        const data = await BilletesLeer();
        setBilletes(data);
    }
    async function buscaCajaCierreParam() {
        const data = await CajaCierreParamLee();
        setCierreparam(data);
    }
    async function buscaSaldoEf() {
        const data = await CajaSaldoEfLeer();
        setSaldoEf(data);
    }
    async function cajaiesumamov() {
        const data = await CajaIESumaMov();
        setTotales((Array.isArray(data[0]) ? data[0][0] : data[0]).TotalesPorMoneda);
    }
    /*este es para agregar el saldo anterior al total*/
    async function leemonedas() {
        // const data = await leerStkMonedas();
        const data = await DatosLeer(formdata.nombackleer);
        setMonedas(data);
    }

    useEffect(() => {
        leemonedas()
        buscaBilletes();
        buscaCajaCierreParam();
        buscaSaldoEf();
        cajaiesumamov()
    }, []);



    const handleCloseSnackbar = () => setSnackbar(null);
    const Billetesquequedan = () => {
        let diferenciaNum = 0;
        let tolerancia = 0
        let moneda = '' // 👈 para mostrar en el snackbar
        let hayDiferencia = Object.keys(totales).some((monedaId) => {
            diferenciaNum = resultados[monedaId]?.diferenciaNum ?? 100; // si no existe, se asume 0
            tolerancia = cierreparam.find(p => p.CajaCierreParamMon === monedaId)?.CajaCierreParamTolerancia ?? 0;
            moneda = monedaId
            return diferenciaNum !== 0;
        });
        setBilquedan(true);
        if (!hayDiferencia) {
            setSnackbar(null);
            setBilquedan(true);
        } else {
            if ((diferenciaNum > tolerancia) || (diferenciaNum < -tolerancia)) {
                setSnackbar({ children: `HAY DIFERENCIA!!!!! La tolerancia de ${moneda} es ${tolerancia}`, severity: "error" });
                setBilquedan(false);
            }

        }

    };

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

    function formatDate(fechaISO) {
        if (!fechaISO) return "";
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }




    // recalcular cada vez que cambian cantidades o totales
    useEffect(() => {
        Object.keys(cantidades).forEach((monedaId) => {
            const totalNum = Object.entries(cantidades[monedaId]).reduce(
                (acum, [denominacion, cant]) =>
                    acum + parseInt(denominacion, 10) * cant,
                0
            );

            const total = totalNum.toLocaleString("es-AR", {
                style: "currency",
                currency: monedaId,
            });

            const diferenciaNum = (totales[monedaId]?.totalMEsp ?? 0) - totalNum;

            const diferencia = diferenciaNum.toLocaleString("es-AR", {
                style: "currency",
                currency: monedaId,
            });

            setResultados((prev) => ({
                ...prev,
                [monedaId]: { total, diferencia, totalNum, diferenciaNum },
            }));
        });
    }, [cantidades, totales]); // 👈 recalcula solo cuando cambian
    // }, []); // 👈 recalcula solo cuando cambian


    return (
        <>
            <Dialog open={true} onClose={onClose} maxWidth="xl" fullWidth>
                {/* 🔹 El título va directo acá, no dentro del Content */}
                <DialogTitle sx={{ textAlign: "center" }}>
                    <Box display="inline-flex" justifyContent="center" alignItems="center" gap={2}>
                        <Typography variant="h6" component="span">
                            Cierre de Caja
                        </Typography>
                    </Box>
                </DialogTitle>

                {/* 🔹 Ahora sí el contenido del diálogo */}
                <DialogContent>
                    {totales && Object.keys(totales).length !== 0 && (
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            {Array.isArray(monedas) && (
                                <Grid container spacing={2}>
                                    {monedas.map((moneda) => {
                                        const valores = totales[moneda.id] || {};

                                        const encontrado = saldoEf.find(
                                            (d) => d.CajaSaldoMoneda === moneda.id
                                        );
                                        return (

                                            <Grid item xs={6} key={moneda.id}>
                                                <Typography variant="h6" color="primary">
                                                    {moneda.StkMonedasDescripcion} ({moneda.StkMonedasSigno})
                                                </Typography>

                                                <TextoPesos
                                                    label={`Saldo al ${formatDate(saldoEf[0]?.idCajaSaldoEfFecha)}`}
                                                    value={encontrado ? encontrado.CajaSaldoEfImporte : 0}
                                                    color="#0221ac"
                                                    fontSize={20}
                                                />

                                                {/* Totales */}
                                                <Stack direction="row" spacing={4} mt={2}>
                                                    <Typography color="#43829b">
                                                        Instr:{" "}
                                                        {(valores.totalInstr || 0).toLocaleString("es-AR", {
                                                            style: "currency",
                                                            currency: moneda.id,
                                                        })}
                                                    </Typography>


                                                    <Typography color="#43829b">
                                                        menos la Tarde :{" "}
                                                        {(valores.totalT || 0).toLocaleString("es-AR", {
                                                            style: "currency",
                                                            currency: moneda.id,
                                                        }) ?? 0}
                                                    </Typography>
                                                    <Typography color="#43829b" fontWeight="bold" fontSize="1.2rem">
                                                        = {" "}
                                                        {(valores.totalTSinInstr || 0).toLocaleString("es-AR", {
                                                            style: "currency",
                                                            currency: moneda.id,
                                                        }) ?? 0}
                                                    </Typography>

                                                    <Typography color="#5c9b43f6" fontWeight="bold" fontSize="1.2rem">
                                                        La Man. :{" "}
                                                        {(valores.totalM || 0).toLocaleString("es-AR", {
                                                            style: "currency",
                                                            currency: moneda.id,
                                                        }) ?? 0}
                                                    </Typography>
                                                </Stack>

                                                {/* Denominaciones de billetes */}
                                                <Box
                                                    mt={2}
                                                    display="grid"
                                                    gridTemplateColumns="repeat(10, 1fr)"
                                                    gap={2}
                                                >
                                                    {billetes
                                                        .filter((b) => b.BilletesMoneda === moneda.id)
                                                        .map(({ label }) => (
                                                            <TextField
                                                                key={`${moneda.id}-${label}`}
                                                                label={`${label} ${moneda.StkMonedasSigno}`}
                                                                type="number"
                                                                value={cantidades[moneda.id]?.[label] || ""}
                                                                onChange={(e) =>
                                                                    handleChangeBilletes(moneda.id, label, e)
                                                                }
                                                            />
                                                        ))}
                                                </Box>

                                                {/* Total de billetes */}

                                                <Stack mt={2} direction="row" spacing={2}>
                                                    <>
                                                        <Typography fontWeight="bold">Total billetes:</Typography>
                                                        <Typography color="green">{resultados[moneda.id]?.total}</Typography>

                                                        <Typography fontWeight="bold">Total esperado:</Typography>
                                                        <Typography color="green">
                                                            {totales[moneda.id]?.totalMEsp.toLocaleString("es-AR", {
                                                                style: "currency",
                                                                currency: moneda.id,
                                                            })}
                                                        </Typography>

                                                        <Typography fontWeight="bold">Diferencia :</Typography>
                                                        <Typography
                                                            color={
                                                                resultados[moneda.id]?.diferenciaNum === 0 ? "green" : "red"
                                                            }
                                                        >
                                                            {resultados[moneda.id]?.diferencia}
                                                        </Typography>
                                                    </>
                                                </Stack>


                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            )}
                        </Box>
                    )
                    }
                    <IconButton onClick={() => Billetesquequedan()}>
                        <ArchiveIcon style={{ color: green[500] }} />
                    </IconButton>

                </DialogContent>

                {snackbar && (
                    <Snackbar
                        open
                        autoHideDuration={3000}
                        anchorOrigin={{ vertical: "center", horizontal: "center" }}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert
                            {...snackbar}
                            variant="filled"
                            onClose={handleCloseSnackbar}
                        />
                    </Snackbar>
                )}
            </Dialog >
            <BilletesQuedan
                open={bilquedan}
                handleClose={() => setBilquedan(false)}
                monedas={monedas}
                billetes={billetes}
                totales={totales}
                cantidades={cantidades}

            />


        </>
    );

}

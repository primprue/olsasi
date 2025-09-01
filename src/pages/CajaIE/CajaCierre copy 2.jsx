import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField, Stack, IconButton } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextoPesos from '../../components/comppropios/TextoPesos';
import moment from "moment";
import { BilletesLeer } from './BilletesLeer';
import { CajaSaldoEfLeer } from './CajaSaldoEfLeer';
import BilletesPorMoneda from './BilletesPorMoneda';
import ArchiveIcon from "@mui/icons-material/Archive";
import { red, green } from "@mui/material/colors";
export default function CajaCierre({ rows, onClose }) {
    const [snackbar, setSnackbar] = useState(null);
    const [valoresCalculados, setValoresCalculados] = useState(null);
    const [fechaHoy] = useState(moment().format("DD/MM/YYYY"));
    const [totalConSaldo, setTotalConSaldo] = useState(0);
    const [billetes, setBilletes] = useState([]);
    const [saldoEf, setSaldoEf] = useState([]);
    const [cantidades, setCantidades] = useState({});
    const [diferencia, setDiferencia] = useState(0);
    const [valorEsperado, setValorEsperado] = useState({});
    async function buscaBilletes() {
        const data = await BilletesLeer();
        console.log('billetes', data)
        setBilletes(data);
    }

    async function buscaSaldoEf() {
        const data = await CajaSaldoEfLeer();
        setSaldoEf(data);
    }


    useEffect(() => {
        if (valoresCalculados && saldoEf.length > 0) {
            const total =
                valoresCalculados.EfectivoConPunto +
                valoresCalculados.EfectivoSinPunto +
                Number(saldoEf[0]?.CajaSaldoEfImporte || 0);
            setTotalConSaldo(total);
        }
    }, [valoresCalculados, saldoEf]);
    useEffect(() => {
        buscaBilletes();
        buscaSaldoEf();
    }, []);

    useEffect(() => {
        const buscanograbados = rows.filter(r => r.CajaIEGrabado === "N");
        if (buscanograbados.length > 0) {
            setSnackbar({
                children: "Hay movimientos sin grabar",
                severity: "error",
            });

            setTimeout(() => {
                onClose();
            }, 3000);
        } else {
            let totalesPorMoneda = {};

            rows.forEach((row) => {
                const importe = parseFloat(row.CajaIEImporte) || 0;
                const importeI = parseFloat(row.CajaIEImpIP) || 0;
                let moneda = row.CajaIEMoneda;
                console.log('moneda', moneda)
                moneda = moneda === "PES" ? "ARS" : moneda === "DLS" ? "USD" : "ARS";

                if (!totalesPorMoneda[moneda]) {
                    totalesPorMoneda[moneda] = {
                        totalConPunto: 0,
                        totalSinPunto: 0,
                        totalInstrumentos: 0,
                        totalSalidaConPunto: 0,
                        totalSalidaSinPunto: 0,
                        EfectivoConPunto: 0,
                        EfectivoSinPunto: 0
                    };
                }
                console.log('totalesPorMoneda en forech dd', totalesPorMoneda)
                if (row.CajaIEPunto === "S") {
                    if (importe > 0) {
                        totalesPorMoneda[moneda].totalConPunto += importe;
                    } else {
                        totalesPorMoneda[moneda].totalSalidaConPunto += importe;
                    }
                } else {
                    if (importe > 0) {

                        totalesPorMoneda[moneda].totalSinPunto += importe;
                    } else {
                        totalesPorMoneda[moneda].totalSalidaSinPunto += importe;
                    }

                }
                if (!isNaN(importeI) && importeI > 0) {
                    // if (importeI > 0) {
                    totalesPorMoneda[moneda].totalInstrumentos += importeI;
                }
            });

            for (let moneda in totalesPorMoneda) {
                const m = totalesPorMoneda[moneda];
                m.EfectivoSinPunto = m.totalSinPunto - m.totalInstrumentos + m.totalSalidaSinPunto;
                m.EfectivoConPunto = m.totalConPunto + m.totalSalidaConPunto;
            }
            setValoresCalculados({
                totalesPorMoneda,
                cantidad: rows.length
            });
        }
    }, [rows, onClose]);

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
        calculavaloresperado(moneda)
        // if (moneda === "PES") {
        //     setValorEsperado(prev => ({
        //         ...prev,
        //         [moneda]:
        //             (valoresCalculados.totalesPorMoneda[moneda].EfectivoSinPunto ?? 0) +
        //             (valoresCalculados.totalesPorMoneda[moneda].EfectivoConPunto ?? 0) +
        //             (saldoEf[0]?.CajaSaldoEfImporte ?? 0),

        //     }));
        // } else {
        //     setValorEsperado(prev => ({
        //         ...prev,
        //         [moneda]:
        //             (valoresCalculados.totalesPorMoneda[moneda].EfectivoSinPunto ?? 0) +
        //             (valoresCalculados.totalesPorMoneda[moneda].EfectivoConPunto ?? 0)
        //     }));
        // }

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
    return (
        <Dialog open={true} onClose={onClose} maxWidth="xl" fullWidth>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <DialogTitle>Cierre de Caja  </DialogTitle>
                <Stack direction="row" spacing={2} alignItems="center" padding={5}>
                    <Typography color="#0502ac" fontSize={18} >
                        Saldo al  {formatDate(saldoEf[0]?.idCajaSaldoEfFecha)}
                    </Typography>
                    <TextoPesos value={saldoEf[0]?.CajaSaldoEfImporte} color="#0502ac" fontSize={18} />
                </Stack>

            </Box>
            <DialogContent>
                {valoresCalculados && valoresCalculados.totalesPorMoneda && (
                    <Box display="flex" gap={4}>
                        {Object.entries(valoresCalculados.totalesPorMoneda).map(([moneda, datos]) => {
                            const totalCalculado = billetes
                                .filter(b => b.BilletesMoneda === moneda)
                                .reduce((acc, b) => {
                                    const cantidad = Number(cantidades[moneda]?.[b.label] || 0);
                                    const valorBillete = Number(b.label);
                                    return acc + cantidad * valorBillete;
                                }, 0);
                            // moneda = moneda === "PES" ? "ARS" : moneda === "DLS" ? "USD" : "ARS";

                            return (
                                <Box key={moneda} display="flex" flexDirection="column" gap={1}>
                                    <Typography
                                        variant="body1"
                                        style={{
                                            color: '#000',
                                            fontFamily: 'Georgia, serif',
                                            fontWeight: 500,
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {moneda}
                                    </Typography>

                                    <Typography variant="body2" style={{ color: '#f00928' }}>Con punto</Typography>
                                    <TextoPesos label="Salida" value={datos.totalSalidaConPunto} color="#ff5722" />
                                    <TextoPesos label="Efectivo" value={datos.EfectivoConPunto} color="#ff5722" />

                                    <Typography variant="body2" style={{ color: "#085c05" }}>Sin punto</Typography>
                                    <TextoPesos label="Total" value={datos.totalSinPunto} color="#085c05" />
                                    <TextoPesos label="Salida" value={datos.totalSalidaSinPunto} color="#085c05" />
                                    <TextoPesos label="Instrumentos" value={datos.totalInstrumentos} color="#085c05" />
                                    <TextoPesos label="Efectivo" value={datos.EfectivoSinPunto} color="#085c05" />

                                    <Box mt={2} display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={2}>

                                        {billetes
                                            .filter(b => b.BilletesMoneda === moneda)
                                            .map(({ label }) => (
                                                <TextField
                                                    key={`${moneda}-${label}`}
                                                    label={`${label} ${moneda}`}
                                                    type="number"
                                                    value={cantidades[moneda]?.[label] || ""}
                                                    onChange={(e) => handleChangeBilletes(moneda, label, e)}
                                                />
                                            ))}
                                    </Box>
                                    <Typography>
                                        Total esperado : {(valorEsperado[moneda])}
                                        {/* {(datos.EfectivoSinPunto + datos.EfectivoConPunto).toLocaleString("es-AR", { style: "currency", currency: moneda })} */}
                                    </Typography>
                                    {/* {
                                        moneda === "ARS" ? (
                                            <Typography>
                                                Total esperado: {valorEsperado['ARS'].toLocaleString("es-AR", { style: "currency", currency: moneda })} */}
                                    {/* {(datos.EfectivoSinPunto + datos.EfectivoConPunto + saldoEf[0]?.CajaSaldoEfImporte).toLocaleString("es-AR", { style: "currency", currency: moneda })} */}

                                    {/* </Typography>) :
                                            (<Typography>
                                                Total esperado : {valorEsperado[moneda]} */}
                                    {/* {(datos.EfectivoSinPunto + datos.EfectivoConPunto).toLocaleString("es-AR", { style: "currency", currency: moneda })} */}
                                    {/* </Typography>)
                                    } */}
                                    <Typography>
                                        Conteo : {(totalCalculado).toLocaleString("es-AR", { style: "currency", currency: moneda })}
                                    </Typography>
                                    {
                                        moneda === "ARS" ? (
                                            <Typography>
                                                Diferencia :
                                                {(datos.EfectivoSinPunto + datos.EfectivoConPunto + saldoEf[0]?.CajaSaldoEfImporte - totalCalculado).toLocaleString("es-AR", { style: "currency", currency: moneda })}

                                            </Typography>) :
                                            (<Typography>
                                                Diferencia :
                                                {(datos.EfectivoSinPunto + datos.EfectivoConPunto - totalCalculado).toLocaleString("es-AR", { style: "currency", currency: moneda })}
                                            </Typography>)
                                    }


                                </Box>
                            );
                        })}
                    </Box>
                )
                }

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

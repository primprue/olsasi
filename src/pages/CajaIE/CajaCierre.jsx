import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Box, TextField } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextFieldComunChico from '../../components/comppropios/TextFieldComunChico';
import TextoPesos from '../../components/comppropios/TextoPesos';
import moment from "moment";
import { BilletesLeer } from './BilletesLeer';
import { CajaSaldoEfLeer } from './CajaSaldoEfLeer';

export default function CajaCierre({ rows, onClose }) {
    const [snackbar, setSnackbar] = useState(null);
    const [valoresCalculados, setValoresCalculados] = useState(null);
    const [fechaHoy, setFechaHoy] = useState(moment().format("DD/MM/YYYY"));
    const [totalConSaldo, setTotalConSaldo] = useState(0);

    const [billetes, setBilletes] = useState([]);
    const [saldoEf, setSaldoEf] = useState([]);

    async function buscaBilletes() {
        const data = await BilletesLeer();
        setBilletes(data);
    };

    async function buscaSaldoEf() {
        const data = await CajaSaldoEfLeer();
        setSaldoEf(data);
    };

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
                onClose(); // Cierra el diálogo después de mostrar el error
            }, 3000);
        } else {
            let totalConPunto = 0;
            let totalSinPunto = 0;
            let totalInstrumentos = 0;
            let totalSalidaConPunto = 0;
            let totalSalidaSinPunto = 0;

            rows.forEach((row) => {
                const importe = parseFloat(row.CajaIEImporte) || 0;
                const importeI = parseFloat(row.CajaIEImpIP) || 0;

                // Total con/sin punto
                if (row.CajaIEPunto === "S") {
                    if (importe > 0) {
                        totalConPunto += importe;
                    } else {
                        totalSalidaConPunto += importe;
                    }
                } else {
                    if (importe > 0) {
                        totalSinPunto += importe;
                        totalInstrumentos += importeI;
                    } else {
                        totalSalidaSinPunto += importe;
                    }
                }
            });
            let EfectivoSinPunto = totalSinPunto - totalInstrumentos + totalSalidaSinPunto;
            let EfectivoConPunto = totalConPunto + totalSalidaConPunto;

            setValoresCalculados({
                totalConPunto,
                totalSinPunto,
                totalInstrumentos,
                EfectivoSinPunto,
                EfectivoConPunto,
                totalSalidaConPunto,
                totalSalidaSinPunto,
                cantidad: rows.length
            });
        }
    }, [rows, onClose]);

    const [cantidades, setCantidades] = useState({});

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleChange = (label, e) => {
        console.log('handleChange', label, e.target.value);
        const cantidad = e.target.value;
        setCantidades((prev) => ({
            ...prev,
            [label]: cantidad,
        }));
    };
    const totalEfectivoEnCaja = Object.entries(cantidades).reduce(
        (acc, [label, cantidad]) => acc + Number(label) * Number(cantidad || 0),
        0
    );

    return (
        <Dialog open={true}
            onClose={onClose}
            maxWidth="lg" // o "lg" si no querés tan grande
            fullWidth >
            <DialogTitle>Cierre de Caja</DialogTitle>
            <DialogContent>
                {valoresCalculados && (
                    <Box display="flex" gap={4}>
                        {/* Columna: Con punto */}
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography
                                variant="body1"
                                component="div"
                                style={{
                                    color: '#f00928',
                                    fontFamily: 'Georgia, serif',
                                    fontWeight: 500,
                                    fontStyle: 'bold',
                                    fontSize: '1.2rem',
                                }}
                            >
                                Con punto
                            </Typography>
                            <TextoPesos label="Total" value={valoresCalculados.totalConPunto} color="#ff5722" />
                            <TextoPesos label="Salida" value={valoresCalculados.totalSalidaConPunto} color="#ff5722" />
                            <TextoPesos label="Efectivo" value={valoresCalculados.EfectivoConPunto} color="#ff5722" />
                        </Box>

                        {/* Columna: Sin punto */}
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Typography
                                variant="body1"
                                component="div"
                                style={{
                                    color: "#085c05",
                                    fontFamily: 'Georgia, serif',
                                    fontWeight: 500,
                                    fontStyle: 'bold',
                                    fontSize: '1.2rem',
                                }}
                            >
                                Sin punto
                            </Typography>
                            <TextoPesos label="Total" value={valoresCalculados.totalSinPunto} color="#085c05" />
                            <TextoPesos label="Salida" value={valoresCalculados.totalSalidaSinPunto} color="#085c05" />
                            <TextoPesos label="Instrumentos" value={valoresCalculados.totalInstrumentos} color="#085c05" />
                            <TextoPesos label="Efectivo" value={valoresCalculados.EfectivoSinPunto} color="#085c05" />
                        </Box>

                        {/* Saldo anterior */}
                        {saldoEf.length > 0 && (
                            <Box display="flex" flexDirection="column" gap={1}>
                                <TextoPesos label="Saldo anterior:" value={saldoEf[0].CajaSaldoEfImporte} color="#0611a7" />
                                <TextoPesos label="Total efectivo con saldo:" value={totalConSaldo} color="#0611a7" fontSize='1.25rem' />
                            </Box>
                        )}
                    </Box>
                )}

                {/* Total efectivo en caja y diferencia */}
                {totalEfectivoEnCaja > 0 && (
                    <Box mt={2} display="flex" flexDirection="column" gap={1}>
                        <TextoPesos label="Total efectivo en caja:" value={totalEfectivoEnCaja} color="#8a079b" />
                        <TextoPesos
                            label={
                                totalEfectivoEnCaja - totalConSaldo < 0
                                    ? "Falta efectivo en caja:"
                                    : "Sobra efectivo en caja:"
                            }
                            value={totalEfectivoEnCaja - totalConSaldo}
                            color={
                                totalEfectivoEnCaja - totalConSaldo < 0
                                    ? "#ee0b0b"
                                    : "#04990b"
                            }

                            fontSize='1.25rem'
                        />

                    </Box>
                )}

                {/* Campos de billetes */}
                <Box
                    mt={2}
                    display="grid"
                    gridTemplateColumns="repeat(5, 1fr)" // 4 columnas iguales
                    gap={2}
                >
                    {billetes.map(({ label }) => (
                        <TextField
                            key={label}
                            label={`Cantidad de ${label}`}
                            type="number"
                            value={cantidades[label] || ""}
                            onChange={(e) => handleChange(label, e)}
                        // sx={{ width: "30%" }}
                        />
                    ))}
                </Box>

                {/* Campo de Total Efectivo */}
                {false && (
                    <Box mt={2}>
                        <TextFieldComunChico
                            label="Total efectivo en caja:"
                            type="number"
                            value={totalEfectivoEnCaja}
                            onChange={(e) => handleChange("TotalEfectivo", e)}
                        />
                    </Box>)}
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

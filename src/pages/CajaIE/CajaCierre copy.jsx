import React, { useEffect, useMemo, useState } from 'react';
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
            let totalDolar = 0;
            let totalEuro = 0;
            let totalPesos = 0;


            // Objeto para acumular totales por moneda
            let totalesPorMoneda = {};

            // Recorremos las filas
            rows.forEach((row) => {
                const importe = parseFloat(row.CajaIEImporte) || 0;
                const importeI = parseFloat(row.CajaIEImpIP) || 0;
                const moneda = row.CajaIEMoneda;

                // Si es la primera vez que encontramos esta moneda, inicializamos sus campos
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

                // Total con/sin punto por moneda
                if (row.CajaIEPunto === "S") {
                    if (importe > 0) {
                        totalesPorMoneda[moneda].totalConPunto += importe;
                    } else {
                        totalesPorMoneda[moneda].totalSalidaConPunto += importe;
                    }
                } else {
                    if (importe > 0) {
                        totalesPorMoneda[moneda].totalSinPunto += importe;
                        totalesPorMoneda[moneda].totalInstrumentos += importeI;
                    } else {
                        totalesPorMoneda[moneda].totalSalidaSinPunto += importe;
                    }
                }
            });

            // Calculamos Efectivo por moneda
            for (let moneda in totalesPorMoneda) {
                const m = totalesPorMoneda[moneda];
                m.EfectivoSinPunto = m.totalSinPunto - m.totalInstrumentos + m.totalSalidaSinPunto;
                m.EfectivoConPunto = m.totalConPunto + m.totalSalidaConPunto;
            }

            // Guardamos en el state
            setValoresCalculados({
                totalesPorMoneda,
                cantidad: rows.length
            });

        }
    }, [rows, onClose]);

    const [cantidades, setCantidades] = useState({ ARS: {}, USD: {} });


    const handleCloseSnackbar = () => setSnackbar(null);

    const handleChange = (label, e) => {
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
    // const [cantidades, setCantidades] = useState({});
    // Calcular el total de billetes ingresados para esta moneda
    const totalCalculado = useMemo(() => {
        if (!moneda) return 0; // si todavía no llegó la moneda
        return billetes
            .filter(b => b.BilletesMoneda === moneda)
            .reduce((acc, b) => {
                const cantidad = Number(cantidades[moneda]?.[b.label] || 0);
                const valorBillete = Number(b.label); // asumo que el label es el valor numérico
                return acc + cantidad * valorBillete;
            }, 0);
    }, [billetes, moneda, cantidades]);
    const codigoMoneda = moneda === "ARS" ? "ARS" : moneda === "USD" ? "USD" : "ARS";

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

    return (
        <Dialog open={true}
            onClose={onClose}
            maxWidth="xl"

            // "lg" // o "lg" si no querés tan grande
            fullWidth >
            <DialogTitle>Cierre de Caja</DialogTitle>
            <DialogContent>



                {valoresCalculados && valoresCalculados.totalesPorMoneda && (
                    <Box display="flex" gap={4}>
                        {Object.entries(valoresCalculados.totalesPorMoneda).map(([moneda, datos]) => (
                            <Box key={moneda} display="flex" flexDirection="column" gap={1}>
                                <Typography
                                    variant="body1"
                                    component="div"
                                    style={{
                                        color: '#000',
                                        fontFamily: 'Georgia, serif',
                                        fontWeight: 500,
                                        fontStyle: 'bold',
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

                                {/* Sección de billetes para esta moneda */}
                                <Box
                                    mt={2}
                                    display="grid"
                                    gridTemplateColumns="repeat(5, 1fr)"
                                    gap={2}
                                >
                                    {billetes
                                        .filter(b => b.BilletesMoneda === moneda) // Filtramos los billetes de esta moneda
                                        .map(({ label }) => (
                                            <TextField
                                                key={`${moneda}-${label}`}
                                                label={`${label} ${moneda}`}
                                                type="number"
                                                value={cantidades[moneda]?.[label] || ""}
                                                onChange={(e) => handleChangeBilletes(moneda, label, e)}
                                            // onChange={handleChangeBilletes(moneda, label, key)}
                                            />
                                        ))}
                                </Box>
                                <Typography mt={2}>
                                    Total contado: {totalCalculado.toLocaleString("es-AR", { style: "currency", currency: moneda })}
                                </Typography>
                                <Typography>
                                    Total esperado: {totalEfectivoMoneda.toLocaleString("es-AR", { style: "currency", currency: moneda })}
                                </Typography>
                                <Typography color={totalCalculado === totalEfectivoMoneda ? "green" : "red"}>
                                    Diferencia: {(totalCalculado - totalEfectivoMoneda).toLocaleString("es-AR", { style: "currency", currency: moneda })}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                )}

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


{/* {valoresCalculados && (

                    <Box display="flex" gap={4}>
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
                            <TextoPesos label="Salida" value={valoresCalculados.totalSalidaConPunto} color="#ff5722" />
                            <TextoPesos label="Efectivo" value={valoresCalculados.EfectivoConPunto} color="#ff5722" />
                        </Box>

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

                        {saldoEf.length > 0 && (
                            <Box display="flex" flexDirection="column" gap={1}>
                                <TextoPesos label="Saldo anterior:" value={saldoEf[0].CajaSaldoEfImporte} color="#0611a7" />
                                <TextoPesos label="Total efectivo con saldo:" value={totalConSaldo} color="#0611a7" fontSize='1.25rem' />
                            </Box>
                        )}
                    </Box>
                )}

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

                {false && (
                    <Box mt={2}>
                        <TextFieldComunChico
                            label="Total efectivo en caja:"
                            type="number"
                            value={totalEfectivoEnCaja}
                            onChange={(e) => handleChange("TotalEfectivo", e)}
                        />
                    </Box>)}*/}

//     rows.forEach((row, index) => {
//         console.log('row', row)
//         console.log('row.CajaIEMoneda', row.CajaIEMoneda)
//         const importe = parseFloat(row.CajaIEImporte) || 0;
//         const importeI = parseFloat(row.CajaIEImpIP) || 0;
//         const moneda = row.CajaIEMoneda;
//         if (moneda === 'DLS') {
//             totalDolar += importe;
//         }
//         if (moneda === 'ERO') {
//             totalEuro += importe;
//         }
//         if (moneda === 'PES') {
//             totalPesos += importe;
//         }
//     });
//     console.log('totalDolar', totalDolar)
//     console.log('totalEuro', totalEuro)
//     console.log('totalPesos', totalPesos)
//     let totalDolarEfectivo = totalDolar - totalPesos + totalSalidaSinPunto;
//     let totalEuroEfectivo = totalEuro + totalPesos;

//     // setValoresCalculados({
//     //     totalConPunto,
//     //     totalSinPunto,
//     //     totalInstrumentos,
//     //     EfectivoSinPunto,
//     //     EfectivoConPunto,
//     //     totalSalidaConPunto,
//     //     totalSalidaSinPunto,
//     //     cantidad: rows.length,
//     //     totalDolarEfectivo,
//     //     totalEuroEfectivo
//     // });
//     rows.forEach((row) => {
//         const importe = parseFloat(row.CajaIEImporte) || 0;
//         const importeI = parseFloat(row.CajaIEImpIP) || 0;

//         // Total con/sin punto
//         if (row.CajaIEPunto === "S") {
//             if (importe > 0) {
//                 totalConPunto += importe;
//             } else {
//                 totalSalidaConPunto += importe;
//             }
//         } else {
//             if (importe > 0) {
//                 totalSinPunto += importe;
//                 totalInstrumentos += importeI;
//             } else {
//                 totalSalidaSinPunto += importe;
//             }
//         }
//     });
//     let EfectivoSinPunto = totalSinPunto - totalInstrumentos + totalSalidaSinPunto;
//     let EfectivoConPunto = totalConPunto + totalSalidaConPunto;

//     setValoresCalculados({
//         totalConPunto,
//         totalSinPunto,
//         totalInstrumentos,
//         EfectivoSinPunto,
//         EfectivoConPunto,
//         totalSalidaConPunto,
//         totalSalidaSinPunto,
//         cantidad: rows.length
//     });

import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React, { use } from 'react'
import swal from "sweetalert";
import TextFieldComun from '../../../components/comppropios/TextFieldComun'
import { Row } from 'antd'
import { useState } from 'react';
import VerificaClave from '../../../components/lib/VerificaClave';
import { CajaInternaLeer } from './CajaInternaLeer';
import { llenarcolumns } from './columns';
import { formdata } from "./formdata.js";
import TablasContexto from '../../../context/TablasContext.jsx';
import TablaMuestra from '../../../components/TablaMuestra';
import { useEffect } from 'react';
import { CajaInternaSILeer } from './CajaInternaSILeer.jsx';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import TextFieldComunChico from '../../../components/comppropios/TextFieldComunChico.jsx';
import { CajaInternaSumTot } from './CajaInternaSumTot.jsx';
export default function CajaInterna({ open, handleClose }) {
    const { formdatos, setFormdatos } = use(TablasContexto);
    const [usuario, setUsuario] = useState('');
    const [Clave, setClave] = useState('');
    const [columns, setColumns] = useState([]);
    const [abretabla, setAbretabla] = useState(false);
    const [rows, setRows] = useState([]);
    const [saldoIncial, setSaldoIncial] = useState(0);
    const handleChange = (value, id) => {
        if (id === "Usuario") {
            setUsuario(value);
        }
        if (id === "Clave") {
            setClave(value);
        }

    };

    async function leeSaldoInicial() {
        const data = await CajaInternaSILeer();
        setSaldoIncial(data[0]);
        leeSumaTot();

    }

    async function leeSumaTot() {
        let anioactual = new Date().getFullYear();
        let fechadesde = new Date(anioactual, 3, 1);
        let fechahasta = new Date(anioactual + 1, 2, 31);
        const data = await CajaInternaSumTot(fechadesde, fechahasta);

    }
    async function Verificacion() {
        const data = await VerificaClave({ usuario, Clave });
        if (data) {
            leeSaldoInicial();

            const cols = await llenarcolumns();
            setColumns(cols);
            const datosci = await CajaInternaLeer();
            setRows(datosci);
            setFormdatos(formdata);
            setAbretabla(true);
        } else {
            swal({
                title: "Error",
                text: "Clave o Usuario equivocado",
                icon: "error",
                button: "OK",
                dangerMode: true,
            });
        }
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
            >
                <DialogTitle>Ingreso a la Caja Interna</DialogTitle>
                <DialogContent >
                    <Box
                        sx={{
                            width: 500,
                            height: 80,
                            borderRadius: 1,
                            borderColor: "primary.main",
                            borderWidth: 1,
                            borderStyle: "solid",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: "20px",

                        }}
                    >
                        <TextFieldComun
                            id="Usuario"
                            type="text"
                            label="Usuario"
                            value={usuario}
                            onChange={handleChange}
                            width="100px"
                        />
                        <TextFieldComun
                            id="Clave"
                            type="password"
                            label="Clave de Ingreso"
                            value={Clave}
                            onChange={handleChange}
                            width="100px"
                        />
                        <Button onClick={Verificacion}>OK</Button>
                    </Box>

                </DialogContent>

            </Dialog >
            <Dialog
                open={abretabla}
                onClose={() => setAbretabla(false)}
                maxWidth={false}
                fullWidth={true}

            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    Ingreso a la Caja Interna
                    <CancelTwoToneIcon
                        sx={{ color: "red", fontSize: 30, cursor: "pointer" }}
                        titleAccess="Cerrar"
                        onClick={() => {
                            setAbretabla(false);
                            handleClose();
                        }}
                    />
                </DialogTitle>

                <DialogContent >
                    <TablaMuestra
                        rows1={rows}
                        columns1={columns}
                        formdatos={formdatos}
                    ></TablaMuestra>
                </DialogContent>
            </Dialog>
        </>

    )
}

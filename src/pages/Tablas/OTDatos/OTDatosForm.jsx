import React from 'react'
import { OTDatosLee } from "./OTDatosLee.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { useContext } from "react";
import StaticContexto from "../../../context/StaticContext.jsx";
import PresupPant from "../../../context/PresupPant.jsx";
import FilaUnoIzq from "../../Presupuesto/LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import { TextField } from '@mui/material';
import { formdata } from "./formdata.js";
import TablaMuestra from '../../../components/TablaMuestra.jsx';
export default function OTDatosForm() {
    const { valor, setValor } = useContext(StaticContexto);
    const { state, setState } = useContext(PresupPant);

    const [formdatos, setFormdatos] = useState(formdata);
    const [datosacargar, setDatosaCargar] = useState('');
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    async function columnsFetch() {
        var col = await llenarcolumns();
        setColumns(() => col);
    }
    async function leeotdatos(descripcion) {
        const result = await OTDatosLee(descripcion);
        console.log('result', result);
        setRows(result);
    }
    async function initialFetch() {
        columnsFetch();
        leeotdatos();
    }
    useEffect(() => {
        setValor("OTDatos");

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log('esta en useEffect', state.PresupConfTipoDesc)
        if (state.PresupConfTipoDesc !== '') {
            leeotdatos(state.PresupConfTipoDesc);
            initialFetch();
            setFormdatos(formdata);
        }

    }, [state.PresupConfTipoDesc]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div>
            <FilaUnoIzq />
            {rows.length !== 0 &&
                <TablaMuestra
                    rows1={rows}
                    columns1={columns}
                    formdatos={formdatos}
                ></TablaMuestra>}
            {/* <TablaMuestra
                rows1={rows}
                columns1={columns}
                formdatos={formdata}
            ></TablaMuestra> */}


        </div>
    )
}

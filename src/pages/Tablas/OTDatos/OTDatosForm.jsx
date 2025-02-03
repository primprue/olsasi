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
        console.log('descripcion', descripcion)
        const result = await OTDatosLee(descripcion);
        console.log('result', result)
        setDatosaCargar(result);
    }
    async function initialFetch() {
        columnsFetch();
        leeotdatos();
    }
    useEffect(() => {
        setValor("OTDatos");

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log('state.PresupConfTipoDesc en useEffect', state.PresupConfTipoDesc)
        if (state.PresupConfTipoDesc !== '') {
            leeotdatos(state.PresupConfTipoDesc);
            // initialFetch();
            setFormdatos(formdata);
        }

    }, [state.PresupConfTipoDesc]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleChange = (id, key, value) => {
        setDatosaCargar((prevData) =>
            prevData.map((item) =>
                item.idOTDatos === id
                    ? {
                        ...item,
                        OTDatosOpciones: {
                            ...item.OTDatosOpciones,
                            [key]: value,
                        },
                    }
                    : item
            )
        );
    };
    // idOTDatos
    //     OTDatosTipoConf
    //         OTDatosConfCod
    //             OTDatosDesc: 'Ojales',
    //                 OTDatosOpciones:
    // '{"": 0, "Cada 0.50": 0, "Cada 0.70": 0, "Cada 1 mts.": 0}',
    //     OTDatosTipoPed: 'select',
    //         OTDatosRequerido: 'S',
    //             OTDatosOrdenAparicion: 1,
    //                 OTDatosAncho: null,
    //                     id: 4
    return (
        <div>
            <FilaUnoIzq />

            <h2>Editar Datos</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datosacargar.map(({ idOTDatos, OTDatosDesc, OTDatosOpciones }) => (
                        <tr key={idOTDatos}>
                            <td>{OTDatosDesc}</td>
                            <td>
                                {Object.entries(OTDatosOpciones).map(([key, value]) => (
                                    <div key={key}>
                                        <label>{key || "General"}: </label>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleChange(idOTDatos, key, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <TablaMuestra
                rows1={rows}
                columns1={columns}
                formdatos={formdata}
            ></TablaMuestra> */}


        </div>
    )
}

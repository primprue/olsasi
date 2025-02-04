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
import { DataGrid } from '@mui/x-data-grid';
import { set } from 'date-fns';
export default function OTDatosForm() {
    const { valor, setValor } = useContext(StaticContexto);
    const { state, setState } = useContext(PresupPant);

    const [formdatos, setFormdatos] = useState(formdata);
    const [datosacargar, setDatosaCargar] = useState('');
    const [rows, setRows] = useState([]);
    // const [columns, setColumns] = useState([]);
    // async function columnsFetch() {
    //     var col = await llenarcolumns();
    //     setColumns(() => col);
    // }
    async function leeotdatos(descripcion) {
        const result = await OTDatosLee(descripcion);
        // setDatosaCargar(result);
        setRows(procesarDatos(result));
    }
    // async function initialFetch() {
    //     // columnsFetch();
    //     leeotdatos();
    // }
    useEffect(() => {
        setValor("OTDatos");

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (state.PresupConfTipoDesc !== '') {
            leeotdatos(state.PresupConfTipoDesc);
            // initialFetch();
            setFormdatos(formdata);
        }

    }, [state.PresupConfTipoDesc]); // eslint-disable-line react-hooks/exhaustive-deps


    const procesarDatos = (data) => {
        if (data !== '') {

            console.log('data', data)
            // return data.map((item) =>
            return data.flatMap((item) =>
                Object.entries(JSON.parse(item.OTDatosOpciones)).map(([clave, valor]) => ({
                    // id: `${item.idOTDatos}`, // ID único

                    id: `${item.idOTDatos}-${clave}`, // ID único
                    descripcion: item.OTDatosDesc,
                    opcion: clave,
                    valor: valor,
                    aparicion: item.OTDatosOrdenAparicion
                }))

            );
        }
    };




    const columns = [
        { field: "id", headerName: "id", width: 200 },
        { field: "aparicion", headerName: "OTDatosOrdenAparicion", width: 200 },
        {
            field: "descripcion", headerName: "descripcion", width: 200,
            renderCell: (params) => {
                const rowIndex = params.api.getAllRowIds().indexOf(params.id);
                // Si no es la primera vez que aparece la categoría, la celda queda vacía
                if (rowIndex > 0 && rows[rowIndex - 1].descripcion === params.value) {
                    return null; // Celda vacía para las filas repetidas
                }
                return <strong>{params.value}</strong>;
            },
        },
        { field: "opcion", headerName: "opcion", width: 150, editable: true },
        { field: "valor", headerName: "valor", width: 100, editable: true },
    ];


    const handleProcessRowUpdate = (updatedRow) => {
        setRows(rows.map((row) => (row.id === updatedRow.id ? updatedRow : row)));
        return updatedRow;
    };
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
        <div style={{ marginTop: "20px", marginLeft: "20px" }}>
            <FilaUnoIzq />
            {rows && rows.length > 0 &&
                <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={handleProcessRowUpdate}
                    pageSize={5}
                />
            }
            <h2>Editar Datos</h2>



        </div>
    )
}

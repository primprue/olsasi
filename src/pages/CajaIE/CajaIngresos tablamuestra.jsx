

import { use, useEffect, useState } from "react";
import { CajaIELeer } from "./CajaIELeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import TablaMuestra from "../../components/TablaMuestra.jsx";
import TablasContexto from "../../context/TablasContext.jsx";
import { formdata } from "./formdata.js";
export default function CajaIngresos() {
    const { formdatos, setFormdatos } = use(TablasContexto);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    async function columnsFetch() {
        let col = await llenarcolumns();

        // // Aseguramos que todas las columnas sean editables
        // col = col.map(c => ({
        //     ...c,
        //     editable: true // Esto habilita la edición de celdas
        // }));

        setColumns(() => col);
    }

    async function dataFetch() {
        const data = await CajaIELeer();
        setRows(data);
    }


    async function initialFetch() {
        await columnsFetch();
        await dataFetch();
    }

    useEffect(() => {
        initialFetch();
        setFormdatos(formdata);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <TablaMuestra
                rows1={rows}
                columns1={columns}
                formdatos={formdatos}
            ></TablaMuestra>
        </>

    );

}

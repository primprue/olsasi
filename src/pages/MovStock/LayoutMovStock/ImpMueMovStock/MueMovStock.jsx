import { MovStockLeer } from "./MovStockLeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
// import StaticContexto from "../../../context/StaticContext.jsx";
import TablasContexto from "../../../../context/TablasContext.jsx";
import { formdata } from "./formdata.js";

import TablaMuestra from "../../../../components/TablaMuestra.jsx";
import { Button, Dialog, DialogContent } from "@mui/material";
export default function MueMovStock({ open, handleClose }) {

    const { formdatos, setFormdatos } = use(TablasContexto);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    //empiezan las cosas del sistema
    async function columnsFetch() {
        var col = await llenarcolumns();
        setColumns(() => col);
    }
    async function dataFetch() {
        const data = await MovStockLeer();
        setRows(data);
    }
    async function initialFetch() {
        columnsFetch();
        dataFetch();
    }
    useEffect(() => {
        initialFetch();
        setFormdatos(formdata);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth={true}
            // sx={{
            //     backgroundColor: colorfondo,
            // }}
            >
                <DialogContent>
                    <Button onClick={handleClose}>Cierra</Button>
                    <TablaMuestra
                        rows1={rows}
                        columns1={columns}
                        formdatos={formdatos}
                    ></TablaMuestra>
                </DialogContent>
            </Dialog>
        </>
    );
}

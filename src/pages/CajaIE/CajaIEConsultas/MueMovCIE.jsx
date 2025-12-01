import { BuscaIE } from "./BuscaIE.jsx";
import { llenarcolumns } from "../columns.jsx";
import { useState } from "react";

import { use } from "react";
import TablasContexto from "../../../context/TablasContext.jsx";

import TablaMuestra from "../../../components/TablaMuestra.jsx";
import { Button, Dialog, DialogContent } from "@mui/material";
import { Row } from "antd";
import { format } from "date-fns";
import TextFieldComun from "../../../components/comppropios/TextFieldComun.jsx";
export default function MueMovCIE({ open, handleClose }) {

    const { formdatos, setFormdatos } = use(TablasContexto);

    const FechaHoy = format(new Date(), "yyyy-MM-dd");
    const [FechaDesde, setFechaDesde] = useState(FechaHoy);
    const [FechaHasta, setFechaHasta] = useState(FechaHoy);

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    //empiezan las cosas del sistema
    async function columnsFetch() {
        var col = await llenarcolumns();
        setColumns(() => col);
    }
    async function dataFetch() {

        const data = await BuscaIE({ FechaDesde, FechaHasta });
        setRows(data);
    }
    async function initialFetch() {
        columnsFetch();
        dataFetch();
    }


    const handleChange = (value, id) => {
        if (id === "FechaDesde") {
            setFechaDesde(value);
        }
        if (id === "FechaHasta") {
            setFechaHasta(value);
        }

    };
    // useEffect(() => {
    //     initialFetch();
    //     setFormdatos(formdata);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth={true}
            >
                <DialogContent>
                    <Row>
                        <TextFieldComun
                            id="FechaDesde"
                            type="date"
                            label="Fecha desde"
                            value={FechaDesde}
                            onChange={handleChange}
                            width="150px"
                        />

                        <TextFieldComun
                            id="FechaHasta"
                            type="date"
                            label="Fecha hasta"
                            value={FechaHasta}
                            onChange={handleChange}
                            width="150px"
                        />
                    </Row>

                    <Button onClick={initialFetch}>OK</Button>
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

import React, { useState, useEffect } from "react";

import { DialogContent, Dialog, DialogTitle } from "@mui/material";
// Dialogfrom, , Slide
import {
    DataGrid,

} from "@mui/x-data-grid";
import BotonEstilo from "../../../Styles/Boton.module.css";
import { set } from "date-fns";
// const Transition = React.forwardRef(function Transition(props, ref) {
// 	return <Slide direction="up" ref={ref} {...props} />;
// });

export default function CajaInternaSumatoria(props) {
    console.log('props  ', props)
    // { CajaInternaMoneda: 'ARS', 
    // TotalEntradaM: '49039410.00', 
    // TotalSalidaM: '35124451.00', 
    // TotalEntradaT: '9789141.30', 
    // TotalSalidaT: '15322597.00' }
    const { datadesuma, open, handleClose } = props;
    const [cajaint, setCajaint] = useState({
        columns: [
            {
                headerName: "id",
                field: "id",
                width: 50,
            },
            {
                headerName: "Moneda",
                field: "CajaInternaMoneda",
                headerClassName: "encabcolumns",
                width: 250,
                align: "left",
            },
            {
                headerName: "Entrada M",
                field: "TotalEntradaM",
                type: "numeric",
                headerClassName: "encabcolumns",
                width: 100,
                align: "right",
            },
            {
                headerName: "Salida M",
                field: "TotalSalidaM",
                type: "numeric",
                headerClassName: "encabcolumns",
                width: 100,
                align: "right",
            },
            {
                headerName: "Entrada T",
                field: "TotalEntradaT",
                type: "numeric",
                headerClassName: "encabcolumns",
                width: 100,
                align: "right",
            },
            {
                headerName: "Salida T",
                field: "TotalSalidaT",
                type: "numeric",
                headerClassName: "encabcolumns",
                width: 100,
                align: "right",
            },
        ],

    });



    return (
        <Dialog
            open={open}
            // TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Stock de Items</DialogTitle>
            <DataGrid
                sx={{
                    height: 600,
                    width: "100%",
                    "& .encabcolumns": {
                        backgroundColor: "rgba(235, 240, 241, 0.3)",
                        textJustify: "center",
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "rgba(15, 6, 145, 1)",
                        borderRadius: 1,
                        boxShadow: 3,
                        bgcolor: "rgba(235, 240, 241, 0.3)",
                        height: 10,
                    },
                }}
                title="Stock"
                columns={cajaint.columns}
                rows={datadesuma}
            />

            <button onClick={handleClose} className={BotonEstilo.botoncerrar}>
                Cerrar
            </button>
        </Dialog>
    );
}

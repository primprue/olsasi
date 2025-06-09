import React, { useState } from 'react'
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button, Dialog, DialogContent } from '@mui/material';


export default function ImpStockReal({ datositems, open, handleClose, onClick, ...other }) {

    const FechaHoy = format(new Date(), "dd/MM/yyyy");
    const [pdfData, setPdfData] = useState(null);
    const formatdosdecimales = (value) => {
        return Number(value).toFixed(2);
    };

    async function creaPDF() {


        let y = 32
        const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });


        doc.setFontSize(12);

        doc.text(`Stock Real de  ${datositems[0].GrupoDesc} -- ${datositems[0].StkRubroDesc}`, 10, 10);
        doc.text(`Proveedor: ${datositems[0].ProveedoresDesc}  Fecha: ${FechaHoy}`, 20, 20);
        // Establecer el color del borde (RGB)
        doc.setDrawColor(0, 0, 0); // Negros

        var colconf = [
            { title: "Descripción", halign: "left" },
            { title: "Stock ", halign: "left" },
            { title: "Vendido", halign: "left" },
            { title: "Stock Disp", halign: "left" },
        ];

        doc.autoTable({
            startY: y,
            head: [colconf],
            // body: rows,
            body: datositems.map((row) => [
                { content: row.StkItemsDesc, styles: { halign: "left" } }, // Alineación a la izquierda
                { content: row.StkItemsCantidad, styles: { halign: "left" } }, // Alineación a la derecha
                { content: formatdosdecimales(row.StkItemsCantidad - row.StkItemsCantDisp), styles: { halign: "right" } }, // Alineación a la derecha
                { content: row.StkItemsCantDisp, styles: { halign: "right" } }, // Alineación a la derecha
            ]),
            theme: "grid", // O prueba con otros temas si es necesario
            styles: {
                textColor: [0, 0, 0], // Color del texto
                fillColor: [255, 255, 255], //Color de fondo para las celdas
                overflow: "linebreak", // Ajustar el texto largo
                cellPadding: 1, // Ajustar el relleno de las celdas
                fontSize: 10, // Ajustar el tamaño de la fuente
            },
            headStyles: {
                textColor: [0, 0, 0], // Color del texto
                fillColor: [255, 255, 255], //Color de fondo para las celdas
                cellPadding: 1, // Ajustar el relleno de las celdas
                lineWidth: 0.1, // Ancho de las líneas (bordes)
                lineColor: [0, 0, 0],
                fontStyle: "bold", // Estilo de la fuente en la cabecera
            },
            margin: { top: 10, left: 10, right: 10, bottom: 10 }, // Ajustar márgenes si es necesario
        });

        const dataUri = doc.output("dataurlstring");
        setPdfData(dataUri);
    }

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
                {/* <Button onClick={creaPDF}>Genera</Button> */}
                <DialogContent>
                    <Button onClick={creaPDF}>Genera</Button>
                    <Button onClick={handleClose}>Cierra</Button>
                    {pdfData && (
                        <iframe
                            src={pdfData}
                            width="100%"
                            height="1200px"
                            style={{ border: "none" }}
                            title="PDF Preview"
                        ></iframe>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

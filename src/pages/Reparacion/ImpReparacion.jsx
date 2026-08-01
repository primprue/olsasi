import React, { useContext, useState, useRef, useEffect } from "react";

import jsPDF from "jspdf";
import "jspdf-autotable";
//react-pdf
import { StyleSheet } from "@react-pdf/renderer";
import { Button, Dialog, DialogContent } from "@mui/material";


export default function ImpReparacion(props) {

	const { open,
		handleClose,
		rowsvarios,
		rowschicotes,
		rowsMot1,
		rowsMot2,
		rowsparcheleg,
		sumaVarios,
		sumaParcheleg,
		sumaChicotes,
		sumaMot1,
		sumaMot2,
		ImpTotalRep,
		nomCliente } = props;
	const [pdfData, setPdfData] = useState(null);
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		}).format(value);
	};
	let numeromayor = Math.max(rowsvarios.length, rowschicotes.length, rowsparcheleg.length)
	if (numeromayor === 1) numeromayor = 3

	const sendPDFViaWebSocket = (pdfData, nombrearch) => {
		const socket = new WebSocket("ws://localhost:3000");
		const payload = {
			action: "save",
			nombrearch: nombrearch,
			pdfData: pdfData,
		};
		socket.onopen = () => {
			socket.send(JSON.stringify(payload));
		};

		socket.onmessage = (event) => {
			socket.close();
		};
	};
	const agregarCeros = (numero, digitos) => {
		return numero.toString().padStart(digitos, "0");
	};
	async function creaPDF() {
		var rows = [];
		var rows1 = [];
		var doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

		//     // Dibuja una línea: (x1, y1, x2, y2)
		// doc.line(10, 10, 100, 10); // Línea horizontal
		// doc.line(10, 10, 10, 100); // Línea vertical
		// line(x1, y1, x2, y2):
		// x1, y1: Coordenadas iniciales de la línea.
		// 	x2, y2: Coordenadas finales de la línea.


		doc.setFontSize(12)
		doc.setFont("arial", "normal");
		doc.text(`Rep. de: `.padEnd(10, " "), 10, 10);
		doc.setFont("times", "italic");
		doc.text(nomCliente, 27, 10);
		doc.setFontSize(11);
		doc.line(8, 13, 58, 13);
		// doc.rect(62, 6, 60, 6, "S");
		doc.text(`Importe c/IVA :`.padEnd(20, " ") + ` ${formatCurrency(ImpTotalRep)}`, 80, 14);

		doc.line(79, 15, 129, 15);
		doc.text(`Importe s/IVA :`.padEnd(20, " ") + ` ${formatCurrency(ImpTotalRep / 1.21)}`, 143, 14);
		doc.line(142, 15, 192, 15);
		// Establecer el color del borde (RGB)
		doc.setDrawColor(0, 0, 0); // Negro

		doc.setFont("arial", "bold");
		//	x mueve horizontal es como la x de un gráfico
		doc.setFontSize(8);
		let y = 18;
		let x = 0
		let ancho = 60; // Ancho del recuadro
		let alto = 4;
		// let dencliente = arregloencab[0].idClientes;
		// dencliente = dencliente.slice(0, 30);
		y += 4;
		x = 9;
		let columnStyles = {
			0: { cellWidth: 8 }, // Ancho de la primera columna
			1: { cellWidth: 15 }, // Ancho de la segunda columna
			2: { cellWidth: 20 }, // Ancho de la tercera columna
			3: { cellWidth: 20 }, // Ancho de la tercera columna
		};
		if (sumaParcheleg !== 0) {
			doc.rect(x, y - 5, ancho, alto, "S");
			doc.text(`Parches`.padEnd(35, " ") + `${formatCurrency(sumaParcheleg)}`, x + 2, y - 2);
			var colconf = [
				{ title: "Cant", halign: "left" },
				{ title: "Medida", halign: "left" },
				{ title: "Imp.Unit", halign: "center" },
				{ title: "Imp.Total", halign: "center" },
			];

			doc.autoTable({
				startY: y,
				head: [colconf],
				// body: rows,
				columnStyles: columnStyles,
				body: rowsparcheleg.map((row) => [
					{ content: row.cantparche, styles: { halign: "left" } }, // Alineación a la izquierda
					{ content: row.medparche, styles: { halign: "left" } }, // Alineación a la derecha
					{
						content: formatCurrency(row.impparche),
						styles: { halign: "right" },
					}, // Alineación a la derecha
					{
						content: formatCurrency(row.imptparche),
						styles: { halign: "right" },
					}, // Alineación a la derecha
				]),
				theme: "grid", // O prueba con otros temas si es necesario
				styles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					overflow: "linebreak", // Ajustar el texto largo
					cellPadding: 1, // Ajustar el relleno de las celdas
					fontSize: 8, // Ajustar el tamaño de la fuente
				},
				headStyles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					cellPadding: 1, // Ajustar el relleno de las celdas
					lineWidth: 0.1, // Ancho de las líneas (bordes)
					lineColor: [0, 0, 0],
					fontStyle: "bold", // Estilo de la fuente en la cabecera
				},
				margin: { top: 10, left: 8, right: 8, bottom: 10 }, // Ajustar márgenes si es necesario

			});
		}

		if (sumaChicotes !== 0) {
			x += 68
			doc.rect(x, y - 5, ancho, alto, "S");
			doc.text(`Chicotes`.padEnd(45, " ") + `${formatCurrency(sumaChicotes)}`, x + 2, y - 2);
			var colchi = [
				{ title: "Cant", halign: "left" },
				{ title: "Mts", halign: "left" },
				{ title: "Imp.Unit", halign: "center" },
				{ title: "Imp.Total", halign: "center" },
			];

			doc.autoTable({
				startY: y,
				startX: x,
				head: [colchi],
				columnStyles: columnStyles,
				body: rowschicotes.map((row) => [
					{ content: row.cantchicote, styles: { halign: "left" } }, // Alineación a la izquierda
					{ content: row.medchicote, styles: { halign: "left" } }, // Alineación a la derecha
					{
						content: formatCurrency(row.impchicote),
						styles: { halign: "right" },
					}, // Alineación a la derecha
					{
						content: formatCurrency(row.imptchicote),
						styles: { halign: "right" },
					}, // Alineación a la derecha
				]),
				theme: "grid", // O prueba con otros temas si es necesario
				styles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					overflow: "linebreak", // Ajustar el texto largo
					cellPadding: 1, // Ajustar el relleno de las celdas
					fontSize: 8, // Ajustar el tamaño de la fuente
				},
				headStyles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					cellPadding: 1, // Ajustar el relleno de las celdas
					lineWidth: 0.1, // Ancho de las líneas (bordes)
					lineColor: [0, 0, 0],
					fontStyle: "bold", // Estilo de la fuente en la cabecera
				},
				margin: { left: x },
			});
		}
		if (sumaVarios !== 0) {
			x += 68
			doc.rect(x, y - 5, ancho - 20, alto, "S");
			doc.text(`Varios`.padEnd(25, " ") + `${formatCurrency(sumaVarios)}`, x + 2, y - 2);
			var varios = [
				{ title: "Cant", halign: "left" },
				{ title: "Imp.Unit", halign: "center" },
				{ title: "Imp.Total", halign: "center" },
			];

			doc.autoTable({
				startY: y,
				head: [varios],
				columnStyles: columnStyles,
				body: rowsvarios.map((row) => [
					{ content: row.cantvarios, styles: { halign: "left" } }, // Alineación a la izquierda
					{
						content: formatCurrency(row.impvarios),
						styles: { halign: "right" },
					}, // Alineación a la derecha
					{
						content: formatCurrency(row.imptvarios),
						styles: { halign: "right" },
					}, // Alineación a la derecha
				]),
				theme: "grid", // O prueba con otros temas si es necesario
				styles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					overflow: "linebreak", // Ajustar el texto largo
					cellPadding: 1, // Ajustar el relleno de las celdas
					fontSize: 8, // Ajustar el tamaño de la fuente
				},
				headStyles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					cellPadding: 1, // Ajustar el relleno de las celdas
					lineWidth: 0.1, // Ancho de las líneas (bordes)
					lineColor: [0, 0, 0],
					fontStyle: "bold", // Estilo de la fuente en la cabecera
				},
				margin: { left: x },
			});
		}
		y = numeromayor * 10 + y + 3
		if (sumaMot1 !== 0) {
			ancho = 52
			x = 9;
			doc.rect(x, y - 5, ancho, alto, "S");
			doc.text(`MOT 1 persona`.padEnd(30, " ") + `${formatCurrency(sumaMot1)}`, x + 2, y - 2);
			var colmot1 = [
				{ title: "Desde", halign: "left" },
				{ title: "Hasta", halign: "left" },
				{ title: "Hora", halign: "center" },
				{ title: "Min.", halign: "center" },
			];
			let columnStyles1 = {
				0: { cellWidth: 12 }, // Ancho de la primera columna
				1: { cellWidth: 12 }, // Ancho de la segunda columna
				2: { cellWidth: 15 }, // Ancho de la tercera columna
				3: { cellWidth: 15 }, // Ancho de la tercera columna
			};
			doc.autoTable({
				startY: y,
				head: [colmot1],
				// body: rows,
				columnStyles: columnStyles1,
				body: rowsMot1.map((row) => [
					{ content: row.mot1desde, styles: { halign: "left" } }, // Alineación a la izquierda
					{ content: row.mot1hasta, styles: { halign: "left" } }, // Alineación a la derecha
					{ content: parseInt(row.horamot1), styles: { halign: "right" }, }, // Alineación a la derecha
					{ content: parseInt(row.minutmot1), styles: { halign: "right" }, }, // Alineación a la derecha
				]),
				theme: "grid", // O prueba con otros temas si es necesario
				styles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					overflow: "linebreak", // Ajustar el texto largo
					cellPadding: 1, // Ajustar el relleno de las celdas
					fontSize: 8, // Ajustar el tamaño de la fuente
				},
				headStyles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					cellPadding: 1, // Ajustar el relleno de las celdas
					lineWidth: 0.1, // Ancho de las líneas (bordes)
					lineColor: [0, 0, 0],
					fontStyle: "bold", // Estilo de la fuente en la cabecera
				},
				margin: { left: x },
				// margin: { top: 10, left: 8, right: 8, bottom: 10 }, // Ajustar márgenes si es necesario

			});
		}
		if (sumaMot2 !== 0) {
			ancho = 52
			x += 68;
			doc.rect(x, y - 5, ancho, alto, "S");
			doc.text(`MOT 2 personas`.padEnd(30, " ") + `${formatCurrency(sumaMot2)}`, x + 2, y - 2);
			var colmot2 = [
				{ title: "Desde", halign: "left" },
				{ title: "Hasta", halign: "left" },
				{ title: "Hora", halign: "center" },
				{ title: "Min.", halign: "center" },
			];
			let columnStyles2 = {
				0: { cellWidth: 12 }, // Ancho de la primera columna
				1: { cellWidth: 12 }, // Ancho de la segunda columna
				2: { cellWidth: 15 }, // Ancho de la tercera columna
				3: { cellWidth: 15 }, // Ancho de la tercera columna
			};
			doc.autoTable({
				startY: y,
				head: [colmot2],
				// body: rows,
				columnStyles: columnStyles2,
				body: rowsMot2.map((row) => [
					{ content: row.mot2desde, styles: { halign: "left" } }, // Alineación a la izquierda
					{ content: row.mot2hasta, styles: { halign: "left" } }, // Alineación a la derecha
					{ content: parseInt(row.horamot2), styles: { halign: "right" }, }, // Alineación a la derecha
					{ content: parseInt(row.minutmot2), styles: { halign: "right" }, }, // Alineación a la derecha
				]),
				theme: "grid", // O prueba con otros temas si es necesario
				styles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					overflow: "linebreak", // Ajustar el texto largo
					cellPadding: 1, // Ajustar el relleno de las celdas
					fontSize: 8, // Ajustar el tamaño de la fuente
				},
				headStyles: {
					textColor: [0, 0, 0], // Color del texto
					fillColor: [255, 255, 255], //Color de fondo para las celdas
					cellPadding: 1, // Ajustar el relleno de las celdas
					lineWidth: 0.1, // Ancho de las líneas (bordes)
					lineColor: [0, 0, 0],
					fontStyle: "bold", // Estilo de la fuente en la cabecera
				},
				margin: { left: x },

			});
		}
		const dataUri = doc.output("dataurlstring");
		setPdfData(dataUri);
		const pdfData = doc.output("datauristring");
		const nombrearch = `Reparacion.pdf`;
		sendPDFViaWebSocket(pdfData, nombrearch);
	}

	useEffect(() => {
		creaPDF()
	}, [])// eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				// fullScreen
				maxWidth={false}
				fullWidth={true}

			>
				<DialogContent>
					{/* <Button onClick={creaPDF}>Imprime</Button> */}
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
	);
}

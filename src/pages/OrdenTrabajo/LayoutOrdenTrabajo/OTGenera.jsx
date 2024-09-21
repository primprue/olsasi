import React, { useContext, useState, useRef } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import IpServidor from "../../VariablesDeEntorno.js";
import { Button, Dialog, DialogContent } from "@mui/material";
import { format } from "date-fns";
import { CampoMuestra } from "./CampoMuestra.jsx";
import { CampoEncab } from "./CamposEncab.jsx";
import { OTGrabar } from "./OTGrabar.jsx";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField.jsx";
import EstTF from "../../../Styles/TextField.module.css";

import html2canvas from "html2canvas";
import { parse } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
//react-pdf
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "row",
		backgroundColor: "#E4E4E4",
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
	},
});
export default function OTGenera(props) {
	const { open, handleClose, datospot, renglondef } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	//trae las caracteristicas de lo que se presupuesto y los renglonespresup
	const { inicializaOT } = useContext(OrdTrabajo);

	const [pdfData, setPdfData] = useState(null);
	const [numeroOT, setNumeroOT] = useState(0);
	let colorfondo = "";
	const arreglodef = [];
	const arregloencab = [];
	let i = 0;
	const formatCurrency = (value) => {
		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		}).format(value);
	};

	for (i = 0; i < otdatos.renglonespresup.length; i++) {
		arreglodef.push(otdatos.renglonespresup[i][0]);
		if (otdatos.datosconfec) {
			if (otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
				arreglodef.push(otdatos.datosconfec);
			}
		}
	}

	const fechaUtc = parse(otdatos.FechaPromesa, "yyyy-MM-dd", new Date(), {
		timeZone: "UTC",
	});

	// Formatear la fecha
	const FechaProm = format(fechaUtc, "dd/MM/yyyy");
	const FechaHoy = format(new Date(), "dd/MM/yyyy");

	const tipoorden =
		(otdatos.datosencab[0][0].PresupEncabMayMin === "mn" && "   Minorista  ") ||
		"   Mayorista  ";

	if (otdatos.datosencab.length > 1) {
		arregloencab.push(otdatos.datosencab[1][0]);
	} else {
		arregloencab.push(otdatos.datosencab[0][0]);
	}
	let red;
	let green;
	let blue;

	if (datospot.minmay === "my") {
		red = 191;
		green = 216;
		blue = 242;
	} else {
		if (datospot.minmay === "mn" && datospot.tipopresup !== "CONFECCIONADA") {
			// colorfondo = "#ffffa6ca";

			red = 235;
			green = 244;
			blue = 129;
		} else if (
			datospot.minmay === "mn" &&
			datospot.tipopresup === "CONFECCIONADA"
		) {
			// colorfondo = "#f1f1ef4c";
			red = 252;
			green = 252;
			blue = 252;
		}
	}

	async function OTGraba() {
		const nroOT = await OTGrabar(otdatos);
		setNumeroOT(nroOT);
		// Convertir el PDF a un blob
	}
	var textoImp = "";
	var valorImp = 0.0;
	var textoImpI = "";
	var valorImpI = 0.0;
	if (otdatos.OTEncabconIVA === "N") {
		textoImpI = "Importe c/IVA";
		valorImpI = formatCurrency(0);
		textoImp = "Importe s/IVA";
		valorImp = formatCurrency(otdatos.TotalPresupuestoSIVA);
	} else {
		textoImpI = "Importe c/IVA";
		valorImpI = formatCurrency(otdatos.TotalPresupuesto);
		textoImp = "Importe s/IVA";
		valorImp = formatCurrency(otdatos.TotalPresupuestoSIVA);
	}
	var textoSeniaI = "Importe Seña";
	var valorSeniaI = formatCurrency(0.0);
	if (otdatos.ImporteSenia !== 0 && otdatos.ValorSenia !== undefined) {
		valorSeniaI = formatCurrency(otdatos.ImporteSenia);
	}

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
		// const creaPDF = () => {
		var rows = [];
		var rows1 = [];
		var doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

		// Obtener las dimensiones de la página
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();

		// Texto que formará el borde

		doc.setFontSize(14);
		doc.text(`Orden de Trabajo Nro  ${numeroOT}`, 10, 10);
		doc.setFillColor(red, green, blue);
		// Establecer el color del borde (RGB)
		doc.setDrawColor(0, 0, 0); // Negro

		// doc.rect(182, 5, 25, 8, "FD");
		doc.text(`${tipoorden}`, 180, 10);
		//	x mueve horizontal es como la x de un gráfico
		doc.setFontSize(10);
		let y = 7;
		let ancho = 40; // Ancho del recuadro
		let alto = 4;
		let dencliente = arregloencab[0].idClientes;
		// dencliente = dencliente.slice(0, 30);
		var columns = ["    Cliente  ", "Telefono", "Localidad", "CUIT"];
		var data = [
			[
				"(" + dencliente + ")" + " " + arregloencab[0].ClientesDesc,
				arregloencab[0].ClientesTel,
				arregloencab[0].ClientesLoc,
				arregloencab[0].ClientesCUIT,
			],
		];
		let x = 0;
		y += 8;
		doc.autoTable({
			startY: y,
			head: [columns],
			body: data,
			tableWidth: 190,
			theme: "grid",
			margin: { top: 5, left: 9, right: 4 },
			styles: {
				textColor: [0, 0, 0], // Color del texto
				fillColor: [255, 255, 255], //Color de fondo para las celdas
				cellPadding: 1, // Tamaño de fuente en la cabecera
				lineWidth: 0.1, // Ancho de las líneas (bordes)
				lineColor: [0, 0, 0],
				minCellHeight: 2, // Altura mínima de cada celda
				fontSize: 9.5, // Ajustar el tamaño de la fuente
			},
			bodyStyles: {
				lineWidth: 0.1, // Línea delgada en el body
				lineColor: [0, 0, 0, 0.5], // Color negro para las líneas
			},
			headStyles: {
				textColor: [0, 0, 0], // Color del texto
				fillColor: [255, 255, 255], //Color de fondo para las celdas
				cellPadding: 1, // Tamaño de fuente en la cabecera
				lineWidth: 0.1, // Ancho de las líneas (bordes)
				lineColor: [0, 0, 0],
				fontSize: 8,
				fontStyle: "bold", // Estilo de la fuente en la cabecera
			},
		});
		// Obtén la posición actual
		const lastY = doc.lastAutoTable?.finalY;
		doc.setFontSize(10);
		y += 15;
		x = 9;
		alto = 5;
		if (!otdatos.transporte || otdatos.transporte === undefined) {
			doc.text(`Transporte :                   `, x, y);
		} else {
			let textoOriginal = otdatos.transporte.TransporteDesc;
			let textoLimitado = textoOriginal.substring(0, 20); // O puedes usar slice(0, 30)

			doc.text(`Transporte : ${textoLimitado}`, x, y);
		}
		x += 68;
		doc.text(`Presup. Nro : ${otdatos.datosencab[0][0].idPresupEncab}`, x, y);
		x += 45;

		doc.text(`Fecha : ${FechaHoy}`, x + 2, y);
		x += 40;

		doc.text(` Promesa : ${FechaProm}`, x + 2, y);
		y += 5;
		x = 9;

		if (!otdatos.OTEncabOC || otdatos.OTEncabOC === undefined) {
			doc.text(`O.C. : `, x, y);
		} else {
			doc.text(`O.C. : ${otdatos.OTEncabOC}`, x, y);
		}
		x += 50;
		if (!otdatos.OTEncabDetalles || otdatos.OTEncabDetalles === undefined) {
			doc.text(`Detalles : `, x, y);
		} else {
			doc.text(`Detalles : ${otdatos.OTEncabDetalles}`, x, y);
		}
		alto = 12;
		ancho = 27;

		y += 8;
		x = 9;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text(`${textoImpI} `, x + 2, y - 1);
		doc.text(`${valorImpI}`, x + 2, y + 4);
		x += 27;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text(`${textoImp} `, x + 2, y - 1);
		doc.text(`${valorImp}`, x + 2, y + 4);
		x += 27;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text(`${textoSeniaI} `, x + 2, y - 1);
		doc.text(`${valorSeniaI}`, x + 2, y + 4);
		x += 27;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text("Remito", x + 2, y - 1);
		x += 27;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text("Fact.Cta.Cte.", x + 2, y - 1);
		x += 27;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text("Fact.Contado", x + 2, y - 1);
		x += 27;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text("Recibo", x + 2, y - 1);
		x = 9;
		y += 12;

		alto = 8;
		ancho = 189;
		doc.rect(x, y - 5, ancho, alto, "S");
		doc.text("Pago :", x + 2, y - 1);
		y += 6;

		var colconf = [
			{ title: "Cant", halign: "left" },
			{ title: "Descripción", halign: "left" },
			{ title: "Largo", halign: "left" },
			{ title: "Ancho", halign: "left" },
			{ title: "Imp.Unit", halign: "right" },
		];

		var arreglorenglon = arreglodef.filter((elemento, index1) => {
			// Agrega aquí la condición para saltar filas. Por ejemplo, saltar filas con un valor específico en una propiedad.
			// return elemento.nombrePropiedad !== 'valorParaSaltar';
			// Ejemplo: saltar filas donde una propiedad 'skip' sea verdadera
			return Object.keys(elemento).some((prop) =>
				prop.startsWith("PresupRenglon" || prop.startsWith("idrenglon"))
			);
			return !elemento.skip; // Puedes ajustar esta condición según tu necesidad
		});
		//
		doc.autoTable({
			startY: y,
			head: [colconf],
			// body: rows,
			body: arreglorenglon.map((row) => [
				{ content: row.PresupRenglonCant, styles: { halign: "left" } }, // Alineación a la izquierda
				{ content: row.PresupRenglonDesc, styles: { halign: "left" } }, // Alineación a la derecha
				{ content: row.PresupRenglonLargo, styles: { halign: "right" } }, // Alineación a la derecha
				{ content: row.PresupRenglonAncho, styles: { halign: "right" } }, // Alineación a la derecha
				{
					content: formatCurrency(row.PresupRenglonImpUnit),
					styles: { halign: "right" },
				}, // Alineación a la derecha
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

		const elementosSinPresupRenglon = arreglodef.filter(
			(elemento) =>
				!Object.keys(elemento).some((prop) => prop.startsWith("PresupRenglon"))
		);
		var coldetalles = [];
		var i = 1;
		var sumcaracteres = 0;
		var cuentaentrada = 0;

		var ytabladet = y + arreglorenglon.length * 12;
		elementosSinPresupRenglon.map((elemento, index1) => {
			const nombresPropiedades = Object.keys(elemento);
			const datosPropiedades = Object.values(elemento);
			while (i <= nombresPropiedades.length) {
				coldetalles.push(nombresPropiedades[i]);
				rows1.push([datosPropiedades[i]]);
				if (nombresPropiedades[i] !== undefined) {
					if (datosPropiedades[i].length >= nombresPropiedades[i].length)
						sumcaracteres = sumcaracteres + datosPropiedades[i].length;
					else sumcaracteres = sumcaracteres + nombresPropiedades[i].length;

					if (sumcaracteres > 80 || i + 1 === nombresPropiedades.length) {
						doc.autoTable({
							startY: ytabladet,
							head: [coldetalles],
							body: [rows1],
							theme: "grid", // O prueba con otros temas si es necesario
							styles: {
								textColor: [0, 0, 0],
								fillColor: [255, 255, 255], //Color de fondo para las celdas
								overflow: "linebreak", // Ajustar el texto largo
								cellPadding: 1, // Ajustar el relleno de las celdas
								fontSize: 10, // Ajustar el tamaño de la fuente
							},
							headStyles: {
								textColor: [0, 0, 0], // Color del texto
								fillColor: [255, 255, 255], //Color de fondo para las celdas
								fontSize: 8, // Tamaño de fuente en la cabecera
								lineWidth: 0.05, // Ancho de las líneas (bordes)
								lineColor: [0, 0, 0],
								cellPadding: 0.5,
								fontStyle: "bold", // Estilo de la fuente en la cabecera
							},
							margin: { top: 10, left: 10, right: 10, bottom: 10 }, // Ajustar márgenes si es necesario
						});
						coldetalles = []; //
						rows1 = []; //
						ytabladet = ytabladet + 15;
						cuentaentrada++;
						sumcaracteres = 0;
					}
				}
				i++;
			}
		});
		var colmat = ["Cant", "MATERIALES UTILIZADOS", "Importe"];
		let columnStyles = {
			0: { cellWidth: 20 }, // Ancho de la primera columna
			1: { cellWidth: 130 }, // Ancho de la segunda columna
			2: { cellWidth: 40 }, // Ancho de la tercera columna
		};
		var calcularrengblancos = 0;
		if (ytabladet > 136) {
			calcularrengblancos = Math.trunc((ytabladet - 136) / 9);
		}
		let numberOfRows = 15 - calcularrengblancos;
		let numberOfColumns = 3; // Por ejemplo, 3 columnas
		// Crear las filas con celdas vacías
		let datav = Array.from({ length: numberOfRows }, () =>
			Array(numberOfColumns).fill("")
		);
		y = ytabladet;
		doc.autoTable({
			startY: y,
			tableWidth: 190,
			head: [colmat],
			body: datav,
			columnStyles: columnStyles,
			theme: "grid", // O prueba con otros temas si es necesario
			styles: {
				textColor: [0, 0, 0], // Color del texto
				fillColor: [255, 255, 255], //Color de fondo para las celdas
				lineColor: [0, 0, 0],
				overflow: "linebreak", // Ajustar el texto largo
				cellPadding: 2, // Ajustar el relleno de las celdas
				fontSize: 10, // Ajustar el tamaño de la fuente
			},
			headStyles: {
				textColor: [0, 0, 0], // Color del texto
				fillColor: [255, 255, 255], //Color de fondo para las celdas
				fontSize: 8, // Tamaño de fuente en la cabecera
				lineWidth: 0.1, // Ancho de las líneas (bordes)
				lineColor: [0, 0, 0],
				cellPadding: 0.5,
				fontStyle: "bold", // Estilo de la fuente en la cabecera
			},
			margin: { top: 10, left: 10, right: 10, bottom: 10 },
		});
		//pie de la orden de trabajo
		colmat = [
			"Otros",
			"Embaló",
			"Plaqueta",
			"Letras",
			"Ojales",
			"Dobladillo",
			"Chicotes",
			"Refuerzos",
			"Unir Paños",
			"Cor.Paños",
		];
		columnStyles = {
			0: { cellWidth: 20 }, // Ancho de la primera columna
			1: { cellWidth: 20 }, // Ancho de la segunda columna
			2: { cellWidth: 20 }, // Ancho de la tercera columna
			3: { cellWidth: 20 }, // Ancho de la cuarta columna
			4: { cellWidth: 20 }, // Ancho de la quinta columna
			5: { cellWidth: 20 }, // Ancho de la sexta columna
			6: { cellWidth: 20 }, // Ancho de la septima columna
			7: { cellWidth: 20 }, // Ancho de la octava columna
			8: { cellWidth: 20 }, // Ancho de la novena columna
			9: { cellWidth: 20 },
		}; // Ancho de la decima columna
		y = y + numberOfRows * 9;
		numberOfRows = 1;
		numberOfColumns = 10; // Por ejemplo, 3 columnas

		// Crear las filas con celdas vacías
		datav = Array.from({ length: numberOfRows }, () =>
			Array(numberOfColumns).fill("")
		);
		doc.autoTable({
			startY: y,
			tableWidth: 200,
			head: [colmat],
			//body: datav,
			columnStyles: columnStyles,
			//theme: "grid",
			styles: {
				textColor: [0, 0, 0], // Color del texto
				fillColor: [255, 255, 255], // Color de fondo para las celdas
				overflow: "linebreak", // Ajustar el texto largo
				cellPadding: 2, // Ajustar el relleno de las celdas
				fontSize: 10, // Ajustar el tamaño de la fuente
				angle: 90,
				align: "center",
				baseline: "middle",
			},
			headStyles: {
				textColor: [255, 255, 255], // Hacer invisible el texto predeterminado
				fillColor: [255, 255, 255], // Mantener el fondo
				fontSize: 8, // Tamaño de fuente en la cabecera
				// lineWidth: 0.1, // Ancho de las líneas (bordes)
				//	lineColor: [0, 0, 0],
				cellPadding: 0.5,
				fontStyle: "bold",
			},
			didDrawCell: (data) => {
				if (data.section === "head") {
					data.cell.text = [];
					const text = data.cell.raw;
					const x = data.cell.x + data.cell.width / 2;
					const y = data.cell.y + data.cell.height / 2;
					// Dibujar el texto rotado
					doc.setTextColor(0, 0, 0);
					doc.saveGraphicsState();
					doc.text(text, x, y, {
						angle: -90,
						align: "center",
						baseline: "middle",
					});
					doc.restoreGraphicsState();
				}
			},
			margin: { top: 10, left: 10, right: 10, bottom: 10 },
		});
		// Genera el PDF como Data URI y lo envía a pdfdata que si exite se muestra en el iframe
		var Cliente = arregloencab[0].ClientesDesc;
		var largocli = Cliente.length;
		while (
			(Cliente.substr(largocli, 1) == " " ||
				Cliente.substr(largocli, 1) == "") &&
			largocli >= 0
		) {
			largocli--;
		}

		Cliente = Cliente.substr(0, largocli + 1);

		const dataUri = doc.output("dataurlstring");
		setPdfData(dataUri);
		if (numeroOT !== 0) {
			var numeroOTcero = agregarCeros(numeroOT, 6);
			const pdfData = doc.output("datauristring");
			const nombrearch = `OT Nro ${numeroOTcero} ${Cliente}.pdf`;

			sendPDFViaWebSocket(pdfData, nombrearch);
		}

		// doc.save("./prueba1.pdf");
	}

	// doc.save("./prueba1.pdf");

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				// fullScreen
				maxWidth={false}
				fullWidth={true}
				sx={{
					backgroundColor: colorfondo,
				}}
			>
				<DialogContent>
					<Button onClick={OTGraba}>Graba</Button>
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
	);
}

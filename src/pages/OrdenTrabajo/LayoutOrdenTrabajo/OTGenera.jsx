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
	const [importeorden, setImporteOrden] = useState(0);
	const [pdfURL, setPdfURL] = useState(null);
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
	// const formattedAmount = new Intl.NumberFormat("ar-AR", {
	// 	style: "currency",
	// 	currency: "PES",
	// 	minimumFractionDigits: 2,
	// });
	async function OTGraba() {
		const nroOT = await OTGrabar(otdatos);
		setNumeroOT(nroOT);
		// Convertir el PDF a un blob
	}
	var textoImp = "";
	var valorImp = 0.0;
	var textoImpI = "";
	var valorImpI = 0.0;
	if (otdatos.OTconIVA === "N") {
		textoImpI = "Importe c/IVA";
		valorImpI = formatCurrency(0);
		textoImp = "Importe s/IVA";
		valorImp = formatCurrency(otdatos.TotalPresupuestoSIVA);
	} else {
		textoImpI = "Importe c/IVA";
		valorImpI = formatCurrency(otdatos.TotalPresupuesto);
		textoImp = "Importe s/IVA";
		// valorImp = otdatos.TotalPresupuestoSIVA;
		valorImp = formatCurrency(otdatos.TotalPresupuestoSIVA);
	}
	var textoSeniaI = "Importe Seña";
	var valorSeniaI = formatCurrency(0.0);
	if (otdatos.ImporteSenia !== 0 && otdatos.ValorSenia !== undefined) {
		valorSeniaI = formatCurrency(otdatos.ImporteSenia);
	}

	// red = 235;
	// green = 244;
	// blue = 129;
	const onChange = (event) => {
		console.log("event  ", event);
	};

	const mostrarElementos = () => {
		arregloencab.map((elemento, index1) => {
			delete elemento.ClientesTipo;
			delete elemento.ClientesContacto;
			delete elemento.ClientesCategoria;
			delete elemento.ClientesObserv1;
			delete elemento.ClientesObserv2;
			delete elemento.ClientesFecha;

			const nombresPropiedades = Object.keys(elemento);
			return elemento[nombresPropiedades];
		});
	};

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
			console.log("Respuesta del servidor:", event.data);
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
		console.log(" lastY ", lastY);
		doc.setFontSize(10);
		y += 15;
		x = 9;
		alto = 5;
		if (!otdatos.transporte || otdatos.transporte === undefined) {
			doc.text(`Transporte :                   `, x, y);
		} else {
			doc.text(`Transporte : ${otdatos.transporte.TransporteDesc}`, x, y);
		}
		x += 50;
		doc.text(`Presup. Nro : ${otdatos.datosencab[0][0].idPresupEncab}`, x, y);
		x += 50;

		doc.text(`Fecha : ${FechaHoy}`, x + 2, y);
		x += 45;

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
// <Dialog
// 	open={open}
// 	onClose={handleClose}
// 	maxWidth={false}
// 	fullWidth={true}
// 	sx={{
// 		backgroundColor: colorfondo,
// 	}}
// >
// 	<DialogContent ref={pdfRef} id="pdfContent">
// 		<Typography variant="h5" align="center" gutterBottom>
// 			Orden de Trabajo
// 		</Typography>
// 		<Paper style={{ padding: 10, marginBottom: 16 }}>
// 			<Grid container spacing={2}>
// 				<Grid item xs={12}>
// 					{/* justifyContent="flex-end" */}
// 					<Box
// 						display="flex"
// 						justifyContent="flex-center"
// 						alignItems="center"
// 					>
// 						<Typography
// 							variant="h7"
// 							style={{
// 								fontWeight: "bold",
// 								fontFamily: "system-ui",
// 								marginRight: 20,
// 							}}
// 						>
// 							{tipoorden}
// 						</Typography>

// 						<Typography variant="body1" style={{ marginRight: 3 }}>
// 							Fecha
// 						</Typography>
// 						<Typography
// 							variant="subtitle1"
// 							style={{ fontWeight: "bold", marginRight: 16 }}
// 						>
// 							{FechaHoy}
// 						</Typography>
// 						<Typography variant="subtitle1" style={{ marginRight: 3 }}>
// 							Fecha Promesa
// 						</Typography>
// 						<Typography
// 							variant="body1"
// 							style={{ fontWeight: "bold", marginRight: 16 }}
// 						>
// 							{FechaProm}
// 						</Typography>
// 					</Box>
// 				</Grid>
// 			</Grid>
// 		</Paper>

// 		<Box
// 			component="form"
// 			sx={{
// 				"& .MuiTextField-root": { m: 1, width: "calc(30% - 16px)" },
// 			}}
// 			noValidate
// 			autoComplete="off"
// 		>
// 			<CampoEncab
// 				arregloencab={arregloencab}
// 				nropresup={otdatos.datosencab[0][0].idPresupEncab}
// 			></CampoEncab>
// 			<Grid container spacing={2}>
// 				{(otdatos.OTsinIVA === 1 && (
// 					<Grid item>
// 						<h5>Importe total s/IVA</h5>
// 						<CurrencyTextField
// 							id="Total"
// 							size="small"
// 							label="Importe Total"
// 							value={otdatos.TotalPresupuestoSIVA}
// 							className={EstTF.tfcurrency}
// 						></CurrencyTextField>
// 					</Grid>
// 				)) || (
// 					<Grid item>
// 						<h5>Importe total c/IVA</h5>
// 						<CurrencyTextField
// 							id="Total"
// 							size="small"
// 							label="Importe Total"
// 							value={otdatos.TotalPresupuesto}
// 							className={EstTF.tfcurrency}
// 						></CurrencyTextField>
// 					</Grid>
// 				)}
// 				<Grid item>
// 					<h5>Importe Seña</h5>
// 					<CurrencyTextField
// 						id="ImporteSenia"
// 						size="small"
// 						label="Importe Seña"
// 						value={otdatos.ImporteSenia}
// 						className={EstTF.tfcurrency}
// 					></CurrencyTextField>
// 				</Grid>
// 			</Grid>
// 			<CampoMuestra arreglodef={arreglodef}></CampoMuestra>
// 			<Button onClick={OTGraba}>Graba</Button>
// 		</Box>
// 	</DialogContent>
// 	<Button onClick={generatePDF} style={{ margin: 10 }}>
// 		Generate PDF
// 	</Button>

// </Dialog>
// );
// }

// arregloencab.map((elemento, index1) => {
// 	delete elemento.ClientesTipo;
// 	delete elemento.ClientesContacto;
// 	delete elemento.ClientesCategoria;
// 	delete elemento.ClientesObserv1;
// 	delete elemento.ClientesObserv2;
// 	delete elemento.ClientesFecha;

// 	const nombresPropiedades = Object.keys(elemento);
// 	var fila = 15;
// 	var colum = 1;
// 	doc.setFontSize(8);
// 	nombresPropiedades.map((nombrePropiedad, index) => {
// 		console.log("fila  ", fila);
// 		doc.text(
// 			`${nombrePropiedad.replace("Clientes", "")} : ${
// 				elemento[nombrePropiedad]
// 			}`,
// 			colum,
// 			fila
// 		);
// 		if (colum > 40) {
// 			colum = 1;
// 			fila = fila + 5;
// 		} else {
// 			colum = colum + 15;
// 		}
// 	});
// });

// if (i % 6 === 0) {
// 	doc.autoTable({
// 		startY: ytabladet,
// 		head: [coldetalles],
// 		body: [rows1],
// 		theme: "grid", // O prueba con otros temas si es necesario
// 		styles: {
// 			textColor: [0, 0, 0],
// 			fillColor: [255, 255, 255], //Color de fondo para las celdas
// 			overflow: "linebreak", // Ajustar el texto largo
// 			cellPadding: 1, // Ajustar el relleno de las celdas
// 			fontSize: 10, // Ajustar el tamaño de la fuente
// 		},
// 		headStyles: {
// 			textColor: [0, 0, 0], // Color del texto
// 			fillColor: [255, 255, 255], //Color de fondo para las celdas
// 			fontSize: 8, // Tamaño de fuente en la cabecera
// 			lineWidth: 0.05, // Ancho de las líneas (bordes)
// 			lineColor: [0, 0, 0],
// 			cellPadding: 0.5,
// 			fontStyle: "bold", // Estilo de la fuente en la cabecera
// 		},
// 		margin: { top: 10, left: 10, right: 10, bottom: 10 }, // Ajustar márgenes si es necesario
// 	});
// 	coldetalles = []; //
// 	rows1 = []; //
// 	ytabladet = ytabladet + 10;
// 	cuentaentrada++;
// } else {
// 	if (cuentaentrada >= Math.trunc(nombresPropiedades.length / 6)) {
// 		doc.autoTable({
// 			startY: ytabladet,
// 			head: [coldetalles],
// 			body: [rows1],
// 			theme: "grid", // O prueba con otros temas si es necesario
// 			styles: {
// 				textColor: [0, 0, 0], // Color del texto
// 				fillColor: [255, 255, 255], //Color de fondo para las celdas
// 				overflow: "linebreak", // Ajustar el texto largo
// 				cellPadding: 1, // Ajustar el relleno de las celdas
// 				fontSize: 10, // Ajustar el tamaño de la fuente
// 			},
// 			headStyles: {
// 				textColor: [0, 0, 0], // Color del texto
// 				fillColor: [255, 255, 255], //Color de fondo para las celdas
// 				fontSize: 8, // Tamaño de fuente en la cabecera
// 				lineWidth: 0.05, // Ancho de las líneas (bordes)
// 				lineColor: [0, 0, 0],
// 				cellPadding: 0.5,
// 				fontStyle: "bold", // Estilo de la fuente en la cabecera
// 			},
// 			margin: { top: 10, left: 10, right: 10, bottom: 10 }, // Ajustar márgenes si es necesario
// 		});
// 	}
// }

/*const nroOT = await OTGrabar(otdatos);
		setNumeroOT(nroOT);
		// const pdfOutput = doc.output("datauristring");
		const pdfBlob = doc.output("blob");

		const formData = new FormData();
		formData.append('file', pdfBlob, 'nombre_del_archivo.pdf');

		// Crear una instancia de XMLHttpRequest
		const xhr = new XMLHttpRequest();
		// xhr.open('POST', 'https://tu-servidor.com/guardar-pdf', true);
		xhr.open('POST', 'https://http://localhost:5173/guardar-pdf', true);

		xhr.onload = function () {
			if (xhr.status === 200) {
				console.log('PDF guardado exitosamente en el servidor');
			} else {
				console.error('Error al guardar el PDF en el servidor');
			}
		};

		xhr.onerror = function () {
			console.error('Error de conexión.');
		};

		// Enviar la solicitud con los datos del PDF
		xhr.send(formData);
	};*/

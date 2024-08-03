import React, { useContext, useState } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	Grid,
	Input,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { format } from "date-fns";
import { CampoMuestra } from "./CampoMuestra.jsx";
import { CampoEncab } from "./CamposEncab.jsx";
import { OTGrabar } from "./OTGrabar.jsx";
import { CurrencyTextField } from "../../../hooks/useCurrencyTextField.jsx";
import EstTF from "../../../Styles/TextField.module.css";

// import html2canvas from "html2canvas";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { pdfjs } from "@react-pdf-viewer/core";
// import jsPDF from "jspdf";
// Importa el worker local
// import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

// const PdfViewerComponent = ({ pdfUrl }) => {
// 	return (
// 		<div>
// 			<Worker workerUrl={pdfWorker}>
// 				<Viewer fileUrl={pdfUrl} />
// 			</Worker>
// 		</div>
// 	);
// };

export default function OTGenera(props) {
	const { open, handleClose, datospot, renglondef } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo); //trae las caracteristicas de lo que se presupuesto y los renglonespresup
	const { inicializaOT } = useContext(OrdTrabajo);
	const [importeorden, setImporteOrden] = useState(0);
	const [pdfURL, setPdfURL] = useState(null);
	let colorfondo = "";
	const arreglodef = [];
	const arregloencab = [];
	let i = 0;
	console.log("otdatos OTGenera  ", otdatos);
	console.log("datospot OTGenera  ", datospot.idrenglon);
	console.log("otdatos.datosconfec.idrenglon  ", otdatos.datosconfec.idrenglon);
	for (i = 0; i < otdatos.renglonespresup.length; i++) {
		arreglodef.push(otdatos.renglonespresup[i][0]);
		if (otdatos.datosconfec) {
			if (otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
				arreglodef.push(otdatos.datosconfec);
			}
		}
	}
	const FechaProm = format(new Date(otdatos.FechaPromesa), "dd/MM/yyyy");
	const FechaHoy = format(new Date(), "dd/MM/yyyy");
	const tipoorden =
		(otdatos.datosencab[0][0].PresupEncabMayMin === "mn" &&
			"Tipo de Orden: Minorista") ||
		"Tipo de Orden: Mayorista";

	if (otdatos.datosencab.length > 1) {
		arregloencab.push(otdatos.datosencab[1][0]);
	} else {
		arregloencab.push(otdatos.datosencab[0][0]);
	}

	if (datospot.minmay === "my") {
		colorfondo = "#a6d4ff8d";
	} else {
		if (datospot.minmay === "mn" && datospot.tipopresup !== "CONFECCIONADA") {
			colorfondo = "#ffffa6ca";
		} else if (
			datospot.minmay === "mn" &&
			datospot.tipopresup === "CONFECCIONADA"
		) {
			colorfondo = "#f1f1ef4c";
		}
	}
	const onChange = (event) => {
		console.log("event  ", event);
	};
	const OTGraba = () => {
		// console.log("otdatos OTGraba  ", otdatos);
		// console.log("otdatos datosconfec OTGraba  ", otdatos.datosconfec); //datos de lo que pide por json otros datos
		// console.log("otdatos datosencab OTGraba  ", otdatos.datosencab);
		// // console.log("otdatos datosencab OTGraba  ", otdatos.datosencab[0]);
		// // console.log("otdatos datosencab OTGraba  ", otdatos.datosencab[1]);
		console.log("arrglodef OTGraba  ", arreglodef);
		// if (otdatos.datosencab.length > 1) {
		// 	console.log("otdatos.datosencab[1]  ", otdatos.datosencab[1]);
		OTGrabar(
			// otdatos.datosconfec,
			// otdatos.renglonespresup,
			// otdatos.datosencab,
			otdatos
		);
		// } else {
		// 	console.log("otdatos.datosencab[0][0]  ", otdatos.datosencab[0][0]);
		// 	OTGrabar(
		// 		otdatos.datosconfec,
		// 		otdatos.renglonespresup,
		// 		otdatos.datosencab[0][0]
		// 	);
		// }
		inicializaOT();
	};

	// const generatePDF = async () => {
	// 	const input = document.getElementById("pdfContent");
	// 	const canvas = await html2canvas(input);
	// 	const imgData = canvas.toDataURL("image/png");
	// 	const pdf = new jsPDF();
	// 	const pdfWidth = pdf.internal.pageSize.getWidth();
	// 	const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

	// 	pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

	// 	// Generar el PDF como Blob y obtener la URL para vista previa
	// 	const pdfBlob = pdf.output("blob");
	// 	const url = URL.createObjectURL(pdfBlob);

	// 	// Establecer la URL del PDF en el estado para previsualización
	// 	setPdfURL(url);

	// 	// Descargar el PDF con un nombre específico
	// 	pdf.save("orden_de_trabajo.pdf");
	// };
	// const generatePDF = async () => {
	// 	try {
	// 		const input = document.getElementById("pdfContent");
	// 		const canvas = await html2canvas(input);
	// 		const imgData = canvas.toDataURL("image/png");
	// 		const pdf = new jsPDF();
	// 		const imgProps = pdf.getImageProperties(imgData);
	// 		const pdfWidth = pdf.internal.pageSize.getWidth();
	// 		const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
	// 		pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

	// 		// Guarda el PDF como un blob URL para la vista previa
	// 		const pdfBlob = pdf.output("blob");
	// 		const url = URL.createObjectURL(pdfBlob);

	// 		// Establecer la URL del PDF en el estado para previsualización
	// 		setPdfURL(url);
	// 		pdf.save("orden_de_trabajo.pdf");
	// 	} catch (error) {
	// 		console.error("Error generating PDF: ", error);
	// 	}
	// 	// Descarga el PDF con el nombre especificado
	// };

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth={false}
			fullWidth={true}
			sx={{
				backgroundColor: colorfondo,
			}}
		>
			<DialogContent id="pdfContent">
				<Typography variant="h5" align="center" gutterBottom>
					Orden de Trabajo
				</Typography>
				<Paper style={{ padding: 10, marginBottom: 16 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{/* justifyContent="flex-end" */}
							<Box
								display="flex"
								justifyContent="flex-center"
								alignItems="center"
							>
								<Typography
									variant="h7"
									style={{
										fontWeight: "bold",
										fontFamily: "system-ui",
										marginRight: 20,
									}}
								>
									{tipoorden}
								</Typography>

								<Typography variant="body1" style={{ marginRight: 3 }}>
									Fecha
								</Typography>
								<Typography
									variant="subtitle1"
									style={{ fontWeight: "bold", marginRight: 16 }}
								>
									{FechaHoy}
								</Typography>
								<Typography variant="subtitle1" style={{ marginRight: 3 }}>
									Fecha Promesa
								</Typography>
								<Typography
									variant="body1"
									style={{ fontWeight: "bold", marginRight: 16 }}
								>
									{FechaProm}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Paper>

				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "calc(30% - 16px)" },
					}}
					noValidate
					autoComplete="off"
				>
					<CampoEncab
						arregloencab={arregloencab}
						nropresup={otdatos.datosencab[0][0].idPresupEncab}
					></CampoEncab>
					<Grid container spacing={2}>
						{(otdatos.OTsinIVA === 1 && (
							<Grid item>
								<h5>Importe total s/IVA</h5>
								<CurrencyTextField
									id="Total"
									size="small"
									label="Importe Total"
									value={otdatos.TotalPresupuestoSIVA}
									className={EstTF.tfcurrency}
								></CurrencyTextField>
							</Grid>
						)) || (
							<Grid item>
								<h5>Importe total c/IVA</h5>
								<CurrencyTextField
									id="Total"
									size="small"
									label="Importe Total"
									value={otdatos.TotalPresupuesto}
									className={EstTF.tfcurrency}
								></CurrencyTextField>
							</Grid>
						)}
						<Grid item>
							<h5>Importe Seña</h5>
							<CurrencyTextField
								id="ImporteSenia"
								size="small"
								label="Importe Seña"
								value={otdatos.ImporteSenia}
								className={EstTF.tfcurrency}
							></CurrencyTextField>
						</Grid>
					</Grid>
					<CampoMuestra arreglodef={arreglodef}></CampoMuestra>
					<Button onClick={OTGraba}>Graba</Button>
				</Box>
			</DialogContent>
			{/* <button onClick={generatePDF}>Generate PDF</button>
			{pdfURL && <PdfViewerComponent pdfUrl={pdfURL} />}*/}
			{/* <Button onClick={generatePDF} style={{ margin: 10 }}>
				Genera PDF
			</Button>
			{pdfURL && (
				<DialogContent>
					<Worker
						workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}
					>
						<Viewer fileUrl={pdfURL} />
					</Worker>
				</DialogContent>
			)} */}
		</Dialog>
	);
}

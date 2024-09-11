import React from "react";

import { OTLeer } from "./OTLeer.jsx";
import { llenarcolumns } from "./columns.jsx";
import { useEffect } from "react";
import { useState } from "react";

import { useContext } from "react";
import StaticContexto from "../../../context/StaticContext.jsx";
import TablasContexto from "../../../context/TablasContext.jsx";
import CtasCtesContext from "../../../context/CtasCtesContext.jsx";
import FitbitIcon from "@mui/icons-material/Fitbit";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import PreviewTwoToneIcon from "@mui/icons-material/PreviewTwoTone";
import {
	common,
	deepOrange,
	green,
	yellow,
	pink,
	blueGrey,
} from "@mui/material/colors";
import { formdata } from "./formdata.js";
import TablaMuestra from "../../../components/TablaMuestra.jsx";
import { Button, Dialog, DialogContent } from "@mui/material";
import { TablaMuestraRenglon } from "./TablaMuestraRenglon/index.jsx";
import { ClientesLeerDesCod } from "../../Tablas/Clientes/ClientesLeerDesCod.jsx";
// import OTFacturacion from "../../CtasCtes/Facturacion/index.jsx";
import { Route, useNavigate } from "react-router-dom";
export default function OTMovimiento() {
	// console.log("OTMovimiento  ");
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const { fcdatos, setFCdatos } = useContext(CtasCtesContext);
	const { valor, setValor } = useContext(StaticContexto);
	const [rows, setRows] = useState([]);
	const [pdfUrl, setPdfUrl] = useState(null);
	const [columns, setColumns] = useState([]);
	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [nroordeleg, setNroordeleg] = useState(0);
	// const [encabfact, setEncabfact] = useState("");
	const navigate = useNavigate();
	//empiezan las cosas del sistema
	async function columnsFetch() {
		var col = await llenarcolumns();
		col.push(actionsColumn);
		col.push(actionsColumn1);
		col.push(actionsColumn2);
		col.push(actionsColumn3);
		setColumns(() => col);
	}
	async function dataFetch() {
		const data = await OTLeer();
		setRows(data);
	}
	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}
	useEffect(() => {
		initialFetch();
		setValor("Ordenes de Trabajo");
		setFormdatos(formdata);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const handleClose = () => {
		setOpen(!open);
	};
	const handleClose1 = () => {
		setOpen1(!open1);
	};
	async function fcionotrosdatos(event) {
		setNroordeleg(event.row.id);
		setOpen(true);
	}

	async function datosafacturar(event) {
		// let nroordafac = event.row;
		setFCdatos({ ...fcdatos, nroordafac: event.row });
		// setFCdatos(nroordafac);
		navigate("/CtasCtes");
	}

	async function comprobrelac(event) {
		console.log(event.row);
	}
	const agregarCeros = (numero, digitos) => {
		return numero.toString().padStart(digitos, "0");
	};
	async function muestraOT(params) {
		let nrootceros = agregarCeros(params.row.id, 6);
		var nombcli = await ClientesLeerDesCod(params.row.OTEncabCliente);
		var fileName = `OT Nro ${nrootceros} ${nombcli[0].ClientesDesc.trim()}.pdf`;
		var pdfData = "";
		sendPDFViaWebSocket(fileName);
		setOpen1(!open1);
	}
	const sendPDFViaWebSocket = (fileName) => {
		const socket = new WebSocket("ws://localhost:3000");
		socket.onopen = () => {
			console.log("Conexión WebSocket abierta");

			// Enviar la solicitud de lectura al servidor
			const payload = {
				action: "read",
				nombrearch: fileName, // Nombre del archivo a leer
			};
			socket.send(JSON.stringify(payload));
		};

		socket.onmessage = (event) => {
			const { pdfData } = JSON.parse(event.data);
			setPdfUrl(pdfData); // Establecer la URL del PDF para mostrarlo
		};

		socket.onclose = () => {
			console.log("Conexión WebSocket cerrada");
		};

		socket.onerror = (error) => {
			console.error("Error en WebSocket:", error);
		};
	};
	const actionsColumn = {
		field: "actions",
		headerName: "Detalles",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				variant="text"
				style={{ color: deepOrange[800] }}
				onClick={() => fcionotrosdatos(params)}
				startIcon={<FitbitIcon />}
			/>
		),
	};
	const actionsColumn1 = {
		field: "otfactura",
		headerName: "Facturar",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				variant="text"
				style={{ color: green[800] }}
				onClick={() => datosafacturar(params)}
				startIcon={<DescriptionTwoToneIcon />}
			/>
		),
	};
	const actionsColumn2 = {
		field: "otcomprob",
		headerName: "Comprob.",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				size="large"
				variant="text"
				style={{ color: common[150] }}
				onClick={() => comprobrelac(params)}
				startIcon={<FindInPageTwoToneIcon />}
			/>
		),
	};
	const actionsColumn3 = {
		field: "verot",
		headerName: "Muestra OT",
		width: 100,
		headerClassName: "encabcolumns",
		renderCell: (params) => (
			<Button
				size="large"
				variant="text"
				style={{ color: yellow[600] }}
				onClick={() => muestraOT(params)}
				startIcon={<PreviewTwoToneIcon />}
			/>
		),
	};
	return (
		<>
			<TablaMuestra
				rows1={rows}
				columns1={columns}
				formdatos={formdatos}
			></TablaMuestra>
			{nroordeleg !== 0 && (
				<TablaMuestraRenglon
					open={open}
					handleClose={handleClose}
					OTNro={nroordeleg}
				/>
			)}
			<Dialog
				open={open1}
				onClose={handleClose1}
				// fullScreen
				maxWidth={false}
				fullWidth={true}
			>
				<DialogContent>
					<Button onClick={handleClose1}>Cierra</Button>
					{pdfUrl && (
						<iframe
							src={pdfUrl}
							title="PDF Viewer"
							style={{ width: "100%", height: "100vh" }}
						/>
					)}
				</DialogContent>
			</Dialog>
			{/* {encabfact !== 0 && (
				<OTFacturacion
					open1={open1}
					handleClose1={handleClose1}
					EncabFact={encabfact}
				/>
			)} */}
		</>
	);
}

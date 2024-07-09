import React, { useContext, useState } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import estilo from "../../../Styles/TextField.module.css";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	Input,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

export default function OTGenera(props) {
	const { open, handleClose, datospot, renglondef } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo); //trae las caracteristicas de lo que se presupuesto y los renglonespresup
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo); //trae lo que pide por cada tipo de confeccion
	const [datosencabot, setDatosencabot] = useState();
	console.log("datosgenot OTGenera ", datosgenot);
	console.log("datospot OTGenera ", datospot);
	console.log("otdatos OTGenera ", otdatos);
	console.log("otdatos.renglonre OTGenera ", otdatos.renglonespresup);

	const arreglodef = [];

	var i = 0;
	for (i = 0; i < otdatos.renglonespresup.length; i++) {
		// let indren = Object.values(datosgenot);
		console.log(
			"otdatos.renglonespresup[i][0]  ",
			otdatos.renglonespresup[i][0]
		);
		if (otdatos.datosconfec) {
			console.log("otdatos.datosconfec  ", otdatos.datosconfec);
		}
		arreglodef.push(otdatos.renglonespresup[i][0]);
		if (otdatos.datosconfec.idrenglon === otdatos.renglonespresup[i][0].id) {
			arreglodef.push(otdatos.datosconfec);
		}
		// if (indren[0] === otdatos.renglonespresup[i][0].id) {
		// 	arreglodef.push(datosgenot);
		// }
	}

	console.log("arreglodef  ", arreglodef);

	let colorfondo = "";
	const otdatosdefcab = {
		Cliente: "",
		Localidad: "",
		TelWA: "",
		CUIT: "",
		ImporteSeña: "",
		TotalOrden: "",
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const Cierra = () => {
		handleClose();
	};
	const otdatosdefdet = {
		Cantidad: "",
		Descripcion: "",
		Largo: 0,
		Ancho: 0,
		ImporteItem: 0.0,
	};
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

	if (otdatos.TotalPresupuesto !== 0) {
		otdatosdefcab.TotalOrden = otdatos.TotalPresupuesto;
	}
	if (otdatos.senia !== 0) {
		otdatosdefcab.ImporteSeña = otdatos.senia;
	}
	if (otdatos.otrenglon) {
		otdatosdefdet.Cantidad = otdatos.otrenglon.PresupRenglonCant;
		otdatosdefdet.Descripcion = otdatos.otrenglon.PresupRenglonDesc;
		otdatosdefdet.Largo = otdatos.otrenglon.PresupRenglonLargo;
		otdatosdefdet.Ancho = otdatos.otrenglon.PresupRenglonAncho;
		otdatosdefdet.ImporteItem = otdatos.otrenglon.PresupRenglonImpItem;
	} else {
		otdatosdefdet.Cantidad = otdatos.renglonespresup[0][0].PresupRenglonCant;
		otdatosdefdet.Descripcion = otdatos.renglonespresup[0][0].PresupRenglonDesc;
		otdatosdefdet.Largo = otdatos.renglonespresup[0][0].PresupRenglonLargo;
		otdatosdefdet.Ancho = otdatos.renglonespresup[0][0].PresupRenglonAncho;
		otdatosdefdet.ImporteItem =
			otdatos.renglonespresup[0][0].PresupRenglonImpItem;
	}
	if (otdatos.datosnuevocliente) {
		otdatosdefcab.Cliente = otdatos.datosnuevocliente[0].ClientesDesc;
		otdatosdefcab.Localidad = otdatos.datosnuevocliente[0].ClientesLoc;
		otdatosdefcab.TelWA = otdatos.datosnuevocliente[0].ClientesTel;
		otdatosdefcab.CUIT = otdatos.datosnuevocliente[0].ClientesCUIT;
	} else {
		otdatosdefcab.Cliente = otdatos.datosencab[0][0].PresupEncabCliente;
	}

	const handleChange = (event) => {
		const id = event.target.id;
		setDatosencabot({ ...datosencabot, [id]: event.target.value });
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth={false}
			fullWidth={true}
			sx={{
				// width: "400mm",
				// height: "297mm",
				// border: "1px solid #f01212",
				// padding: "1mm",
				// boxSizing: "border-box",
				backgroundColor: colorfondo,
				// margin: "auto",
				// marginTop: "2px",
			}}
		>
			<DialogContent>
				<Typography variant="h4" align="center" gutterBottom>
					Orden de Trabajo
				</Typography>

				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "calc(30% - 16px)" },
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						label="Cliente"
						value={otdatosdefcab.Cliente}
						variant="outlined"
						fullWidth
					/>
					<TextField
						label="Localidad"
						value={otdatosdefcab.Localidad}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField label="Correo Electrónico" variant="outlined" fullWidth />
					<TextField
						label="Tel-WA"
						value={otdatosdefcab.TelWA}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						label="C.U.I.T."
						value={otdatosdefcab.CUIT}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
					<TextField
						label="Total"
						value={otdatosdefcab.TotalOrden}
						variant="outlined"
						fullWidth
					/>
					<TextField
						label="C/S IVA"
						multiline
						value={datospot.ivasn}
						rows={1}
						variant="outlined"
					/>
					<TextField
						inputProps={{ maxLength: 5 }}
						label="Seña"
						id="ImporteSeña"
						type="number"
						value={otdatosdefcab.ImporteSeña}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>
				</Box>

				<Typography variant="h6" align="center" gutterBottom>
					Trabajo a Realizar {datospot.tipopresup}
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 4fr 1fr 1fr 2fr ",
						gap: 3,
						padding: 5,
					}}
				>
					{arreglodef.map((renglonot, index) => (
						<>
							{!renglonot.PresupRenglonCant && (
								<TextField
									label="Cantidad"
									//multiline
									value={renglonot.datosconfec}
									rows={1}
									className={estilo.textfieldplano}
									// variant="filled"
								/>
							)}
							,
							<TextField
								label="Cantidad"
								//multiline
								value={renglonot.PresupRenglonCant}
								rows={1}
								className={estilo.textfieldplano}
								// variant="filled"
							/>
							<Input
								label="Descripción"
								// multiline
								value={renglonot.PresupRenglonDesc}
								//rows={2}
								// variant="outlined"
							/>
							<Input
								label="Largo"
								// multiline
								value={renglonot.PresupRenglonLargo}
								rows={1}
								// variant="filled"
							/>
							<Input
								label="Ancho"
								// multiline
								value={renglonot.PresupRenglonAncho}
								rows={1}
								// variant="filled"
							/>
							<Input
								label="Importe Item"
								// multiline
								value={renglonot.PresupRenglonImpItem}
								rows={1}
								// variant="filled"
							/>
						</>
					))}
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cierra</Button>
			</DialogActions>
		</Dialog>
	);
}
/*      idPresupRenglon: 3

	//     PresupRenglonNroPresup: 6405,

	//     PresupRenglonCant: 1,

	//     PresupRenglonDesc: 'UNI PUNTERA CAÑO 2 1/2 PUL  ',

	//     PresupRenglonLargo: 0,

	//     PresupRenglonAncho: 0,

	//     PresupRenglonImpUnit: 10983,

	//     PresupRenglonImpItem: 10983,



<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 4fr 1fr 1fr 2fr 1fr",
						gap: 3,
						padding: 5,
					}}
				>
					<TextField
						label="Cantidad"
						multiline
						value={otdatosdefdet.Cantidad}
						rows={1}
						variant="filled"
					/>
					<TextField
						label="Descripcion"
						multiline
						value={otdatosdefdet.Descripcion}
						rows={2}
						variant="filled"
					/>
					<TextField
						label="Largo"
						multiline
						value={otdatosdefdet.Largo}
						rows={1}
						variant="filled"
					/>
					<TextField
						label="Ancho"
						multiline
						value={otdatosdefdet.Ancho}
						rows={1}
						variant="filled"
					/>
					<TextField
						label="Importe"
						multiline
						value={otdatosdefdet.ImporteItem}
						rows={1}
						variant="filled"
					/>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={1.5}>
						<Paper
							elevation={2}
							style={{ padding: "6px", textAlign: "center" }}
						>
							<Typography variant="h6">Material</Typography>
							<Typography variant="body2">{datospot.StkRubroAbr}</Typography>
						</Paper>
					</Grid>
					{Object.keys(datosgenot).map((key) => (
						<Grid item xs={12} sm={6} md={4} lg={1.5} key={key}>
							<Paper
								elevation={2}
								style={{ padding: "6px", textAlign: "center" }}
							>
								<Typography variant="h6">{key}</Typography>
								<Typography variant="body2">{datosgenot[key]}</Typography>
							</Paper>
						</Grid>
					))}
				</Grid>
				<Box
					sx={{
						"& .MuiTextField-root": { m: 1, width: "100%" },
					}}
				>
			
				</Box>*/

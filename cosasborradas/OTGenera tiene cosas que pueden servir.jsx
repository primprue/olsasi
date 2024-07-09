import React, { useContext, useState } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import OTFilaGral from "../OTFilas/OTFilaGral/OTFilaGral.jsx";
import OTFilasConf from "../OTFilasConf/OTFilasConf.jsx";

export default function OTGenera(props) {
	const [datosfinales, setDatosFinales] = useState();
	const { open, handleClose, datospot } = props; //trae PresupRenglonParamInt separado
	const { otdatos, setOTdatos } = useContext(OrdTrabajo); //trae las caracteristicas de lo que se presupuesto y los renglonespresup
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo); //trae lo que pide por cada tipo de confeccion
	const [datosencabot, setDatosencabot] = useState();
	console.log("datospot  ", datospot);
	console.log("otdatos  ", otdatos);
	console.log("datosgenot  ", datosgenot);
	console.log("otdatosdatosencab  ", otdatos.datosencab[0][0]);
	console.log("otdatosdatosencab  ", otdatos.datosencab);

	//renglonesOT tiene renglonespresup con los datos de los renglones y las modificaciones realizadas

	const renglonesOT = {
		...otdatos,
		renglonespresup: otdatos.renglonespresup.map((renglon) => {
			renglon.forEach((objeto, index) => {
				if (otdatos.otrenglon) {
					if (objeto.id === otdatos.otrenglon.id) {
						renglon[index] = otdatos.otrenglon;
					}
				}
			});
			return renglon;
		}),
	};

	console.log("datosfinales  ", renglonesOT);
	console.log(
		"datosfinales  ",
		renglonesOT.renglonespresup[0][0].PresupRenglonParamInt
	);
	for (var i = 0; i < renglonesOT.renglonespresup.length; i++) {
		const paramObjeto = JSON.parse(
			renglonesOT.renglonespresup[i][0].PresupRenglonParamInt
		);
		// setPresuptipo(paramObjeto.tipopresup);
		// setDatospot(paramObjeto);
		console.log("paramObjeto  ", paramObjeto);
	}
	console.log("te  ", renglonesOT.renglonespresup.length);
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
				{datospot !== "" && <OTFilaGral datospot={datospot}></OTFilaGral>}
				{/* {presuptipo !== "" && <OTFilasConf datospot={datospot}></OTFilasConf>} */}
				{/* {otdatos.datosencab[1][0].length > 0 && (
					<h6>{otdatos.datosencab[1][0].ClientesDesc} </h6>
				)} */}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cierra</Button>
			</DialogActions>
		</Dialog>
	);
}

/*console.log("renglones  ", renglones);
		if (otdatos.otrenglon && renglones[0].id === otdatos.otrenglon.id) {
			datosodefinitivos.id = otdatos.otrenglon.id;
			datosodefinitivos.idPresupRenglon = otdatos.otrenglon.idPresupRenglon;
			datosodefinitivos.PresupRenglonCant = otdatos.otrenglon.PresupRenglonCant;
			datosodefinitivos.PresupRenglonDesc = otdatos.otrenglon.PresupRenglonDesc;

			datosodefinitivos.PresupRenglonLargo =
				otdatos.otrenglon.PresupRenglonLargo;
			datosodefinitivos.PresupRenglonAncho =
				otdatos.otrenglon.PresupRenglonAncho;
			datosodefinitivos.PresupRenglonImpUnit =
				otdatos.otrenglon.PresupRenglonImpUnit;
			datosodefinitivos.PresupRenglonParamInt =
				otdatos.otrenglon.PresupRenglonParamInt;
			console.log("hay datosodefinitivos 1 ", datosodefinitivos);
			arreglodef.push = datosodefinitivos;
		} else {
			datosodefinitivos.id = renglones[0].id;
			datosodefinitivos.idPresupRenglon = renglones[0].idPresupRenglon;
			datosodefinitivos.PresupRenglonCant = renglones[0].PresupRenglonCant;
			datosodefinitivos.PresupRenglonDesc = renglones[0].PresupRenglonDesc;
			datosodefinitivos.PresupRenglonLargo = renglones[0].PresupRenglonLargo;
			datosodefinitivos.PresupRenglonAncho = renglones[0].PresupRenglonAncho;
			datosodefinitivos.PresupRenglonImpUnit =
				renglones[0].PresupRenglonImpUnit;
			datosodefinitivos.PresupRenglonParamInt =
				renglones[0].PresupRenglonParamInt;
			console.log("hay datosodefinitivos 2 ", datosodefinitivos);
			arreglodef.push = datosodefinitivos;
		}*/
// var datosodefinitivos = Object();
// var arreglodef = [];
// if (otdatos.otrenglon) {
// 	const returnedTarget = Object.assign(
// 		otdatos.renglonespresup[0],
// 		otdatos.otrenglon
// 	);
// 	console.log("returnedTarget  ", returnedTarget);
// }
// console.log("Object.entries ", Object.entries(otdatos.renglonespresup));
// // otdatos.renglonespresup.map((renglones, index) => {
// const result = Object.groupBy(otdatos.renglonespresup, ({ id }) => id);
// console.log("result de group  ", result);

// for (const [key, value] of Object.entries(otdatos.renglonespresup[0])) {
// 	console.log(`${key}: ${value}`);
// }
// // });
/* <Box
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
					{/* <TextField
						label="Cantidad"
						variant="outlined"
						multiline
						rows={4}
						fullWidth
					/>
					<TextField
						label="Comentarios"
						variant="outlined"
						multiline
						rows={4}
						fullWidth
					/>
				</Box>  */

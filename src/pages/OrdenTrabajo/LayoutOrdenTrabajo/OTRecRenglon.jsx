import { useEffect, useState } from "react";
import React from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo.jsx";
import { OTLeeEncPresup } from "./OTLeeEncPresup.jsx";
import { Box, Button, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import estilos from "../styles.module.css";
import OTDataGrid from "./OTDataGrid.jsx";

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#032a57" : "#eaf3ff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
	flexGrow: 3,
}));

export default function OTRecRenglon() {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	console.log("otdatos en OTRecREnglon  ", otdatos);
	async function datosencab() {
		//acá lee el encabezado del preuspuesto y los datos del cliente
		const encabezamiento = await OTLeeEncPresup(
			otdatos.renglonespresup[0][0].PresupRenglonNroPresup
		);
		setOTdatos({ ...otdatos, datosencab: encabezamiento });
	}

	useEffect(() => {
		if (otdatos.renglonespresup !== undefined) {
			datosencab();
		}
	}, [otdatos.renglonespresup]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleChange = (event) => {
		const id = event.target.id;
		setOTdatos({ ...otdatos, id: event.target.value });
	};

	if (otdatos.datosencab) {
		console.log(" otdatos.datosencab[0][0] ", otdatos.datosencab[0][0]);
		const dateValue = new Date(otdatos.datosencab[0][0].PresupEncabFecha);
		const formattedDate = dateValue.toLocaleDateString();
		return (
			<div style={{ width: 2000, padding: 20 }}>
				{/* <Stack spacing={{ xs: 1, sm: 2 }}
					direction="row"
					useFlexGap
					flexWrap="wrap"></Stack> */}
				<Box
					height={50}
					width={1600}
					boxShadow={1}
					padding={1}
					my={4}
					display="flex"
					alignItems="center"
					gap={4}
					// p={2}
					sx={{ border: "2px solid grey" }}
				>
					<Item className={estilos.items}>
						Número de Presupuesto: {otdatos.datosencab[0][0].idPresupEncab}
					</Item>
					{/* <Item>Fecha: {otdatos.datosencab[0][0].PresupEncabFecha}</Item> */}
					<Item className={estilos.items}>Fecha: {formattedDate}</Item>
					<Item className={estilos.items}>
						MayMin: {otdatos.datosencab[0][0].PresupEncabMayMin}
					</Item>

					<Item className={estilos.items}>
						Total: {otdatos.datosencab[0][0].PresupEncabTotal}
					</Item>
					<Item className={estilos.items}>
						Explicacion: {otdatos.datosencab[0][0].PresupEncabExplic}
					</Item>
				</Box>
				{(otdatos.datosencab.length > 1 && (
					<Box
						height={50}
						width={1600}
						my={4}
						display="flex"
						alignItems="center"
						gap={4}
						p={2}
						sx={{ border: "2px solid grey" }}
					>
						<TextField
							size="small"
							id="otdatos.datosencab[1][0].idClientes"
							label="Número de Cliente"
							fullWidth
							value={otdatos.datosencab[1][0].idClientes}
						/>
						<TextField
							size="small"
							variant="outlined"
							id="datosencab[1][0].ClientesDesc"
							fullWidth
							label="Cliente"
							value={otdatos.datosencab[1][0].ClientesDesc}
						/>

						<TextField
							size="small"
							id="otdatos.OTDomicilio"
							label="Domicilio"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesDomicilio}
						/>
						<TextField
							size="small"
							id="otdatos.OTCodPos"
							label="CodPos"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesCodPos}
						/>
						<TextField
							size="small"
							id="otdatos.OTLocalidad"
							label="Localidad"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesLoc}
						/>
						<TextField
							size="small"
							id="otdatos.OTPcia"
							label="Pcia"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesPcia}
						/>
						<TextField
							size="small"
							id="otdatos.OTTel"
							label="Tel"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesTel}
						/>
						<TextField
							size="small"
							id="otdatos.OTMail"
							label="Mail"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesMail}
						/>
						<TextField
							size="small"
							id="otdatos.OTCUIT"
							label="CUIT"
							fullWidth
							value={otdatos.datosencab[1][0].ClientesCUIT}
						/>
					</Box>
				)) ||
					((<></>),
					(
						<Box
							height={50}
							width={1600}
							my={4}
							display="flex"
							alignItems="center"
							gap={4}
							p={2}
							sx={{ border: "2px solid grey" }}
						>
							<Item>
								Cliente: {otdatos.datosencab[0][0].PresupEncabCliente}
							</Item>
						</Box>
					))}
				<OTDataGrid />
				{/* data={otdatos.renglonespresup} */}
			</div>
		);
	}
	// else {
	// 	return "";
	// }
}
{
	/* </TableContainer> */
}
{
	/* {fields.map((field, index) => (
					<input
						key={field.id} // important to include key with field's id
						{...register(`test.${index}.value`)}
					/>
				))} */
}
// <Box
// 	sx={{
// 		width: "100%",
// 		height: "500px",
// 		align: "center",
// 		justifycontent: "center",
// 		boxShadow: 5,
// 	}}
// >
// 	<DataGrid
// 		autoHeight
// 		sx={{
// 			width: "100%",
// 			"& .encabcolumns": {
// 				backgroundColor: "rgba(235, 240, 241, 0.3)",
// 				textJustify: "center",
// 				fontSize: "15px",
// 				fontWeight: "bold",
// 				color: "rgba(15, 6, 145)",
// 				borderRadius: 1,
// 				boxShadow: 3,
// 				bgcolor: "rgba(235, 240, 241, 0.3)",
// 				height: 10,
// 			},
// 		}}
// 		rows={otdatos.renglonespresup}
// 		columns={columns}
// 		title="Renglon Orden de Trabajo"
// 		// localeText={esES.components.MuiDataGrid.defaultProps.localeText}
// 		// slots={{
// 		// 	toolbar: CustomToolbar,
// 		// }}
// 		// getCellClassName={() => `super-app-theme--Open`}
// 		// getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
// 	/>
// </Box>

// let clientenuevo = [
// 	{
// 		idClientes: 0,
// 		ClientesDesc: clientepresup,
// 		ClientesDomicilio: "",
// 		ClientesCodPos: "",
// 		ClientesLoc: "",
// 		ClientesPcia: "",
// 		ClientesTel: "",
// 		ClientesMail: "",
// 		ClientesIVA: 0,
// 		ClientesCUIT: "",
// 		ClientesTipo: 0,
// 		ClientesContacto: "",
// 		ClientesCategoria: " ",
// 		ClientesObserv1: "",
// 		ClientesObserv2: "",
// 		ClientesFecha: 0,
// 	},
// ];
{
	/* {nivel1.map((nivel2) => (
										<div key={nivel2.id}>
											<p>{nivel2.id}</p>
											<p>{nivel2.PresupRenglonCant}</p>
											<p>{nivel2.PresupRenglonDesc}</p>
											<p>{nivel2.PresupRenglonImpUnit}</p>
											<p>{nivel2.PresupRenglonImpItem}</p> */
}
{
	/* <Table>
					<TableBody>
						<TableRow>
							{otdatos.renglonespresup.map((nivel1, index1) => (
								<div key={index1}>
									{nivel1.map((item) => {
										const paramObjeto = JSON.parse(item.PresupRenglonParamInt);
										return Object.entries(paramObjeto).map(([campo, valor]) => (
											<li key={campo}>
												<strong>{campo}:</strong> {valor}
											</li>
										));
									})}
								</div>
							))}
						</TableRow>
					</TableBody>
				</Table> */
}

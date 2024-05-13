import React, { useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../../context/OrdTrabajo.jsx";
import { Button, Dialog, Grid, Paper, TextField } from "@mui/material";
import { ClientesLeer } from "../../../Tablas/Clientes/ClientesLeer.jsx";
import { clientesleercod } from "../../../Tablas/Clientes/ClientesLeerCod.jsx";
export default function OTFilaGral(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [clientesleidos, setClientesleidos] = useState([]);
	const [items, setItems] = useState([]);
	const { datospot } = props;
	//open, handleClose,
	let idCliente;

	/*StkRubroAbr
: 
"ST840"
ancho
: 
"5"
cantidad
: 
1
cotdivisa
: 
0
detallep
: 
""
detaller
: 
""
ivasn
: 
"CIVA"
largo
: 
"8"
minmay
: 
"mn"
presupojalesc
: 
20
signomonet
: 
"$"
tipoojale
: 
"hz"
tipopresup
: 
"ABOLINADA" */
	let colorfondo = "";
	if (datospot.minmay === "my") {
		colorfondo = "#a6d4ff8d";
	} else {
		if (datospot.minmay === "mn" && datospot.tipopresup !== "CONFECCIONADA") {
			colorfondo = "#ffffa6ca";
		}
	}

	async function buscaclientes() {
		const datosclientes = await ClientesLeer();
		setClientesleidos(datosclientes);
	}
	let textdata;
	if (clientesleidos.length > 0) {
		textdata = [
			{
				id: "idCliente",
				label: "Clientes",
				value: idCliente,
				mapeo: (
					<>
						<option />
						{clientesleidos.map((option) => (
							<option key={option.id} value={option.id}>
								{option.ClientesDesc}
							</option>
						))}
					</>
				),
			},
		];
	}
	const handleChange = (event) => {
		const id = event.target.id;

		const indice = event.target.value - 1;
		console.log("Cantidad  ", items[indice].StkItemsCantDisp);
		console.log("datospot.anchor ", datospot.ancho);
		console.log("datospot.largo ", datospot.largo);
	};
	async function handleChange1(event) {
		const datosnuevocliente = await clientesleercod(event.target.value);
		otdatos.datosencab[1][0] = datosnuevocliente[0];
		if (otdatos.datosencab[1][0]) {
			setOTdatos({ ...otdatos, datosnuevocliente });
		} else {
			if (otdatos.datosencab[0]) {
				setOTdatos({ ...otdatos, datosclientes: datosnuevocliente });
			}
		}
	}
	return (
		<div>
			{/* <Dialog open={open} onClose={handleClose}> */}
			<Grid container style={{ backgroundColor: colorfondo }}>
				{/* <Grid item xs={1}>
					<TextField name="MayMin" value={datospot.minmay}></TextField>
				</Grid> */}
				{/* si se quiere cambiar el cliente */}
				<Grid item xs={1}>
					<Button onClick={buscaclientes}>Cambia Cliente</Button>
					{clientesleidos.length > 0 &&
						textdata.map((data) => (
							<TextField
								key={data.id}
								id={data.id}
								size="small"
								inputProps={{ maxLength: 3 }}
								select
								label={data.label}
								value={data.value}
								onChange={handleChange1}
								SelectProps={{ native: true }}
								variant="outlined"
								margin="dense"
							>
								{data.mapeo}
							</TextField>
						))}
				</Grid>

				{/* </Dialog> */}
			</Grid>
		</div>
	);
}

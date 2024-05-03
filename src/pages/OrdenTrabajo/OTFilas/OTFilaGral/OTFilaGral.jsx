import React, { useEffect, useState } from "react";
import { StkItemsLeeAbrRub } from "../../../Tablas/StkItems/StkItemsLeeAbrRub";
import { useContext } from "react";
import OrdTrabajo from "../../../../context/OrdTrabajo.jsx";
import { Button, Dialog, Grid, TextField } from "@mui/material";
import { ClientesLeer } from "../../../Tablas/Clientes/ClientesLeer.jsx";
import { clientesleercod } from "../../../Tablas/Clientes/ClientesLeerCod.jsx";
export default function OTFilaGral(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [clientesleidos, setClientesleidos] = useState([]);
	const [items, setItems] = useState([]);
	const { datospot } = props;
	//open, handleClose,
	console.log("datospot  ", datospot);
	let idCliente, idItems;
	async function stkleeitemsrubro(cuallee) {
		const result = await StkItemsLeeAbrRub(cuallee);
		setItems(result);
	}

	useEffect(() => {
		stkleeitemsrubro(datospot.StkRubroAbr);
	}, [datospot]); // eslint-disable-line react-hooks/exhaustive-deps

	const textdataI = [
		{
			id: "idItems",
			label: "Color",
			value: idItems,
			mapeo: (
				<>
					<option />
					{items.map((option) => (
						<option key={option.idStkItems} value={option.idStkItems}>
							{option.StkItemsDesc}
						</option>
					))}
				</>
			),
		},
	];

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

		console.log(" event.target.value ", event.target.value);
		console.log(" event.target.id ", event.target.id);
	};
	async function handleChange1(event) {
		const id = event.target.id;
		const datosnuevocliente = await clientesleercod(event.target.value);
		console.log("datosnuevocliente  ", datosnuevocliente);
		setOTdatos(...otdatos, datosencab[1][0], datosnuevocliente);
		console.log(" event.target.value ", event.target.value);
		console.log(" event.target.id ", event.target.id);
	}
	return (
		<div>
			{/* <Dialog open={open} onClose={handleClose}> */}
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
			<Grid item xs={1}>
				{textdataI.map((data) => (
					<TextField
						key={data.id}
						id={data.id}
						size="small"
						inputProps={{ maxLength: 3 }}
						select
						label={data.label}
						value={data.value}
						onChange={handleChange}
						SelectProps={{ native: true }}
						variant="outlined"
						margin="dense"
					>
						{data.mapeo}
					</TextField>
				))}
				{/* </Dialog> */}
			</Grid>
		</div>
	);
}

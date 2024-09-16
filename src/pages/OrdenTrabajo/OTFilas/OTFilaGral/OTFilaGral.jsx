import React, { useEffect, useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../../context/OrdTrabajo.jsx";
import { llenarcolumns } from "../../../Tablas/Clientes/columns.jsx";
import { formdata } from "../../../Tablas/Clientes/formdata.js";
import { Box, Button, Grid, TextField } from "@mui/material";
import { ClientesLeer } from "../../../Tablas/Clientes/ClientesLeer.jsx";
import { clientesleercod } from "../../../Tablas/Clientes/ClientesLeerCod.jsx";
import { leerTransporte } from "../../../Tablas/Transporte/TransporteLeer.jsx";
import { TransporteLeerCod } from "../../../Tablas/Transporte/TransporteLeerCod.jsx";
import { OTCondPagoLeer } from "../../../Tablas/OTCondPago/OTCondPagoLeer.jsx";
// import { TransporteLeerTodo } from "../../../Tablas/Transporte/TransporteLeerTodo.jsx";
import styles from "../../../../Styles/Boton.module.css";
import { DialogoDatos } from "../../../../components/DialogoDatos.jsx";
import TablasContexto from "../../../../context/TablasContext.jsx";
import { ClientesLeerUltimo } from "../../../Tablas/Clientes/ClientesLeerUltimo.jsx";
export default function OTFilaGral(props) {
	const { formdatos, setFormdatos } = useContext(TablasContexto);
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [clientesleidos, setClientesleidos] = useState([]);
	const [transportes, setTransportes] = useState([]);
	const [otcondpago, setOtcondpago] = useState([]);
	const [items, setItems] = useState([]);
	const { datospot } = props;
	// para el alta del nuevo cliente
	const [columns, setColumns] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [nombreboton, setNombreBoton] = useState("");
	const [titulodial, setTituloDial] = useState("");
	const [paramsbor, setParamsBor] = useState(0);

	let idCliente;
	let idTransporte;
	let OTEncabOC;
	let OTEncabDetalles;
	let colorfondo = "";
	const [checked, setChecked] = useState(false);

	if (datospot.minmay === "my") {
		colorfondo = "#a6d4ff8d";
	} else {
		if (datospot.minmay === "mn" && datospot.tipopresup !== "CONFECCIONADA") {
			colorfondo = "#ffffa6ca";
		}
	}
	async function buscatransporte() {
		const datostransporte = await leerTransporte();

		setTransportes(datostransporte);
	}
	async function buscaotcondpago() {
		const otcondpago = await OTCondPagoLeer();

		setOtcondpago(otcondpago);
	}
	async function buscaclientes() {
		const datosclientes = await ClientesLeer();
		setClientesleidos(datosclientes);
	}

	async function buscaclientesultimo() {
		const datosclientes = await ClientesLeerUltimo();
		setClientesleidos(datosclientes);
	}
	// para el alta del nuevo cliente

	async function columnsFetch() {
		var col = await llenarcolumns();
		setColumns(() => col);
	}

	const handleAlta = () => {
		setFormdatos(formdata);
		columnsFetch();
		setNombreBoton("Enviar");
		setTituloDial(`Alta de ${formdatos.tablabase}`);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		buscaclientesultimo();
	};
	useEffect(() => {
		buscatransporte();
		buscaotcondpago();
	}, []);

	let textdata;
	if (clientesleidos.length > 0) {
		textdata = [
			{
				id: "id",
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
	let textdata1;

	if (transportes.length > 0) {
		textdata1 = [
			{
				id: "id",
				label: "Transportes",
				value: idTransporte,
				mapeo: (
					<>
						<option />
						{transportes.map((option) => (
							<option key={option.id} value={option.id}>
								{option.TransporteDesc}
							</option>
						))}
					</>
				),
			},
		];
	}
	let textdata2;
	if (otcondpago.length > 0) {
		textdata2 = [
			{
				id: "id",
				label: "CondPago",
				value: idTransporte,
				mapeo: (
					<>
						<option />
						{otcondpago.map((option) => (
							<option key={option.id} value={option.id}>
								{option.OTCondPagoDesc}
							</option>
						))}
					</>
				),
			},
		];
	}
	const handleChange = (event) => {
		const id = event.target.id;
		setOTdatos({ ...otdatos, [id]: event.target.value });
	};

	async function handleChanget(event) {
		// const id = event.target.id;
		if (event.target.value === "") {
			setOTdatos({ ...otdatos, transporte: "" });
		} else {
			var transporte = await TransporteLeerCod(event.target.value);
			setOTdatos({ ...otdatos, transporte: transporte[0] });
		}
	}
	async function handleChangecp(event) {
		if (event.target.value === "") {
			setOTdatos({ ...otdatos, condpago: "" });
		} else {
			var condpago = await TransporteLeerCod(event.target.value);
			setOTdatos({ ...otdatos, condpago: condpago[0] });
		}
	}
	async function handleChange1(event) {
		const datosnuevocliente = await clientesleercod(event.target.value);
		if (otdatos.datosencab.length === 1) {
			otdatos.datosencab[1] = [];
		}
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
			<Grid
				container
				style={{ backgroundColor: "colorfondo" }}
				spacing={2}
				// alignItems="center"
			>
				{/* si se quiere cambiar el cliente */}
				<Grid>
					<Button
						onClick={buscaclientes}
						variant="contained"
						color="primary"
						className={styles.botonabreselect}
					>
						Otro Cliente
					</Button>
				</Grid>
				<Grid>
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
				<DialogoDatos
					open={open}
					columns={columns}
					handleClose={handleClose}
					nombrebtn={nombreboton}
					paramsbor={paramsbor}
					titulodial={titulodial}
				/>
				<Grid>
					<Button
						onClick={handleAlta}
						variant="contained"
						color="primary"
						className={styles.botonabreselect}
					>
						Nuevo Cliente
					</Button>
				</Grid>
				<Grid>
					{transportes.length > 0 &&
						textdata1.map((data) => (
							<TextField
								key={data.id}
								id={data.id}
								size="small"
								inputProps={{ maxLength: 3 }}
								select
								label={data.label}
								value={data.value}
								onChange={handleChanget}
								SelectProps={{ native: true }}
								variant="outlined"
								margin="dense"
							>
								{data.mapeo}
							</TextField>
						))}
				</Grid>
				<Grid>
					<TextField
						inputProps={{ maxLength: 45 }}
						size="small"
						variant="outlined"
						id="OTEncabOC"
						type="text"
						label="Orden de Compra"
						placeholder="Orden de Compra"
						fullWidth
						margin="dense"
						value={OTEncabOC}
						onChange={handleChange}
						// className={styles.textField}
					/>
				</Grid>
				<Grid>
					<TextField
						inputProps={{ maxLength: 45 }}
						size="small"
						variant="outlined"
						id="OTEncabDetalles"
						type="text"
						label="Detalles"
						placeholder="Detalles"
						fullWidth
						margin="dense"
						value={OTEncabDetalles}
						onChange={handleChange}
						// className={styles.textField}
					/>
				</Grid>
				<Grid>
					{otcondpago.length > 0 &&
						textdata2.map((data) => (
							<TextField
								key={data.id}
								id={data.id}
								size="small"
								inputProps={{ maxLength: 3 }}
								select
								label={data.label}
								value={data.value}
								onChange={handleChangecp}
								SelectProps={{ native: true }}
								variant="outlined"
								margin="dense"
							>
								{data.mapeo}
							</TextField>
						))}
				</Grid>
			</Grid>
		</div>
	);
}

{
	/* <Grid item xs={4}>
					<FormControl component="fieldset">
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox checked={checked} onChange={handleChangeC} />
								}
								label="Según Medidas"
							/>
						</FormGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					{checked && (
						<Grid container item>
							<Grid item xs={1}>
								<TextField
									inputProps={{ maxLength: 3 }}
									size="small"
									variant="outlined"
									id="LargoFinal"
									type="number"
									label="Largo Final"
									placeholder="Largo Final"
									fullWidth
									margin="dense"
									value={otdatos.OTLargoFinal}
									onChange={handleChange}
									// className={styles.textField}
								/>
							</Grid>

							<Grid item xs={1}>
								<TextField
									inputProps={{ maxLength: 3 }}
									size="small"
									variant="outlined"
									id="AnchoFinal"
									type="number"
									label="Ancho Final"
									placeholder="Ancho Final"
									fullWidth
									margin="dense"
									value={otdatos.OTAnchoFinal}
									onChange={handleChange}
									// className={styles.textField}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									inputProps={{ maxLength: 3 }}
									size="small"
									variant="outlined"
									id="MetrosCuadrados"
									type="number"
									label="Mts Cuadrados"
									placeholder="Mts Cuadrados"
									fullWidth
									margin="dense"
									value={otdatos.OTMetrosCuadrados}
									onChange={handleChange}
									// className={styles.textField}
								/>
							</Grid>
						</Grid>
					)}
				</Grid> */
}
{
	/* </Dialog> */
}

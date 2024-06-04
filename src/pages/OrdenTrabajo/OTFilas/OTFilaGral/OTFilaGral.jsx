import React, { useEffect, useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../../context/OrdTrabajo.jsx";
import {
	Button,
	Checkbox,
	Dialog,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Paper,
	TextField,
} from "@mui/material";
import { ClientesLeer } from "../../../Tablas/Clientes/ClientesLeer.jsx";
import { clientesleercod } from "../../../Tablas/Clientes/ClientesLeerCod.jsx";
import estilos from "../../../OrdenTrabajo/styles.module.css";
import styles from "../../../../Styles/Tabla.module.css";
import { StyleOutlined } from "@mui/icons-material";
export default function OTFilaGral(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const [clientesleidos, setClientesleidos] = useState([]);
	const [items, setItems] = useState([]);
	const { datospot } = props;

	let idCliente;
	let colorfondo = "";
	const [checked, setChecked] = useState(false);

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
	const handleChangeC = (event) => {
		setChecked(event.target.checked);
	};
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
		setOTdatos({ ...otdatos, [id]: event.target.value });
	};
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
				<Grid item xs={2}>
					<Button
						onClick={buscaclientes}
						variant="contained"
						color="primary"
						// className={styles.botontablamuestrarenglon}
					>
						Cambia Cliente
					</Button>
				</Grid>
				<Grid item>
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

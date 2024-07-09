import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	Grid,
	Radio,
	RadioGroup,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../context/OrdTrabajo";
import { StkItemsLeeAbrRub } from "../../Tablas/StkItems/StkItemsLeeAbrRub";
import styles from "../styles.module.css";
import estilos from "../../../Styles/Boton.module.css";
import { OTDatosLeer } from "../OTVarios/OTDatosLeer";
export default function OTFilasConf(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);
	const { datosgenot, setDatosgenot } = useContext(OrdTrabajo);
	const [datosconfec, setDatosConfec] = useState();
	const [checked, setChecked] = useState(false);
	const { datospot } = props;
	const [items, setItems] = useState([]);
	let idCliente, idItems, coloreleg, datorest1;
	const [datosrestantes, setDatosRestantes] = useState([]);

	async function leedatosot() {
		setDatosgenot({ ...datosgenot, idrenglon: datospot.idrenglon });
		const result = await OTDatosLeer(datospot.tipopresup);

		const datos = result.map((row) => ({
			nombre: row.OTDatosDesc,
			opciones: JSON.parse(row.OTDatosOpciones),
			tipocomponete: row.OTDatosTipoPed,
			requerido: row.OTDatosRequerido,
		}));
		const countRequiredS = datos.filter(
			(item) => item.requerido === "S"
		).length;
		setDatosRestantes(datos);
		setOTdatos({ ...otdatos, totaldatos: countRequiredS });
	}
	async function stkleeitemsrubro(cuallee) {
		const result = await StkItemsLeeAbrRub(cuallee);
		setItems(result);
	}
	useEffect(() => {
		stkleeitemsrubro(datospot.StkRubroAbr);
	}, [datospot]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		leedatosot();
	}, [datospot]); // eslint-disable-line react-hooks/exhaustive-deps

	const textdataI = [
		{
			id: "coloreleg",
			label: "Color",
			value: coloreleg,
			mapeo: (
				<>
					<option></option>
					{items.map((option) => (
						<option key={option.StkItemsDesc} value={option.StkItemsDesc}>
							{option.StkItemsDesc}
						</option>
					))}
				</>
			),
		},
	];

	const handleChangeG = (event) => {
		const id = event.target.id;
		setDatosgenot({ ...datosgenot, [id]: event.target.value });
	};

	const Terminocarga = () => {
		setOTdatos({ ...otdatos, datosconfec: datosgenot });
	};
	const [backgroundColor, setBackgroundColor] = useState("");

	const handleChange = (selectedIndex, event) => {
		setDatosgenot({ ...datosgenot, ColorMaterial: event.target.value });

		const indice = selectedIndex;
		let paños = (datospot.largo * 1 + 0.08) / 1.48;
		const decimalPart = parseFloat(paños) - parseInt(paños);

		if (decimalPart < 0.5) {
			paños = parseInt(paños) + 0.5;
		} else {
			paños = parseInt(paños) + 1;
		}

		let canttela = (datospot.ancho * 1 + 0.08) * paños;
		if (canttela > items[indice].StkItemsCantDisp) {
			setBackgroundColor("lightcoral"); // Cambia el color de fondo si el resultado es mayor de 50
		} else {
			setBackgroundColor("lightgreen"); // Cambia el color de fondo si el resultado es menor o igual a 50
		}
	};
	const { largo } = datospot;

	return (
		<div>
			<Grid container spacing={2} alignItems="center">
				{/* acá muestra opción de colores */}

				{textdataI.map((data, index) => (
					<TextField
						className={`${styles.textField} ${
							backgroundColor && styles[backgroundColor]
						}`}
						// style={{ background: "#7a7af318" }}
						key={data.id}
						id={data.id}
						size="small"
						inputProps={{ maxLength: 3 }}
						select
						label={data.label}
						value={data.value}
						helperText="Requerido"
						onChange={(event) =>
							handleChange(event.target.selectedIndex, event)
						}
						SelectProps={{ native: true }}
						variant="outlined"
						margin="dense"
					>
						{data.mapeo}
					</TextField>
				))}
				{/* </Grid> */}

				{datosrestantes.map((dato, index) => (
					<div key={index}>
						{dato.tipocomponete === "select" && (
							<TextField
								id={dato.nombre}
								size="small"
								select
								onChange={handleChangeG}
								defaultValue={dato.nombre}
								sx={{ input: { color: "#00000f" } }}
								label={dato.nombre}
								placeholder={dato.nombre}
								helperText={dato.requerido === "S" ? "Requerido" : "------"}
								variant="outlined" // Puedes cambiar el tipo de variante según tus preferencias
								margin="dense"
								style={
									dato.requerido === "S"
										? { background: "#7a7af318" }
										: { background: "#94fcd42b" }
								}
								inputProps={{
									maxLength: 3,
								}}
								SelectProps={{
									native: true, // Esto es importante para que funcione como un campo de texto select
								}}
							>
								{Object.keys(dato.opciones).map((opcion, index) => (
									<option key={index} value={opcion}>
										{opcion}
									</option>
								))}
							</TextField>
						)}
						{dato.tipocomponete === "textfield" && (
							<TextField
								disabled={largo === "N"}
								size="small"
								variant="outlined"
								id={dato.nombre}
								sx={{ input: { color: "#00000f" } }}
								label={dato.nombre}
								placeholder={dato.nombre}
								helperText={dato.requerido === "S" ? "Requerido" : "-----"}
								fullWidth
								style={
									dato.requerido === "S"
										? { background: "#7a7af318" }
										: { background: "#94fcd42b" }
								}
								margin="dense"
								value={otdatos.OTDatosDesc}
								onChange={handleChangeG}
							/>
						)}{" "}
					</div>
				))}
				<Button onClick={Terminocarga} className={estilos.botonfincargadatos}>
					Fin de Carga
				</Button>
			</Grid>
		</div>
	);
}
{
	/*  style: {
          minWidth: calculateMinWidth(elemento[nombrePropiedad]),
          maxWidth: calculateMaxWidth(elemento[nombrePropiedad]),
        }, */
	/* 
	{/* <Grid item xs={4}>
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
	
	
	<p>StkRubroAbr: {StkRubroAbr}</p>
			<p>minmay: {minmay}</p>
			<p>ivasn: {ivasn}</p>
			<p>cantidad: {cantidad}</p>
			<p>detallep: {detallep}</p>
			<p>detaller: {detaller}</p>
			<p>largo: {largo}</p>
			<p>ancho: {ancho}</p>
			<p>tipopresup: {tipopresup}</p>
			<p>cotdivisa: {cotdivisa}</p>
			<p>signomonet: {signomonet}</p>
			<p>drenajesn: {drenajesn}</p>
			<p>tipoojale: {tipoojale}</p>
<Grid item xs={1}>
				{drenajesn === "cd" && (
					<TextField
						disabled={largo === "N"}
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="CantDrenajes"
						type="number"
						label="Cantidad de Drenajes"
						fullWidth
						margin="dense"
						value={datosgenot.CantDrenajes}
						onChange={handleChangeG}
						className={classes.textField}
					/>
				)}
			</Grid> */
	/*<Grid item xs={1}>
						{dato.tipocomponete === "select" &&
							((<label>{dato.nombre}</label>),
							(
								<select
									className={classes.select}
									value={dato.nombre}
									onChange={handleChangeG}
									id={dato.nombre}
								>
									{Object.keys(dato.opciones).map((opcion, index) => (
										<option key={index} value={opcion}>
											{opcion}
										</option>
									))}
								</select>
							))}{" "}
					</Grid>*/
	/*<label>{dato.nombre}</label>
							<select
								onChange={handleChangeG}
								id={dato.nombre}
								defaultChecked={dato.nombre}
							>
								{Object.keys(dato.opciones).map((opcion, index) => (
									<option key={index} value={opcion}>
										{opcion}
									</option>
								))}
							</select>
						</Grid>
					)}{" "} */
}

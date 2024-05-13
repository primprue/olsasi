import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import OrdTrabajo from "../../../../context/OrdTrabajo";
import { StkItemsLeeAbrRub } from "../../../Tablas/StkItems/StkItemsLeeAbrRub";

import styles from "../../styles.module.css";
import { OTDatosLeer } from "../../OTVarios/OTDatosLeer";
export default function OTPiletaEnrollable(props) {
	const { otdatos, setOTdatos } = useContext(OrdTrabajo);

	const [stockneg, setStockNeg] = useState(false);
	const [datosgenot, setDatosgenot] = useState({
		CantDrenajes: 0,
		StkItemsDesc: "",
	});
	console.log("datosgenot  ", datosgenot);
	const { datospot } = props;
	const [items, setItems] = useState([]);
	let idCliente, idItems, coloreleg, datorest1;
	const [datosrestantes, setDatosRestantes] = useState([]);
	async function leedatosot() {
		const result = await OTDatosLeer("PiletaEnrollable");
		//setDatosRestantes(result);
		// result.map((resultado) => {
		// 	console.log("  resultado.OTDatosDesc; ", resultado.OTDatosDesc);
		// 	console.log("resultado.OTDatosOpciones;  ", resultado.OTDatosOpciones);
		// 	const nombrearray = resultado.OTDatosDesc;
		// 	const opcionesObj = JSON.parse(resultado.OTDatosOpciones);
		// 	console.log(" opcionesObj  ", opcionesObj);
		// 	const arrays = {
		// 		[nombrearray]: [],
		// 	};
		// 	arrays[nombrearray] = Object.entries(opcionesObj);
		// 	console.log(" arrays[variable1]  ", arrays[nombrearray]);
		// 	console.log("nombrearray  ", nombrearray);

		const datos = result.map((row) => ({
			nombre: row.OTDatosDesc,
			opciones: JSON.parse(row.OTDatosOpciones),
		}));
		setDatosRestantes(datos);
		console.log("datos  ", datos);
		// });
	}
	async function stkleeitemsrubro(cuallee) {
		const result = await StkItemsLeeAbrRub(cuallee);

		/* trae   {
						idStkItems: 1,
						StkItemsDesc: 'BLANCO',
						StkItemsCantDisp: 75.5
					},*/
		setItems(result);
	}
	useEffect(() => {
		stkleeitemsrubro(datospot.StkRubroAbr);
	}, [datospot]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		leedatosot();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	const [opciones, setOpciones] = useState([]);
	// if (datosrestantes) {
	// 	// console.log("datosrestantes  ", datosrestantes);
	// 	let i = 0;
	// 	let opcionesArray;
	// 	datosrestantes.forEach(function () {
	// 		// const data = [
	// 		// 	{
	// 		// 		OTDatosOpciones:
	// 		// 			'{"Cuadrado Chico": 0, "Redondo Grande": 0, "Cuadrado Grande": 0, "Redondo tipo Pistón": 0}',
	// 		// 	},
	// 		// ];

	// 		// // Obtenemos el objeto opciones del primer elemento del array
	// 		// opcionesObj = JSON.parse(datosrestantes[i].OTDatosOpciones);

	// 		// // Convertimos el objeto en un array de pares [clave, valor]
	// 		// opcionesArray = Object.entries(opcionesObj);

	// 		// Establecemos las opciones

	// 		i++;
	// 	});
	// }

	const textdataI = [
		{
			id: "coloreleg",
			label: "Color",
			value: coloreleg,
			mapeo: (
				<>
					<option />
					{items.map((option) => (
						<option key={option.StkItemsDesc} value={option.StkItemsDesc}>
							{option.StkItemsDesc}
						</option>
					))}
				</>
			),
		},
	];

	const textdataII = [
		{
			id: "datorest1",
			label: datosrestantes.nombre,
			value: datorest1,
			mapeo: (
				<>
					<option />
					{datosrestantes.map((option) => (
						<option key={option.opciones} value={option.opciones}>
							{option.opciones}
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
	const [backgroundColor, setBackgroundColor] = useState("");

	const handleChange = (selectedIndex, event) => {
		setDatosgenot({ ...datosgenot, StkItemsDesc: event.target.value });
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
	const {
		StkRubroAbr,
		minmay,
		ivasn,
		cantidad,
		detallep,
		detaller,
		largo,
		ancho,
		tipopresup,
		cotdivisa,
		signomonet,
		drenajesn,
		tipoojale,
	} = datospot;
	const classes = styles;

	return (
		<Grid container>
			{/* acá muestra opción de colores */}
			<Grid item xs={1}>
				{textdataI.map((data, index) => (
					<TextField
						className={`${styles.textField} ${
							backgroundColor && styles[backgroundColor]
						}`}
						key={data.id}
						id={data.id}
						size="small"
						inputProps={{ maxLength: 3 }}
						select
						label={data.label}
						value={data.value}
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
			</Grid>
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
			</Grid>
			<Grid item xs={1}>
				{datosrestantes.map((dato, index) => (
					<div key={index}>
						<label>{dato.nombre}</label>
						<select>
							{Object.keys(dato.opciones).map((opcion, index) => (
								<option key={index} value={opcion}>
									{opcion}
								</option>
							))}
						</select>
					</div>
				))}
			</Grid>
			<Grid item xs={1}>
				{datosrestantes.map((dato, index) => (
					<div key={index}>
						<label>{dato.nombre}</label>
						<select>
							{Object.keys(dato.opciones).map((opcion, index) => (
								<option key={index} value={opcion}>
									{opcion}
								</option>
							))}
						</select>
					</div>
				))}
			</Grid>
			{/* <p>StkRubroAbr: {StkRubroAbr}</p>
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
			<p>tipoojale: {tipoojale}</p> */}
		</Grid>
	);
}

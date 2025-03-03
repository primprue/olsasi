import React, { useEffect, useState, useRef } from "react";
import Estilos from "./Ingreso.module.css";
import { Card, CardContent, Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { columnasdi } from "./columnasdi";
import { stkrubrolee } from "./LeeRubro";
import { stkgrupoleer } from "./LeeGrupos";
import { datosingreso } from "./DatosIngreso";
import { sumaingreso } from "./SumaIngreso";

// Context
import { useContext } from "react";
import { MovStockPantContext } from "../../MovStockPant";
import { DataGrid } from "@mui/x-data-grid";
import { Proveedoresleertipo26 } from "./Proveedoresleertipo26";
import { esES } from '@mui/material/locale';
export default function PantallaMovimiento(props) {
	const { state, setState } = useContext(MovStockPantContext);
	const [trigger, setTrigger] = useState(false);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);
	const [indicetabla, setIndicetabla] = useState(-1);
	const [cantpres, setCantpres] = useState(0);
	const [canting, setCanting] = useState(0);
	const textInput = useRef(null);
	const textInput1 = useRef(null);
	const textInput2 = useRef(null);
	let abrrrubro;
	let agregaingreso = "";

	async function dataFetch() {
		const result = await Proveedoresleertipo26();
		setState({ ...state, proveed26: result });
	}
	async function leegrupos() {
		const result = await stkgrupoleer();
		setState({ ...state, stkgrupos: result });
	}

	async function leerubros(codigogrupo) {
		const result = await stkrubrolee(codigogrupo);
		setState({ ...state, stkrubro: result });
	}

	async function cambioingreso(event) {
		const id = event.target.id;
		if (id === "cantpres") {
			setCantpres(event.target.value);
		} else {
			setCanting(event.target.value);
		}
	}
	async function handleChange(event) {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
		setIndicetabla(-1);
		if (id === "StkRubroAbr") {
			abrrrubro = event.target.value;
			const result = await datosingreso(abrrrubro);
			setData(result);
			const col = await columnasdi();
			setColumns(() => col);
		}
	}

	useEffect(() => {
		if (state.idStkGrupo === "") {
			leegrupos();
		}
		if (state.idStkGrupo !== "") {
			leerubros(state.idStkGrupo);
		}
	}, [state.idStkGrupo]); // eslint-disable-line react-hooks/exhaustive-deps

	const miraitem = (indicetabla, roweleg) => {
		setSelectedRow(roweleg);
		setIndicetabla(indicetabla);
		setCantpres(0);
		setCanting(0);
	};


	async function botonok() {
		setState({ ...state, totaling: cantpres * canting });

		var infingreso = [
			{
				tingreso: cantpres * canting,
				abrevrubro: state.StkRubroAbr,
				indiceitem: selectedRow.idStkItems,
			},
		];
		agregaingreso = await sumaingreso(infingreso);
		var it = selectedRow.id;
		data[it - 1].StkItemsCantDisp =
			agregaingreso.body[1][0].StkItemsCantDisp;
		data[it - 1].StkItemsCantidad =
			agregaingreso.body[1][0].StkItemsCantidad;
		setData(data);
		setTrigger((prev) => !prev);
		it < data.length - 1 ? it++ : it--;
		miraitem(it);
	}

	const handleProcessRowUpdate = (newRow, oldRow) => {
		setData((prevRows) =>
			prevRows.map((row) => (row.id === newRow.id ? newRow : row))
		);
		return newRow;
	};

	const textdata = [
		{
			id: "idStkGrupo",
			label: "Grupo",
			value: state.idStkGrupo,
			mapeo: (
				<>
					<option></option>
					{state.stkgrupos.map((option) => (
						<option key={option.idStkGrupo} value={option.idStkGrupo}>
							{option.StkGrupoDesc}
						</option>
					))}
				</>
			),
		},
		{
			id: "StkRubroAbr",
			label: "Rubro",
			value: state.StkRubroAbr,
			mapeo: (
				<>
					<option></option>
					{state.stkrubro.map((option) => (
						<option key={option.StkRubroAbr} value={option.StkRubroAbr}>
							{option.StkRubroDesc}
						</option>
					))}
				</>
			),
		},
	];
	const proveed = [
		{
			id: "idProveedores",
			label: "Proveedor",
			value: state.idProveedores,
			mapeo: (
				<>
					<option />
					{state.proveed26.map((option) => (
						<option key={option.idProveedores} value={option.idProveedores}>
							{option.ProveedoresDesc}
						</option>
					))}
				</>
			),
		},
	];
	return (
		<div className={Estilos.contenedor}>
			<div className={Estilos.contenedor1}>
				{textdata.map((datos) => (
					<TextField
						className={Estilos.selector}
						key={datos.id}
						id={datos.id}
						size="small"
						input={{ maxLength: 3 }}
						select
						label={datos.label}
						value={datos.value}
						onChange={handleChange}
						SelectProps={{ native: true }}
						variant="outlined"
						margin="dense"
					>
						{datos.mapeo}
					</TextField>
				))}

				<DataGrid
					key={trigger} // El cambio en trigger fuerza el re-renderizado
					rows={data}
					columns={columns}
					localeText={esES}
					onRowClick={(evt, selectedRow) => {
						setSelectedRow(evt.row);
						miraitem(evt.id, evt.row);

					}}
					processRowUpdate={handleProcessRowUpdate}
				/>

			</div>
			<div className={Estilos.contenedor2}>
				{selectedRow ? (
					<Card>
						<CardContent className={Estilos.card1}>
							<Grid container>
								La presentación de la mercadería es :<br></br>
								{selectedRow.StkRubroPresDes} de {selectedRow.StkRubroPres}{" "}
								{selectedRow.StkRubroUM}
								{selectedRow.StkRubroAncho !== 0 &&
									" por " +
									selectedRow.StkRubroAncho +
									" " +
									selectedRow.StkItemsDesc}
							</Grid>
							<br></br>

							<label> Ingresaron </label>
							<TextField
								input={{ maxLength: 4 }}
								className={Estilos.input}
								inputRef={textInput}
								size="small"
								type="number"
								id="cantpres"
								onChange={cambioingreso}
								value={cantpres}
								autoFocus
								onKeyDown={(e1) => {
									if (e1.key === "Enter") {
										setTimeout(() => {
											textInput1.current.focus();
										}, 100);
									}
								}}
							/>
							<label> de </label>

							<TextField
								input={{ maxLength: 4 }}
								className={Estilos.input}
								inputRef={textInput1}
								size="small"
								type="number"
								id="canting"
								onChange={cambioingreso}
								value={canting}
								onKeyDown={(e2) => {
									if (e2.key === "Enter") {
										setTimeout(() => {
											textInput2.current.focus();
										}, 100);
									}
								}}
							/>

							<Button
								onClick={botonok}
								ref={textInput2}

							>
								{" "}
								TOTAL INGRESADO: {cantpres * canting}
							</Button>

						</CardContent>
					</Card>
				) : (
					""
				)}

			</div>
		</div>
	);
}

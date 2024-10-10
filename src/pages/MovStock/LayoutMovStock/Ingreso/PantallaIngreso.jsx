import React, { useEffect, useState, useRef } from "react";
import Estilos from "./Ingreso.module.css";
import { Card, CardContent, Button, Grid, TextField } from "@mui/material";

import { columnasdi } from "./columnasdi";
import { stkrubrolee } from "./LeeRubro";
import { stkgrupoleer } from "./LeeGrupos";
import { datosingreso } from "./DatosIngreso";
import { sumaingreso } from "./SumaIngreso";

// Context
import { useContext } from "react";
import { MovStockPantContext } from "../../MovStockPant";
import { DataGrid, esES } from "@mui/x-data-grid";

export default function PantallaIngreso(props) {
	const { state, setState } = useContext(MovStockPantContext);
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

	const miraitem = (indicetabla) => {
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
				indiceitem: data[indicetabla].idStkItems,
			},
		];
		agregaingreso = await sumaingreso(infingreso);
		data[indicetabla].StkItemsCantDisp =
			agregaingreso.body[1][0].StkItemsCantDisp;
		data[indicetabla].StkItemsCantidad =
			agregaingreso.body[1][0].StkItemsCantidad;
		var it = indicetabla;
		it < data.length - 1 ? it++ : it--;
		setSelectedRow(it);
		miraitem(it);
	}

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

	return (
		<div className={Estilos.contenedor}>
			<div className={Estilos.contenedor1}>
				{textdata.map((datos) => (
					<TextField
						className={Estilos.selector}
						key={datos.id}
						id={datos.id}
						size="small"
						inputProps={{ maxLength: 3 }}
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
					rows={data}
					columns={columns}
					localeText={esES.components.MuiDataGrid.defaultProps.localeText}
					onRowClick={(evt, selectedRow) => {
						
					setSelectedRow(evt.id);
						miraitem(evt.id);
						setTimeout(() => {
							textInput.current.focus();
						}, 100);
					
						// setSelectedRow(selectedRow.tableData.id);
						// miraitem(selectedRow.tableData.id);
						// setTimeout(() => {
						// 	textInput.current.focus();
						// }, 100);
					}}
				/>
				{/* <MaterialTable
					id="tablaDatos"
					title="Items de Rubro"
					columns={columns}
					data={data}
					icons={tableIcons}
					localization={localization}
					className={Estilos.contenedor1}
					onRowClick={(evt, selectedRow) => {
						setSelectedRow(selectedRow.tableData.id);
						miraitem(selectedRow.tableData.id);
						setTimeout(() => {
							textInput.current.focus();
						}, 100);
					}}
				/> */}
			</div>
			<div className={Estilos.contenedor2}>
				{/* <div> */}
				{indicetabla !== -1 ? (
					<Card>
						<CardContent className={Estilos.card1}>
							<Grid container>
								La presentación de la mercadería es :<br></br>
								{data[0].StkRubroPresDes} de {data[0].StkRubroPres}{" "}
								{data[0].StkRubroUM}
								{data[0].StkRubroAncho !== 0 &&
									" por " +
										data[0].StkRubroAncho +
										" " +
										data[indicetabla].StkItemsDesc}
							</Grid>
							<br></br>

							{/* <Grid item xs={12} md={2} lg={12} > */}
							<label> Ingresaron </label>
							<TextField
								inputProps={{ maxLength: 4 }}
								className={Estilos.input}
								inputRef={textInput}
								size="small"
								type="number"
								id="cantpres"
								onChange={cambioingreso}
								value={cantpres}
								autoFocus
								onKeyPress={(e1) => {
									if (e1.key === "Enter") {
										setTimeout(() => {
											textInput1.current.focus();
										}, 100);
									}
								}}
							/>
							<label> de </label>

							<TextField
								inputProps={{ maxLength: 4 }}
								className={Estilos.input}
								inputRef={textInput1}
								size="small"
								type="number"
								id="canting"
								onChange={cambioingreso}
								value={canting}
								onKeyPress={(e2) => {
									if (e2.key === "Enter") {
										setTimeout(() => {
											textInput2.current.focus();
										}, 100);
									}
								}}
							/>

							{/* </Grid>
                                <Grid container spacing={3}> */}
							{/* <Grid item xs> */}
							{/* className={Estilos.botonmerc} */}
							<Button
								onClick={botonok}
								ref={textInput2}
								// onKeyPress={(e3) => {
								//     if (e3.key === 'Enter') {
								//         setTimeout(() => {
								//             textInput.current.focus();
								//         }, 100);
								//     }
								// }}
							>
								{" "}
								TOTAL INGRESADO: {cantpres * canting}
							</Button>
							{/* </Grid>
                                    <Grid item xs> */}
							{/* <label >TOTAL INGRESADO : {cantpres * canting}</label> */}
							{/* </Grid>
                                </Grid> */}
						</CardContent>
					</Card>
				) : (
					""
				)}
			</div>
		</div>
	);
}

import React, { use, useEffect, useState } from "react";
import PantallaIngreso from "./LayoutMovStock/Ingreso/PantallaIngreso.jsx";
// import SalidaDisponible from "./LayoutMovStock/SalidaDisp/SalidaDisponible";
import { MovStockPantContext } from "./MovStockPant";
import Grid from "@mui/material/Grid";
import { columnasdi } from "./columnasdi.jsx";
import { stkrubrolee } from "./LeeRubro";
import { stkgrupoleer } from "./LeeGrupos";
import { datosingreso } from "./LayoutMovStock/Ingreso/DatosIngreso";
import Estilos from "./LayoutMovStock/Ingreso/Ingreso.module.css";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/material/locale';
import { blue, green, red } from "@mui/material/colors";
import ExpandTwoToneIcon from '@mui/icons-material/ExpandTwoTone';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import { sumaingreso } from "./LayoutMovStock/Ingreso/SumaIngreso.jsx";
import TextFieldSelect from "../../components/comppropios/TextFieldSelect.jsx";
import SalidaDisponible from "./LayoutMovStock/SalidaDisp/SalidaDisponible.jsx";
// import { useContext } from "react";
// import { MovStockPantContext } from './MovStockPant'

export default function PantallaInicial() {
	const { state, setState } = use(MovStockPantContext);
	const [trigger, setTrigger] = useState(false);
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	//const [selectedRow, setSelectedRow] = useState(null);
	const [indicetabla, setIndicetabla] = useState(-1);
	const [cantpres, setCantpres] = useState(0);
	const [canting, setCanting] = useState(0);

	let abrrrubro;
	let agregaingreso = "";
	const [LlamaPI, setLlamaPI] = useState(false);
	const [LlamaPE, setLlamaPE] = useState(false);
	const [LlamaPC, setLlamaPC] = useState(false);
	const AbrePI = () => {
		setLlamaPI(true);
	};

	const CierraPI = () => {
		setLlamaPI(false);
	};

	const AbrePE = () => {
		setLlamaPE(true);
	};

	const CierraPE = () => {
		setLlamaPE(false);
	};

	const AbrePC = () => {
		setLlamaPC(true);
	};

	const CierraPC = () => {
		setLlamaPC(false);
	};

	// async function dataFetch() {
	// 	const result = await Proveedoresleertipo26();
	// 	setState({ ...state, proveed26: result });
	// }
	async function leegrupos() {
		const result = await stkgrupoleer();
		setState({ ...state, stkgrupos: result });
	}

	async function leerubros(codigogrupo) {
		const result = await stkrubrolee(codigogrupo);
		setState({ ...state, stkrubro: result });
	}


	const [selectedValues, setSelectedValues] = useState({});
	async function handleSelectChange(value, id) {
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));
		setIndicetabla(-1);
		if (id === "StkRubroAbr") {
			abrrrubro = value;
			const result = await datosingreso(abrrrubro);
			setData(result);
			const col = await columnasdi();
			setColumns(() => col);
		}
	};


	useEffect(() => {
		if (state.idStkGrupo === "") {
			leegrupos();
		}
		if (state.idStkGrupo !== "") {
			leerubros(state.idStkGrupo);
		}
	}, [state.idStkGrupo]); // eslint-disable-line react-hooks/exhaustive-deps

	const miraitem = (indicetabla, roweleg) => {
		// setSelectedRow(roweleg);
		setState({ ...state, selectRow: roweleg });
		setIndicetabla(indicetabla);
		setCantpres(0);
		setCanting(0);
	};


	async function botonok(value, cantpres, canting) {
		setState({ ...state, totaling: cantpres * canting });

		var infingreso = [
			{
				tingreso: cantpres * canting,
				abrevrubro: state.StkRubroAbr,
				indiceitem: state.selectRow.idStkItems,
			},
		];
		agregaingreso = await sumaingreso(infingreso);
		var it = state.selectRow.id;
		data[it - 1].StkItemsCantDisp =
			agregaingreso.body[1][0].StkItemsCantDisp;
		data[it - 1].StkItemsCantidad =
			agregaingreso.body[1][0].StkItemsCantidad;
		setData(data);
		setTrigger((prev) => !prev);
		it < data.length - 1 ? it++ : it--;
		miraitem(it);
		CierraPI();
	}

	const handleProcessRowUpdate = (newRow, oldRow) => {
		setData((prevRows) =>
			prevRows.map((row) => (row.id === newRow.id ? newRow : row))
		);
		return newRow;
	};

	// 
	let textdata = [{
		id: "idStkGrupo",
		label: "Grupo",
		value: state.idStkGrupo,
		options: state.stkgrupos.map((option) => ({
			value: option.idStkGrupo,
			label: option.StkGrupoDesc
		}))
	},
	{
		id: "StkRubroAbr",
		label: "Rubro",
		value: state.StkRubroAbr,
		options: state.stkrubro.map((option) => ({
			value: option.StkRubroAbr,
			label: option.StkRubroDesc
		}))
	}
	]

	return (
		// <div className={Estilos.contenedor}>
		<div >
			{/* Fila de TextFieldSelect */}
			<div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
				{textdata.map(({ id, label, value, options }, index) => (
					<TextFieldSelect
						key={index}
						id={id}
						label={label}
						value={selectedValues[id] ?? value ?? ''}
						onChange={handleSelectChange}
						options={options}
						width="350px"
					/>
				))}
			</div>

			{/* Fila de Botones */}
			<div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'flex-start' }}>
				<Button onClick={AbrePI} color="primary">
					<FileDownloadTwoToneIcon
						style={{ color: green[500] }}
						fontSize="large"
						titleAccess="Agregar"
					/>
				</Button>
				<Button onClick={AbrePE} color="primary">
					<FileUploadTwoToneIcon
						style={{ color: red[500] }}
						fontSize="large"
						titleAccess="Restar"
					/>
				</Button>
				<Button onClick={AbrePC} color="primary">
					<ExpandTwoToneIcon
						style={{ color: blue[500] }}
						fontSize="large"
						titleAccess="Cambiar"
					/>
				</Button>
			</div>

			{/* DataGrid */}
			<div style={{ display: 'flex', height: 400, width: '100%' }}>
				<DataGrid
					key={trigger}
					rows={data}
					columns={columns}
					localeText={esES}
					onRowClick={(evt) => {
						setState({ ...state, selectRow: evt.row });
						miraitem(evt.id, evt.row);
					}}
					processRowUpdate={handleProcessRowUpdate}
				/>
				{state.selectRow && LlamaPI ? <PantallaIngreso onClick={botonok} /> : null}
				{state.selectRow && LlamaPE ? <SalidaDisponible onClick={botonok} /> : null}
			</div>

			{/* PantallaIngreso condicional */}
		</div>
	);
}
// <div className={Estilos.contenedor}>
// 	{/* <div className={Estilos.contenedor1}> */}
// 	<div style={{ display: 'flex', gap: '16px' }}>
// 		{textdata.map(({ id, label, value, options }, index) => (
// 			<TextFieldSelect
// 				key={index}
// 				id={id}
// 				label={label}
// 				value={selectedValues[id] ?? value ?? ''}
// 				onChange={handleSelectChange}
// 				options={options}
// 				width="200px"
// 			/>
// 		))}
// 	</div>
// 		<Button onClick={AbrePI} color="primary">
// 			<FileDownloadTwoToneIcon
// 				style={{ color: green[500] }}
// 				fontSize="large"
// 				titleAccess="Agregar"
// 			/>
// 		</Button>
// 		<Button onClick={AbrePE} color="primary">
// 			<FileUploadTwoToneIcon
// 				style={{ color: red[500] }}
// 				fontSize="large"
// 				titleAccess="Agregar"
// 			/>
// 		</Button>
// 		<Button onClick={AbrePC} color="primary">
// 			<ExpandTwoToneIcon
// 				style={{ color: blue[500] }}
// 				fontSize="large"
// 				titleAccess="Agregar"
// 			/>
// 		</Button>
// 	<DataGrid
// 		key={trigger} // El cambio en trigger fuerza el re-renderizado
// 		rows={data}
// 		columns={columns}
// 		localeText={esES}
// 		onRowClick={(evt) => {
// 			// setSelectedRow(evt.row);
// 			setState({ ...state, selectRow: evt.row });
// 			miraitem(evt.id, evt.row);

// 		}}
// 		processRowUpdate={handleProcessRowUpdate}
// 	/>

// 	{/* </div> */}
// 	{
// 		state.selectRow &&
// 			LlamaPI ? (<PantallaIngreso onClick={botonok} />) : null
// 	}
// </div >



// const proveed = [
// 	{
// 		id: "idProveedores",
// 		label: "Proveedor",
// 		value: state.idProveedores,
// 		mapeo: (
// 			<>
// 				<option />
// 				{state.proveed26.map((option) => (
// 					<option key={option.idProveedores} value={option.idProveedores}>
// 						{option.ProveedoresDesc}
// 					</option>
// 				))}
// 			</>
// 		),
// 	},
// ];
// const { state, setState } = useContext(MovStockPantContext);
// const [pantingreso, setPantingreso] = useState(false);
// const [saldisponible, setSaldisponible] = useState(false)

// const LlamaPI = () => {
//     setPantingreso(true)
// }
// function LlamaPI() {
// 	setPantingreso(!pantingreso);
// }
{/* {textdata.map((datos) => (
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
				))} */}

// async function handleChange(event) {
// 	const id = event.target.id;
// 	setState({ ...state, [id]: event.target.value });
// 	setIndicetabla(-1);
// 	if (id === "StkRubroAbr") {
// 		abrrrubro = event.target.value;
// 		const result = await datosingreso(abrrrubro);
// 		setData(result);
// 		const col = await columnasdi();
// 		setColumns(() => col);
// 	}
// }
// async function cambioingreso(event) {
// 	const id = event.target.id;
// 	if (id === "cantpres") {
// 		setCantpres(event.target.value);
// 	} else {
// 		setCanting(event.target.value);
// 	}
// }


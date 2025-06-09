import React, { useState, useRef, useEffect } from "react";
import Estilos from "./Ingreso.module.css";
import { Card, CardContent, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

// Context
import { use } from "react";
import { MovStockPantContext } from "../../MovStockPant";
import TextFieldComun from "../../../../../components/comppropios/TextFieldComun";
// import { Proveedoresleertipo26 } from "../../../Tablas/Proveedores/Proveedoresleertipo26"
// import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";

// export default function PantallaIngreso({ onClick }) {
const PantallaIngreso = ({ onClick, ...other }) => {
	const { state, setState } = use(MovStockPantContext);

	const [cantpres, setCantpres] = useState(0);
	const [canting, setCanting] = useState(0);
	const textInput = useRef(null);
	const textInput1 = useRef(null);
	const textInput2 = useRef(null);
	const textInput3 = useRef(null);
	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
		if (id === "cantpres") {
			setCantpres(value);
		} else {
			setCanting(value);
		}

	};

	return (
		<div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
			{state.selectRow &&
				<Card>
					<CardContent className={Estilos.card1}>
						<Grid container>
							La presentación de la mercadería es :<br></br>
							{state.selectRow.StkRubroPresDes} de {state.selectRow.StkRubroPres}{" "}
							{state.selectRow.StkRubroUM}
							{state.selectRow.StkRubroAncho !== 0 &&
								" por " +
								state.selectRow.StkRubroAncho +
								" " +
								state.selectRow.StkItemsDesc}
						</Grid>


						<br></br>
						<TextFieldComun
							inputRef={textInput}
							id="MovNroRef"
							type="string"
							label="Nro Factura "
							value={state.MovNroRef}
							onChange={handleChange}
							width="100px"
							autoFocus
							onKeyDown={(e1) => {
								if (e1.key === "Enter") {
									setTimeout(() => {
										textInput1.current.focus();
									}, 100);
								}
							}}
						/>

						<label> Ingresaron
							<TextFieldComun
								inputRef={textInput1}
								id="cantpres"
								type="number"
								label="Cantidad "
								value={cantpres}
								onChange={handleChange}
								width="100px"
								autoFocus
								onKeyDown={(e1) => {
									if (e1.key === "Enter") {
										setTimeout(() => {
											textInput2.current.focus();
										}, 100);
									}
								}}
							/>

							<TextFieldComun
								input={{ maxLength: 4 }}
								className={Estilos.input}
								inputRef={textInput2}
								size="small"
								type="number"
								id="canting"
								width="100px"
								label="de "
								onChange={handleChange}
								value={canting}
								onKeyDown={(e2) => {
									if (e2.key === "Enter") {
										setTimeout(() => {
											textInput3.current.focus();
										}, 100);
									}
								}}
							/>
						</label>
						<Button
							onClick={(event) => {
								onClick(event.target.value, cantpres, canting);
							}}
							ref={textInput3}

						>
							{" "}
							TOTAL INGRESADO: {cantpres * canting}
						</Button>

					</CardContent>
				</Card>
			}
		</div>
		// </div >
	);
}
export default PantallaIngreso;




// <div className={Estilos.contenedor}>
// 	<div className={Estilos.contenedor1}>
// 		{textdata.map((datos) => (
// 			<TextField
// 				className={Estilos.selector}
// 				key={datos.id}
// 				id={datos.id}
// 				size="small"
// 				input={{ maxLength: 3 }}
// 				select
// 				label={datos.label}
// 				value={datos.value}
// 				onChange={handleChange}
// 				SelectProps={{ native: true }}
// 				variant="outlined"
// 				margin="dense"
// 			>
// 				{datos.mapeo}
// 			</TextField>
// 		))}
// 		<Button onClick={AbrePI} color="primary">
// 			<AssignmentReturnedIcon
// 				style={{ color: green[500] }}
// 				fontSize="large"
// 				titleAccess="Agregar"
// 			/>
// 		</Button>
// 		<Button onClick={AbrePE} color="primary">
// 			<AssignmentReturnedIcon
// 				style={{ color: red[500] }}
// 				fontSize="large"
// 				titleAccess="Agregar"
// 			/>
// 		</Button>
// 		<Button onClick={AbrePC} color="primary">
// 			<AssignmentReturnedIcon
// 				style={{ color: blue[500] }}
// 				fontSize="large"
// 				titleAccess="Agregar"
// 			/>
// 		</Button>
// 		<DataGrid
// 			key={trigger} // El cambio en trigger fuerza el re-renderizado
// 			rows={data}
// 			columns={columns}
// 			localeText={esES}
// 			onRowClick={(evt, selectedRow) => {
// 				setSelectedRow(evt.row);
// 				miraitem(evt.id, evt.row);

// 			}}
// 			processRowUpdate={handleProcessRowUpdate}
// 		/>

// 	</div>

// const [LlamaPI, setLlamaPI] = useState(false);
// const [LlamaPE, setLlamaPE] = useState(false);
// const [LlamaPC, setLlamaPC] = useState(false);
// const AbrePI = () => {
// 	setLlamaPI(true);
// };

// const CierraPI = () => {
// 	setLlamaPI(false);
// };

// const AbrePE = () => {
// 	setLlamaPE(true);
// };

// const CierraPE = () => {
// 	setLlamaPE(false);
// };

// const AbrePC = () => {
// 	setLlamaPC(true);
// };

// const CierraPC = () => {
// 	setLlamaPC(false);
// };

// async function dataFetch() {
// 	const result = await Proveedoresleertipo26();
// 	setState({ ...state, proveed26: result });
// }
// async function leegrupos() {
// 	const result = await stkgrupoleer();
// 	setState({ ...state, stkgrupos: result });
// }

// async function leerubros(codigogrupo) {
// 	const result = await stkrubrolee(codigogrupo);
// 	setState({ ...state, stkrubro: result });
// }


// useEffect(() => {
// 	if (state.idStkGrupo === "") {
// 		leegrupos();
// 	}
// 	if (state.idStkGrupo !== "") {
// 		leerubros(state.idStkGrupo);
// 	}
// }, [state.idStkGrupo]); // eslint-disable-line react-hooks/exhaustive-deps

// async function botonok() {
// 	setState({ ...state, totaling: cantpres * canting });

// 	var infingreso = [
// 		{
// 			tingreso: cantpres * canting,
// 			abrevrubro: state.StkRubroAbr,
// 			indiceitem: state.selectRow.idStkItems,
// 		},
// 	];
// 	agregaingreso = await sumaingreso(infingreso);
// 	var it = state.selectRow.id;
// 	data[it - 1].StkItemsCantDisp =
// 		agregaingreso.body[1][0].StkItemsCantDisp;
// 	data[it - 1].StkItemsCantidad =
// 		agregaingreso.body[1][0].StkItemsCantidad;
// 	setData(data);
// 	setTrigger((prev) => !prev);
// 	it < data.length - 1 ? it++ : it--;
// 	miraitem(it);
// 	CierraPI();
// }

// const handleProcessRowUpdate = (newRow, oldRow) => {
// 	setData((prevRows) =>
// 		prevRows.map((row) => (row.id === newRow.id ? newRow : row))
// 	);
// 	return newRow;
// };

// const textdata = [
// 	{
// 		id: "idStkGrupo",
// 		label: "Grupo",
// 		value: state.idStkGrupo,
// 		mapeo: (
// 			<>
// 				<option></option>
// 				{state.stkgrupos.map((option) => (
// 					<option key={option.idStkGrupo} value={option.idStkGrupo}>
// 						{option.StkGrupoDesc}
// 					</option>
// 				))}
// 			</>
// 		),
// 	},
// 	{
// 		id: "StkRubroAbr",
// 		label: "Rubro",
// 		value: state.StkRubroAbr,
// 		mapeo: (
// 			<>
// 				<option></option>
// 				{state.stkrubro.map((option) => (
// 					<option key={option.StkRubroAbr} value={option.StkRubroAbr}>
// 						{option.StkRubroDesc}
// 					</option>
// 				))}
// 			</>
// 		),
// 	},
// ];
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
// const miraitem = (indicetabla, roweleg) => {
// 	setSelectedRow(roweleg);
// 	setIndicetabla(indicetabla);
// 	setCantpres(0);
// 	setCanting(0);
// };
// const [selectedRow, setSelectedRow] = useState(null);
// const [indicetabla, setIndicetabla] = useState(-1);

// let abrrrubro;
// let agregaingreso = "";

// async function cambioingreso(event) {
// 	const id = event.target.id;
// 	if (id === "cantpres") {
// 		setCantpres(event.target.value);
// 	} else {
// 		setCanting(event.target.value);
// 	}
// }


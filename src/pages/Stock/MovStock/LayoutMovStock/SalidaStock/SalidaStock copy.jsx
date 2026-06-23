import { useState, useEffect, useRef, useMemo } from "react";
import Estilos from "../Ingreso/Ingreso.module.css";
import { Card, CardContent, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
// Context
import { use } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/material/locale';
import { MovStockPantContext } from "../../MovStockPant";
import { datosingreso } from "../Ingreso/DatosIngreso";
import { MovStockLeeMovEle } from "./MovStockLeeMovEle";
import { llenarcolumns } from "./columns.jsx";
import TextFieldComun from "../../../../../components/comppropios/TextFieldComun";
import TextFieldSelect from "../../../../../components/comppropios/TextFieldSelect";
import CustomSwitch from "../../../../../components/comppropios/CustomSwitch";
import estilotabla from "../../../../../Styles/Tabla.module.css";
export default function SalidaStock({ datositems, onClick, ...other }) {
	const { state, setState } = use(MovStockPantContext);
	const [columns, setColumns] = useState([]);
	const [datosmov, setDatosMov] = useState([]);
	const [totalvendidol, setTotalVendidol] = useState(0);

	async function columnsFetch() {
		const col = await llenarcolumns();
		setColumns(() => col);
	}
	let abrrrubro;
	const [cantidad, setCantidad] = useState(0);
	const [largo, setLargo] = useState(0);

	const textInput = useRef(null);
	const textInput1 = useRef(null);

	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });
		if (id === "cantidad") {
			setCantidad(value);
		}
		if (id === "largo") {
			setLargo(value);
		}

	};


	async function dataFetch() {
		const result = await MovStockLeeMovEle(state.StkRubroAbr, state.selectRow.StkItemsDesc);
		setDatosMov(result);
	}

	async function initialFetch() {
		columnsFetch();
		dataFetch();
	}

	useEffect(() => {
		initialFetch();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	let textdatar = [
		{
			id: "StkRubroAbr",
			label: "Rubro",
			value: '',
			options: state.stkrubro.map((option) => ({
				value: option.StkRubroAbr,
				label: option.StkRubroDesc
			}))
		}

	];
	let textdatai = [];
	if (state.stkitems !== undefined) {
		if (state.stkitems.length > 0) {
			textdatai = [
				{
					id: "idStkItems",
					label: "Items",
					value: state.idStkItems,
					options: state.stkitems.map((option) => ({
						value: option.idStkItems,
						label: option.StkItemsDesc
					}))
				}
			];
		}
	}
	console.log('textdatar  ', textdatar)
	console.log('textdatai  ', textdatai)
	const [selectedValues, setSelectedValues] = useState({});
	async function handleSelectChange(value, id) {
		console.log('value  ', value)
		console.log('id  ', id)
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));
		if (id === "StkRubroAbr") {
			abrrrubro = value;
			console.log('abrrrubro  ', abrrrubro)
			const result = await datosingreso(abrrrubro);
			console.log('result  ', result)
			setState({ ...state, stkitems: result, idStkRubroCambio: value });
		}
		if (id === "idStkItems") {

			setState({ ...state, idStkItemsCambio: value });

		}
	};

	const selectedOption = useMemo(() => state.CambiaTela || "N", [state.CambiaTela]);
	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, CambiaTela: newOption });
	};


	const [selectionModel, setSelectionModel] = useState([]);

	const handleSelectionModelChange = (selectionModel) => {
		const filaselec = selectionModel.map((row, i) =>
			datosmov.filter((rows) => rows.id == row)
		);

		let totalvendidocalc = 0
		for (let i = 0; i < filaselec.length; i++) {
			totalvendidocalc = (filaselec[i][0].StkMovTotal * -1) + totalvendidocalc
		}
		setTotalVendidol(totalvendidocalc);
		setState({ ...state, totalvendido: totalvendidocalc });
		setSelectionModel(filaselec);
	};

	return (
		<div style={{ display: 'flex', gap: '10px', marginBottom: '2px' }}>
			{state.selectRow &&

				< Card className={Estilos.card1}>
					<CardContent>
						<label> Confirmación de salida </label>

						<Grid container direction="column" spacing={1}>
							<Typography variant="body1" color="text.primary">
								La venta fue por:&nbsp;
								<span style={{ fontSize: '1.5rem', color: '#1976d2', fontWeight: 'bold' }}>
									{state.selectRow.StkRubroDesc}
								</span>
								&nbsp;
								<span style={{ fontSize: '1.5rem', color: 'green', fontWeight: 'bold' }}>
									{state.selectRow.StkItemsDesc}
								</span>
							</Typography>
							<Typography variant="body1" color="text.primary">
								En este momento hay en disponible :
								<span style={{ color: 'blue', fontWeight: 'bold' }}>
									{' '}{state.selectRow.StkItemsCantDisp}
								</span>
								{' '} y en stock :
								<span style={{ color: 'red', fontWeight: 'bold' }}>
									{' '}{state.selectRow.StkItemsCantidad}
								</span>
							</Typography>
						</Grid>
						<Grid sx={{ marginTop: "2px" }}>
							<DataGrid
								rows={datosmov}
								columns={columns}
								checkboxSelection
								onRowSelectionModelChange={handleSelectionModelChange}
								selectionModel={selectionModel}
								localeText={esES}
								className={estilotabla.tablassalidastock}
							/>
						</Grid>
						{selectionModel && selectionModel.length > 0 && (
							<Grid sx={{ marginTop: "2px" }}>
								<Typography variant="body1" color="text.primary">
									Se había descontado :
									<span style={{ color: 'blue', fontWeight: 'bold' }}>
										{' '}{totalvendidol}
									</span>

								</Typography>
							</Grid>
						)}
						<Grid sx={{ marginTop: "2px" }}>
							<CustomSwitch
								value={selectedOption}
								onChange={handleOptionChange}
								opcion1={'N'}
								opcion2={'S'}
								titulo1={'No'}
								titulo2={'Si'}
								tithelpertext={'Cambia Tela : '} />

						</Grid>
						{state.CambiaTela === "S" && (
							<>

								{textdatar.length > 0 &&

									textdatar.map(({ id, label, value, options }, index) => (

										<TextFieldSelect
											key={index}
											id={id}
											label={label}
											value={selectedValues[id] ?? value ?? ''}
											onChange={handleSelectChange}
											options={options}
											width="400px"
										/>
									))}

								{textdatai.length > 0 &&
									textdatai.map(({ id, label, value, options }, index) => (
										<TextFieldSelect
											key={index}
											id={id}
											label={label}
											value={selectedValues[id] ?? value ?? ''}
											onChange={handleSelectChange}
											options={options}
											width="400px"
										/>
									))}
							</>
						)}

						<div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
							<TextFieldComun
								inputRef={textInput}
								id="cantidad"
								size="small"
								type="number"
								label="Cantidad de paños"
								value={cantidad}
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

							<TextFieldComun
								inputRef={textInput1}
								size="small"
								type="number"
								id="largo"
								width="100px"
								label="Largo"
								onChange={handleChange}
								value={largo}

							/>
						</div>
						<Button
							onClick={(event) => {
								onClick(cantidad, largo);
							}}
						>
							TOTAL A DESCONTAR :{cantidad * largo}
						</Button>
					</CardContent>
				</Card>
			}
		</div >

	);
}



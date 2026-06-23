import { useState, useEffect, useRef, useMemo } from "react";
import Estilos from "../Ingreso/Ingreso.module.css";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
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
import DetalleMateriales from "./DetalleMateriales.jsx";
export default function SalidaStock({ datositems, onClick, ...other }) {
	const { state, setState } = use(MovStockPantContext);
	const [modalOpen, setModalOpen] = useState(true);

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
	// let textdatar = [
	// 	{
	// 		id: "StkRubroAbr",
	// 		label: "Rubro",
	// 		value: '',
	// 		options: state.stkrubro.map((option) => ({
	// 			value: option.StkRubroAbr,
	// 			label: option.StkRubroDesc
	// 		}))
	// 	}

	// ];
	// let textdatai = [];
	// if (state.stkitems !== undefined) {
	// 	if (state.stkitems.length > 0) {
	// 		textdatai = [
	// 			{
	// 				id: "idStkItems",
	// 				label: "Items",
	// 				value: state.idStkItems,
	// 				options: state.stkitems.map((option) => ({
	// 					value: option.idStkItems,
	// 					label: option.StkItemsDesc
	// 				}))
	// 			}
	// 		];
	// 	}
	// }

	const [selectedValues, setSelectedValues] = useState({});
	async function handleSelectChange(value, id) {
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));
		if (id === "StkRubroAbr") {
			abrrrubro = value;
			const result = await datosingreso(abrrrubro);
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
		setState({ ...state, totalvendido: totalvendidocalc, indicemodStkMov: selectionModel[0], clientemov: filaselec[0][0].StkMovCliente });
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
						<Box sx={{ maxHeight: '350px', overflowY: 'auto', marginTop: "2px" }}>
							<DataGrid
								rows={datosmov}
								columns={columns}
								checkboxSelection
								onRowSelectionModelChange={handleSelectionModelChange}
								selectionModel={selectionModel}
								localeText={esES}
								className={estilotabla.tablassalidastock}
							/>
						</Box>
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
						<DetalleMateriales
							open={modalOpen}
							handleClose={() => setModalOpen(false)}
							onClick={onClick}
							totalvendidol={totalvendidol}
						/>
					</CardContent>
				</Card>
			}
		</div >

	);
}


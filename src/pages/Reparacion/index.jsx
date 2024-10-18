import { useEffect, useRef, useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, gridClasses, TextField } from "@mui/material";
import {
	DataGrid,
	esES,
	GridToolbarContainer,
	useGridApiRef,
} from "@mui/x-data-grid";

import { LeeParamRep } from "./LeeParamRep.jsx";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";

import estilo from "../../Styles/Reparacion.module.css";
import { CreaTabla } from "./CreaTabla.jsx";
import { CurrencyTextField } from "../../hooks/useCurrencyTextField.jsx";
import { llenarcolumnsparcheleg } from "./columparcheleg.jsx";
import { llenarcolumnschicotes } from "./columchicotes.jsx";
import { llenarcolumnsvarios } from "./columvarios.jsx";
export default function Reparacion() {
	const { setValor } = useContext(StaticContexto);
	const [valora, setValorA] = useState(0)
	const [valorb, setValorB] = useState(0)
	//tabla que recepciona los parches elegidos
	const [labeldecarga, setLabeldecarga] = useState('Largo')
	const [titulodialogo, setTituloDialogo] = useState('')
	const [eligechicotes, setEligeChicotes] = useState(false);
	const [eligevarios, setEligeVarios] = useState(false);
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [inputValue2, setInputValue2] = useState('');
	const inputRef = useRef(null); // Referencia al campo de texto
	const inputRef2 = useRef(null); // Referencia al segundo campo de texto
	const botonRef = useRef(null); // Referencia al botón
	const [medidaparche, setMedidaParche] = useState('')
	const [valorparche, setValorParche] = useState(0)
	const [pidesegundovalor, setPideSegundoValor] = useState(false)
	const [selectionModel, setSelectionModel] = useState([]);
	const [rowsparches, setRowsParches] = useState()
	const [columnsparches, setColumnsParches] = useState([]);

	const [colchicotes, setColChicotes] = useState([])
	const [rowschicotes, setRowsChicotes] = useState([])
	const [sumaChicotes, setSumaChicotes] = useState(0);

	const [colparcheleg, setColParcheleg] = useState([])
	const [rowsparcheleg, setRowsParcheleg] = useState([])
	const [sumaParcheleg, setSumaParcheleg] = useState(0);

	const [colvarios, setColVarios] = useState([])
	const [rowsvarios, setRowsVarios] = useState([])
	const [sumaVarios, setSumaVarios] = useState(0);

	const apiRef = useGridApiRef();
	const apiRefVarios = useGridApiRef();

	async function datosParches() {
		const data = await LeeParamRep();
		setValorA(data[0].REPValorA)
		setValorB(data[0].REPValorB)
	}

	async function columnsParches() {
		const data = await CreaTabla(valora, valorb);
		setRowsParches(data[0])
		setColumnsParches(data[1])
	}

	async function columnsParcheleg() {
		var col = await llenarcolumnsparcheleg();
		setColParcheleg(() => col);
	}
	async function columnsChicotes() {
		var col = await llenarcolumnschicotes();
		setColChicotes(() => col);
	}

	async function columnsVarios() {
		var col = await llenarcolumnsvarios();
		setColVarios(() => col);
	}
	async function initialFetch() {
		datosParches();
		columnsParches();
		columnsParcheleg();
		columnsChicotes();
		columnsVarios();
		//setRowsVarios(Array.from({ length: 20 }, (_, i) => ({ id: i, cantvarios: '', impvarios: '' })));
	}

	useEffect(() => {
		initialFetch();
		setValor("Reparacion");
	}, [valora]); // eslint-disable-line react-hooks/exhaustive-deps



	const handleCellClick = (params) => {
		setMedidaParche(`${params.field} x ${params.id}`)
		setValorParche(params.value)
		setInputValue('');
		setSelectionModel([]);
		setPideSegundoValor(false)
		params.field !== 'id' && setOpen(true);

	};

	const handleClose = () => {
		setEligeChicotes(false)
		setEligeVarios(false)
		setOpen(false);
	};



	const handleConfirm = () => {
		if (pidesegundovalor) {
			if (eligechicotes) {
				const newId = rowschicotes.length + 1;
				const newRow = {
					id: newId,
					cantchicote: Number(inputValue),
					medchicote: Number(inputValue2),
					impchicote: (10),
					imptchicote: (Number(inputValue) * 10)
				};
				setRowsChicotes((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
				setSumaChicotes(sumaChicotes + newRow.imptchicote)
				setInputValue('')
				setInputValue2('')
				inputRef.current.focus();
			}


			if (eligevarios) {

				const newId = rowsvarios.length + 1;
				const imptvarios1 = Number(inputValue) * Number(inputValue2)
				console.log('Number(inputValue2))', Number(inputValue2))
				console.log('typeof Number(inputValue2))', typeof Number(inputValue2))
				const newRow = {
					id: newId,
					cantvarios: Number(inputValue),
					impvarios: Number(inputValue2),
					imptvarios: imptvarios1
				};

				setRowsVarios((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
				setSumaVarios(sumaVarios + newRow.imptvarios)
				setInputValue('')
				setInputValue2('')
				inputRef.current.focus();
			}
		}
		else {
			{
				const newId = rowsparcheleg.length + 1; // Generar un nuevo ID basado en el número de filas
				const newRow = {
					id: newId,
					cantparche: Number(inputValue),
					medparche: medidaparche,
					impparche: (valorparche),
					imptparche: (Number(inputValue) * valorparche)
				};

				setRowsParcheleg((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
				setSumaParcheleg(sumaParcheleg + newRow.imptparche)
				setOpen(false);
				setPideSegundoValor(false)
			}
		}
	};
	const handleKeyDown = (event, nextElementRef) => {
		if (event.key === 'Enter') {
			if (pidesegundovalor) { nextElementRef.current.focus() }
			else
				handleConfirm(); // Confirmar cuando se presiona Enter
		}
	};
	useEffect(() => {
		if (open) {
			const focusInput = setInterval(() => {
				if (inputRef.current) {
					inputRef.current.focus();
					clearInterval(focusInput); // Limpiar el intervalo una vez que el foco se establece
				}
			}, 100);
		}
	}, [open]);


	const cargachicotes = () => {
		setEligeChicotes(true);
		setPideSegundoValor(true)
		setLabeldecarga('Largo')
		setTituloDialogo('Ingreso de Chicotes')
		setOpen(true);
	}
	const cargavarios = () => {
		setEligeVarios(true);
		setPideSegundoValor(true)
		setLabeldecarga('Importe')
		setTituloDialogo('Ingreso de Varios')
		setOpen(true);
	}

	const borrafila = (params) => {
		console.log('params ', params)

	}


	function CustomToolbar() {
		return (
			<GridToolbarContainer >

				<CurrencyTextField
					id="Total"
					size="small"
					label="Total"
					value={sumaParcheleg}
					className={estilo.tfcurrency}
				></CurrencyTextField>

			</GridToolbarContainer>
		);
	}

	function CustomToolbarChicotes() {
		return (
			<GridToolbarContainer >

				<CurrencyTextField
					id="Total"
					size="small"
					label="Total"
					value={sumaChicotes}
					className={estilo.tfcurrency}
				></CurrencyTextField>

				<Button className={estilo.botonabredialogo} onClick={() => cargachicotes()}>Chicotes</Button>
			</GridToolbarContainer>
		);
	}



	function CustomToolbarVarios() {
		return (
			<GridToolbarContainer >

				<CurrencyTextField
					id="Total"
					size="small"
					label="Total"
					value={sumaVarios}
					className={estilo.tfcurrency}
					tyle={{ textAlign: "right" }}
				></CurrencyTextField>

				<Button className={estilo.botonabredialogo} onClick={() => cargavarios()}>Varios</Button>
			</GridToolbarContainer>
		);
	}
	return (
		<Box
			sx={{
				width: "100%",
				align: "center",
				justifycontent: "center",
				boxShadow: 5,
				padding: 5,

				height: 300,
				[`.${gridClasses.cell}.cold`]: {
					backgroundColor: '#b9d5ff91',
					color: '#1a3e72',
				},
				[`.${gridClasses.cell}.hot`]: {
					backgroundColor: '#ff943975',
					color: '#1a3e72',
				},
			}}
		// sx={{
		// 	width: "100%",
		// 	align: "center",
		// 	justifycontent: "center",
		// 	boxShadow: 5,
		// 	padding: 5,
		// }}
		>
			<Grid container >
				{rowsparches !== undefined && columnsparches !== undefined &&
					<div style={{ height: 435, width: '74%', paddingBottom: 5 }}>
						<DataGrid
							rows={rowsparches}
							columns={columnsparches}
							pageSize={10}
							hideFooter={true}
							rowsPerPageOptions={[10]}
							onCellClick={handleCellClick}
							onSelectionModelChange={(newSelection) => {
								setSelectionModel(newSelection); // Control de selección
							}}
							showCellVerticalBorder
							showCellHorizontalBorder
							columnHeaderHeight={25}
							disableSelectionOnClick
							disableColumnMenu
							// getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
							rowHeight={20}
							// sx={{
							// 	'& .MuiDataGrid-columnHeaders': {
							// 		backgroundColor: '#5787e1a7', // Color del header
							// 	},
							// 	'& .MuiDataGrid-columnHeaderTitle': {
							// 		fontWeight: 'bold', // Negrita para el texto del header
							// 	}
							// }}
							getCellClassName={(params) => {
								if (params.field === 'id' || params.value == null) {
									return '';
								}
								{ console.log('params', params) }
								return params.field === 'id' ? 'hot' : 'cold';
							}}
						/>
					</div>}

			</Grid>
			<div style={{ height: 150, width: '100%', paddingTop: 15 }}>

				<Grid container spacing={2} >

					<div style={{ height: 200, width: '21%' }}>
						<DataGrid
							rows={rowsparcheleg}
							columns={colparcheleg}
							pageSize={10}
							rowsPerPageOptions={[10]}
							hideFooter={true}
							rowHeight={20}
							columnHeaderHeight={25}
							showCellVerticalBorder
							showCellHorizontalBorder
							slots={{
								toolbar: CustomToolbar,
							}}
						/>
					</div>
					<br /><br />

					<div style={{ height: 200, width: '21%', paddingLeft: 10 }}>

						<DataGrid
							apiRef={apiRef}
							rows={rowschicotes}
							columns={colchicotes}
							pageSize={10}
							rowsPerPageOptions={[10]}
							hideFooter
							rowHeight={20}
							columnHeaderHeight={25}
							showCellVerticalBorder
							showCellHorizontalBorder
							editMode="cell"
							slots={{
								toolbar: CustomToolbarChicotes,
							}} />
					</div>


					<div style={{ height: 200, width: '21%', paddingLeft: 10 }}>

						<DataGrid
							apiRef={apiRefVarios}
							// localeText={esES.components.MuiDataGrid.defaultProps.localeText}
							rows={rowsvarios}
							columns={colvarios}
							pageSize={10}
							rowsPerPageOptions={[10]}
							hideFooter
							rowHeight={20}
							columnHeaderHeight={25}
							showCellVerticalBorder
							showCellHorizontalBorder
							editMode="row"
							onCellDoubleClick={borrafila}
							slots={{
								toolbar: CustomToolbarVarios,
							}} />
					</div>
				</Grid>
			</div>
			{/* Diálogo para ingresar la cantidad */}
			<Dialog open={open} onClose={handleClose} style={{ height: 350, width: '20%' }}>
				<DialogTitle>{titulodialogo}</DialogTitle>
				<DialogContent>
					<TextField
						inputRef={inputRef} // Asignar la referencia al campo de texto
						autoFocus
						margin="dense"
						label="Cantidad"
						type="number"
						fullWidth
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => handleKeyDown(e, inputRef2)}
					/>
					{pidesegundovalor &&
						<TextField
							inputRef={inputRef2} // Asignar la referencia al campo de texto
							autoFocus
							margin="dense"
							label={labeldecarga}
							type="number"
							fullWidth
							value={inputValue2}
							onChange={(e) => setInputValue2(e.target.value)}
							onKeyDown={(e) => handleKeyDown(e, botonRef)}
						/>}
				</DialogContent>
				<DialogActions>
					<Button ref={botonRef} onClick={handleConfirm}>Confirmar</Button>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>


		</Box>
	);
}

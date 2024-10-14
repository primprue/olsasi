import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import {
	DataGrid,
	GridToolbarContainer,
	useGridApiRef,
} from "@mui/x-data-grid";
import { LeeParamRep } from "./LeeParamRep.jsx";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import estilos from '../../Styles/TabRep.module.css'
import EstTF from "../../Styles/TextField.module.css";
import  {datosrep}  from "./datosrep.js";
import { CreaTabla } from "./CreaTabla.jsx";
import { CurrencyTextField } from "../../hooks/useCurrencyTextField.jsx";
import { llenarcolumnsparches } from "./columparches.jsx";
import { llenarcolumnschicotes } from "./columchicotes.jsx";
export default function Reparacion() {
	const { setValor } = useContext(StaticContexto);
	const [rows, setRows] = useState()
	const [valora, setValorA] = useState(0)
	const [valorb, setValorB] = useState(0)
	//tabla que recepciona los parches elegidos
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const inputRef = useRef(null); // Referencia al campo de texto
	const [valorparche, setValorParche] = useState(0)
	const [medidaparche, setMedidaParche] = useState('')
	const [selectionModel, setSelectionModel] = useState([]);
	const [columns, setColumns] = useState([]);
	const [colchicotes, setColChicotes] = useState([])
	 const [rowschicotes, setRowsChicotes] = useState([])
	const [colparches, setColParches] = useState([])
	const [rowsparches, setRowsParches] = useState([])
	const [sumaParches, setSumaParches] = useState(0);
	  const apiRef = useGridApiRef();


	  const handleCellKeyDown = (params, event) => {
		if (event.key === 'Enter') {
		  event.preventDefault(); // Evita el comportamiento predeterminado de avanzar hacia abajo
	
		  const { id, field } = params;
			setCellFocus(5, 'medchicote');
		//   if (id === 0 && field === 'medchicote') {
		// 	// Mover el foco a la celda [1, 'medchicote']
		// 	apiRef.current.setCellFocus(1, 'medchicote');
		//   } else if (id === 1 && field === 'medchicote') {
		// 	// Mover el foco a la celda [1, 'cantchicote']
		// 	apiRef.current.setCellFocus(1, 'cantchicote');
		//   }
		}
	  };

	
	async function dataFetch() {
		const data = await LeeParamRep();
		setValorA(data[0].REPValorA)
		setValorB(data[0].REPValorB)
	}

	async function columnsFetch() {
		const data = await CreaTabla(valora, valorb);
		setRows(data[0])
		setColumns(data[1])
	}
	async function initialFetch() {
		dataFetch();
		columnsFetch();
		columnsParches();
		columnsChicotes();
		setRowsChicotes(Array.from({ length: 20 }, (_, i) => ({ id: i, cantchicote: '', medchicote: '', impchicote: '', imptchicote: '' })));
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
	params.field !== 'id' && setOpen(true);
};

const handleClose = () => {
		setOpen(false);
	};

async function columnsParches() {
	var col = await llenarcolumnsparches();
	setColParches(() => col);
}
async function columnsChicotes() {
	var col = await llenarcolumnschicotes();
	setColChicotes(() => col);
}

	const handleConfirm = () => {
		const newId = rowsparches.length + 1; // Generar un nuevo ID basado en el número de filas
		const newRow = { id: newId, 
			cantparche: Number(inputValue), 
			medparche: medidaparche, 
			impparche: (valorparche),
			imptparche: (Number(inputValue) * valorparche)  };

		setRowsParches((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
		setSumaParches(sumaParches + newRow.imptparche)
		setOpen(false);
	};
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
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

	function CustomToolbar() {
		return (
			<GridToolbarContainer >
		
				<CurrencyTextField
					id="Total"
					size="small"
					label="Total"
					value={sumaParches}
					className={EstTF.tfcurrency}
				></CurrencyTextField>
			
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
			}}
		>
		{rows !== undefined && columns !== undefined &&
				<div style={{ height: 400, width: '75%' }}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						hideFooter={true}
						rowsPerPageOptions={[10]}
						onCellClick={handleCellClick}
						onSelectionModelChange={(newSelection) => {
							setSelectionModel(newSelection); // Control de selección
						}}
						showCellVerticalBorder={true}
						showCellHorizontalBorder={true}
						columnHeaderHeight={25}
						disableSelectionOnClick
						disableColumnMenu
						getRowClassName={() => `super-app-theme--Open`} //son las propiedades de las filas
						rowHeight={20}
							sx={{
							'& .MuiDataGrid-columnHeaders': {
							backgroundColor: '#5787e1a7', // Color del header
							},
							'& .MuiDataGrid-columnHeaderTitle': {
							fontWeight: 'bold', // Negrita para el texto del header
							}
							}}
					/>
				</div>}
		<br/>
<Grid container spacing={2}>
				<div style={{ height: 200, width: '21%' }}>
						<DataGrid
							rows={rowsparches}
							columns={colparches}
							pageSize={10}
							rowsPerPageOptions={[10]}
							hideFooter={true}
							rowHeight={20}
							columnHeaderHeight={25}
							slots={{
								toolbar: CustomToolbar,
							}}
						/>
						</div>
						<br/><br/>
						<div style={{ height: 200, width: '21%' }}>
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
								onCellKeyDown={handleCellKeyDown}
						/>
					</div>
					</Grid>
	 {/* Diálogo para ingresar la cantidad */}
	 <Dialog open={open} onClose={handleClose}>
				<DialogTitle>Ingrese la cantidad</DialogTitle>
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
				onKeyDown={handleKeyDown} // Escuchar la tecla Enter
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancelar</Button>
					<Button onClick={handleConfirm}>Confirmar</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}

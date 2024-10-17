import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import {
	DataGrid,
	GridToolbarContainer,
	useGridApiRef,
} from "@mui/x-data-grid";

import { pruebatabla } from "./pruebatabla.jsx";
import { LeeParamRep } from "./LeeParamRep.jsx";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";

import estilo from "../../Styles/Reparacion.module.css";
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
	const [eligechicotes, setEligeChicotes] = useState(false);
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [inputValue2, setInputValue2] = useState('');
	const inputRef = useRef(null); // Referencia al campo de texto
	const inputRef2 = useRef(null); // Referencia al segundo campo de texto
	const botonRef = useRef(null); // Referencia al botón
	const [medidaparche, setMedidaParche] = useState('')
	const [valorparche, setValorParche] = useState(0)

	const [selectionModel, setSelectionModel] = useState([]);
	const [columns, setColumns] = useState([]);

	const [colchicotes, setColChicotes] = useState([])
	const [rowschicotes, setRowsChicotes] = useState([])
	const [sumaChicotes, setSumaChicotes] = useState(0);
	
	const [colparches, setColParches] = useState([])
	const [rowsparches, setRowsParches] = useState([])
	const [sumaParches, setSumaParches] = useState(0);

	const [colvarios, setColVarios] = useState([ { field: 'id', headerName: 'id', width: 150 },
  { field: 'cantvarios', headerName: 'Cantidad', width: 110 }, { field: 'impvarios', headerName: 'Importe', width: 110 }])
	const [rowsvarios, setRowsVarios] = useState([])
	const [sumavarios, setSumaVarios] = useState(0);

	const apiRef = useGridApiRef();
	const apiRefVarios = useGridApiRef();

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
		setRowsVarios(Array.from({ length: 20 }, (_, i) => ({ id: i, cantvarios: '', impvarios: ''})));
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
		setEligeChicotes(false)
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



		} else {
			const newId = rowsparches.length + 1; // Generar un nuevo ID basado en el número de filas
			const newRow = {
				id: newId,
				cantparche: Number(inputValue),
				medparche: medidaparche,
				impparche: (valorparche),
				imptparche: (Number(inputValue) * valorparche)
			};

			setRowsParches((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
			setSumaParches(sumaParches + newRow.imptparche)
			setOpen(false);
		}

	};
	const handleKeyDown = (event, nextElementRef) => {
		if (event.key === 'Enter') {
			if (eligechicotes) { nextElementRef.current.focus() }
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
		setOpen(true);
	}


	function CustomToolbar() {
		return (
			<GridToolbarContainer >
		
				<CurrencyTextField
					id="Total"
					size="small"
					label="Total"
					value={sumaParches}
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



	const handleKeyDownVs = (params, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita el comportamiento predeterminado de avanzar hacia abajo

      const columnIndex = params.field; // Índice de la columna actual
      const nextRowId = params.id; // ID de la fila actual

      // Obtener el elemento DOM de la celda actual
      const currentCell = apiRefVarios.current.getCellElement(nextRowId, columnIndex);
      
      if (currentCell) {
        // Mover el foco al siguiente elemento DOM (simula "Tab")
        const nextCell = currentCell.nextElementSibling;
        if (nextCell) {
          nextCell.focus();
        }
      }
    }
  };
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
			<Grid container >
		{rows !== undefined && columns !== undefined &&
				<div style={{ height: 435, width: '74%', paddingBottom:5 }}>
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
		
	</Grid>
			<div style={{ height: 150, width: '100%', paddingTop: 15 }}>
	
			<Grid container spacing={2} >
				
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
					
				<div style={{ height: 200, width: '21%', paddingLeft: 10}}>
			
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
							}}/>
					</div>

							
				<div style={{ height: 200, width: '21%', paddingLeft: 10}}>
			
						<DataGrid
							apiRef={apiRefVarios}
							rows={rowsvarios}
							columns={colvarios}
							pageSize={10}
							rowsPerPageOptions={[10]}
							hideFooter
							rowHeight={20}
							columnHeaderHeight={25}
							showCellVerticalBorder
							showCellHorizontalBorder
							editMode="cell"
							onCellKeyDown={handleKeyDownVs} 
								slots={{
									toolbar: CustomToolbarChicotes,
							}}/>
					</div>
			</Grid>
			</div>
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
						onKeyDown={(e) => handleKeyDown(e, inputRef2)}
							/>
					{eligechicotes &&
						<TextField
							inputRef={inputRef2} // Asignar la referencia al campo de texto
							autoFocus
							margin="dense"
							label="Largo"
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

import React, { useEffect, useRef, useState } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import {
	DataGrid,
} from "@mui/x-data-grid";
import { LeeParamRep } from "./LeeParamRep.jsx";
import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import estilos from '../../Styles/TabRep.module.css'
import  {datosrep}  from "./datosrep.js";
import { CreaTabla } from "./CreaTabla.jsx";
// import {CreaTabla} from "./CreaTabla.jsx";
export default function Reparacion() {
	// const [datosrep2, setDatosRep2] = useState(datosrep);
	const { setValor } = useContext(StaticContexto);
	const [rows, setRows] = useState()
	const [columns, setColumns] = useState()


	const [valora, setValorA] = useState(0)
	const [valorb, setValorB] = useState(0)
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
	}

	useEffect(() => {
		initialFetch();
		setValor("Reparacion");
	}, [valora]); // eslint-disable-line react-hooks/exhaustive-deps



useEffect(() => {


 setValor("Reparacion");
}, []); // eslint-disable-line react-hooks/exhaustive-deps

const [selectionModel, setSelectionModel] = useState([]);
const handleCellClick= (params) => {

	console.log('params ', params )
	console.log('params.id ', params.id )
	console.log('params.field ', params.field )
	// const cantidad = prompt('Ingrese la cantidad:');
	// console.log('cantidad ', cantidad )
	// const newQuantity = window.prompt('Ingrese la cantidad:');
	// console.log('newQuantity ', newQuantity )
 setMedidaParche(`${params.field} x ${params.id}`)
	setValorParche(params.value)
	setInputValue('');
	setSelectionModel([]); 
	setOpen(true);
};

const handleClose = () => {
		setOpen(false);
	};
//tabla que recepciona los parches elegidos
const [open, setOpen] = useState(false);
const [inputValue, setInputValue] = useState('');
const inputRef = useRef(null); // Referencia al campo de texto
const [valorparche, setValorParche] = useState(0)
const [medidaparche, setMedidaParche] = useState('')
const colparches = [
		// { field: 'id', headerName: 'ID', width: 70},
		{ field: 'cantparche', headerName: 'Cant', width: 130 },
		{ field: 'medparche', headerName: 'Medida', width: 130 },
		{ field: 'impparche', headerName: 'Imp.', width: 130 },
		{ field: 'imptparche', headerName: 'Importe', type: 'number', width: 90 },
	];
	const [rowsparches, setRowsParches] = useState([])
	const handleConfirm = () => {
		const newId = rowsparches.length + 1; // Generar un nuevo ID basado en el número de filas
		const newRow = { id: newId, 
			cantparche: Number(inputValue), 
			medparche: medidaparche, 
			impparche: (valorparche),
			imptparche: (Number(inputValue) * valorparche)  };

		setRowsParches((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
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
		<div style={{ height: 500, width: '100%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}
				onCellClick={handleCellClick}
				onSelectionModelChange={(newSelection) => {
					console.log('newSelection', newSelection)
          setSelectionModel(newSelection); // Control de selección
        }}
				showCellVerticalBorder={true}
				showCellHorizontalBorder={true}
				columnHeaderHeight={25}
				disableSelectionOnClick
				disableColumnMenu
				getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
        }
				
				// sx={{
        //   boxShadow: 2,
        //   border: 2,
        //   borderColor: 'primary.light',
        //   '& .MuiDataGrid-cell:hover': {
        //     color: 'primary.main',
        //   },
        // }}
			/>
		</div>}

	<div style={{ height: 200, width: '20%' }}>
			<DataGrid
				rows={rowsparches}
				columns={colparches}
				pageSize={10}
				rowsPerPageOptions={[10]}
				
			
			/>
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

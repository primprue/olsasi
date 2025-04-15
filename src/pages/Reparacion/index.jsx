import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {
	DataGrid,
} from "@mui/x-data-grid";

import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import { presupcalculador } from "../Presupuesto/PresupCalculador.jsx";
import { LeeParamRep } from "./LeeParamRep.jsx";
import { RepLeeValorHs } from "./RepLeeValorHs.jsx";
import { CreaTabla } from "./CreaTabla.jsx";
import { validaMinutos, validaHoras, calculaminutos, convhoraminutos } from "./utilidades.js";
import estilo from "../../Styles/Reparacion.module.css";
import Mensaje from "../../components/lib/Mensaje";
import { llenarcolumnsparcheleg } from "./columparcheleg.jsx";
import { llenarcolumnschicotes } from "./columchicotes.jsx";
import { llenarcolumnsvarios } from "./columvarios.jsx";
import { llenarcolumnsmot1 } from "./colummot1.jsx";
import { llenarcolumnsmot2 } from "./colummot2.jsx";
import CustomDataGrid from "./CustomDataGrid.jsx";
import CustomToolbarChicotes from "./CustomToolbarChicotes.jsx";
import CustomToolbarVarios from "./CustomToolbarVarios.jsx";
import CustomToolbarMot1 from "./CustomToolbarMot1.jsx";
import CustomToolbarMot2 from "./CustomToolbarMot2.jsx";
import CustomToolbarParchEleg from "./CustomToolbarParchEleg.jsx";
import DialogoCarga from "./DialogoCarga.jsx";
import RadioButtonLNLA from "./RadioButtonLNLA.jsx";
import ImpReparacion from "./ImpReparacion.jsx";

export default function Reparacion() {
	const { setValor } = useContext(StaticContexto);
	const [valora, setValorA] = useState(0)
	const [rowSelectionModel, setRowSelectionModel] = useState([]);
	//tabla que recepciona los parches elegidos
	const [segundolabel, setSegundoLabel] = useState('Largo')
	const [primerlabel, setPrimerLabel] = useState('Largo')
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
	const [valormtChicotes, setValormtChicotes] = useState(0);
	// let valormtChicotes = 0
	const [colparcheleg, setColParcheleg] = useState([])
	const [rowsparcheleg, setRowsParcheleg] = useState([])
	const [sumaParcheleg, setSumaParcheleg] = useState(0);

	const [colvarios, setColVarios] = useState([])
	const [rowsvarios, setRowsVarios] = useState([])
	const [sumaVarios, setSumaVarios] = useState(0);

	const [eligeMot1, setEligeMot1] = useState(false);
	const [colMot1, setColMot1] = useState([])
	const [rowsMot1, setRowsMot1] = useState([])
	const [sumaMot1, setSumaMot1] = useState(0);
	const [thsMot1, setTHsMot1] = useState(0);
	const [tminMot1, setTMinMot1] = useState(0);

	const [eligeMot2, setEligeMot2] = useState(false);
	const [colMot2, setColMot2] = useState([])
	const [rowsMot2, setRowsMot2] = useState([])
	const [sumaMot2, setSumaMot2] = useState(0);
	const [thsMot2, setTHsMot2] = useState(0);
	const [tminMot2, setTMinMot2] = useState(0);

	const [valorhoramotN, setValorHoraMotN] = useState(0);
	const [valorhoramotA, setValorHoraMotA] = useState(0);

	const [lonaAN, setLonaAN] = useState("LN");
	const [ImpTotalRep, setImpTotalRep] = useState(0);

	const [imprime, setImprime] = useState(false);
	const [nomCliente, setNomCliente] = useState('')

	const abreImprime = () => setImprime(true);
	const cierraImprime = () => setImprime(false);
	async function datosParches() {
		const data = await LeeParamRep();
		setValorA(data[0].ValorMCC)
	}

	async function columnsParches() {
		const data = await CreaTabla(valora);
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
	async function columnsMOT1() {
		var col = await llenarcolumnsmot1();
		setColMot1(() => col);
	}

	async function columnsMOT2() {
		var col = await llenarcolumnsmot2();
		setColMot2(() => col);
	}

	async function initialFetch() {
		datosParches();
		columnsParches();
		columnsParcheleg();
		columnsChicotes();
		columnsVarios();
		columnsMOT1();
		columnsMOT2();
	}
	var dcalculo = [
		{
			StkRubroAbr: '',
			minmay: 'mn',
			cantidad: 5,
			largo: 1.5,
			ancho: 0,
			tipoconf: '',
			tipoojale: '',
			ivasn: 'CIVA',
		},
	];

	//calcula el metro de chicote según el cálculo en el anexo 
	async function CalculaChicotes() {
		var anexoelegido = "CHICOTE P/METRO";
		var datoscalculos = JSON.stringify(dcalculo);
		const datosrenglon1 = await presupcalculador(
			"",
			datoscalculos,
			anexoelegido
		);
		setValormtChicotes(datosrenglon1[0])
	}
	async function BuscaValorHora() {
		const datosrenglon1 = await RepLeeValorHs();
		setValorHoraMotN(datosrenglon1[0])
		setValorHoraMotA(datosrenglon1[1])
	}
	useEffect(() => {
		initialFetch();
		setValor("Reparacion");
	}, [valora]); // eslint-disable-line react-hooks/exhaustive-deps


	const ImpLimp = () => {
		setRowsVarios([])
		setSumaVarios(0)
		setRowsChicotes([])
		setSumaChicotes(0)
		setRowsMot1([])
		setSumaMot1(0)
		setRowsMot2([])
		setSumaMot2(0)
		setSumaParcheleg(0)
		setRowsParcheleg([])
		setImpTotalRep(0)

	}

	const handleCellClick = (params) => {
		setMedidaParche(`${params.field} x ${params.id}`)
		setValorParche(params.value)
		setInputValue('');
		setSelectionModel([]);
		setPideSegundoValor(false)
		setPrimerLabel('Cantidad')
		setTituloDialogo(`Cantidad de ${params.field} x ${params.id}`)
		params.field !== 'id' && setOpen(true);

	};

	const handleClose = () => {
		setEligeChicotes(false)
		setEligeVarios(false)
		setEligeMot1(false)
		setEligeMot2(false)
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
					impchicote: (valormtChicotes * Number(inputValue2)),
					imptchicote: (Number(inputValue) * (valormtChicotes * Number(inputValue2)))
				};
				setRowsChicotes((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
				setSumaChicotes(sumaChicotes + newRow.imptchicote)

			}

			if (eligevarios) {
				const newId = rowsvarios.length + 1;
				const imptvarios1 = Number(inputValue) * Number(inputValue2)
				const newRow = {
					id: newId,
					cantvarios: Number(inputValue),
					impvarios: Number(inputValue2),
					imptvarios: imptvarios1
				};

				setRowsVarios((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
				setSumaVarios(sumaVarios + newRow.imptvarios)

			}

			if (eligeMot1) {
				let valorcorrecto = true
				let mincarg = calculaminutos(Number(inputValue2)) - calculaminutos(Number(inputValue))
				if (!validaMinutos(Number(inputValue))) {
					Mensaje("error", "Los minutos no pueden ser mayor a en desde 59")
					valorcorrecto = false
				}
				if (mincarg < 0) {
					Mensaje("error", "La hora desde debe ser menor a hasta")
					valorcorrecto = false
				}
				if (!validaHoras(Number(inputValue))) {
					Mensaje("error", `El valor es incorrecto en horas desde ${inputValue}`)
					valorcorrecto = false
				}
				if (!validaMinutos(Number(inputValue2))) {
					Mensaje("error", `Los minutos no pueden ser mayor a en hasta 59`)
					valorcorrecto = false
				}

				if (!validaHoras(Number(inputValue2))) {
					Mensaje("error", `El valor es incorrecto en horas hasta ${inputValue2}`)
					valorcorrecto = false
				}
				if (valorcorrecto) {
					const { horas, minutos, impMot1 } = convhoraminutos(mincarg, valorhoramotN)
					const newId = rowsMot1.length + 1;
					const newRow = {
						id: newId,
						mot1desde: Number(inputValue),
						mot1hasta: Number(inputValue2),
						horamot1: horas,
						minutmot1: minutos,
						mot1importe: Number(impMot1, 2),
					};
					setRowsMot1((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
					setSumaMot1(sumaMot1 + (newRow.mot1importe))
					let horasacum = thsMot1
					let minutosacum = tminMot1
					if (minutosacum + newRow.minutmot1 > 59) {
						horasacum++
						minutosacum = minutosacum - 60
					}
					setTHsMot1(horasacum + newRow.horamot1)
					setTMinMot1(minutosacum + newRow.minutmot1)
				}
			}
			if (eligeMot2) {
				let valorcorrecto = true
				let mincarg = calculaminutos(Number(inputValue2)) - calculaminutos(Number(inputValue))
				if (!validaMinutos(Number(inputValue))) {
					Mensaje("error", "Los minutos no pueden ser mayor a en desde 59")
					valorcorrecto = false
				}
				if (mincarg < 0) {
					Mensaje("error", "La hora desde debe ser menor a hasta")
					valorcorrecto = false
				}
				if (!validaHoras(Number(inputValue))) {
					Mensaje("error", `El valor es incorrecto en horas desde ${inputValue}`)
					valorcorrecto = false
				}
				if (!validaMinutos(Number(inputValue2))) {
					Mensaje("error", `Los minutos no pueden ser mayor a en hasta 59`)
					valorcorrecto = false
				}

				if (!validaHoras(Number(inputValue2))) {
					Mensaje("error", `El valor es incorrecto en horas hasta ${inputValue2}`)
					valorcorrecto = false
				}
				if (valorcorrecto) {
					const { horas, minutos, impMot1 } = convhoraminutos(mincarg, valorhoramotN)
					const newId = rowsMot2.length + 1;
					const newRow = {
						id: newId,
						mot2desde: Number(inputValue),
						mot2hasta: Number(inputValue2),
						horamot2: horas,
						minutmot2: minutos,
						mot2importe: Number(impMot1 * 2, 2),
					};
					setRowsMot2((prevRows) => [...prevRows, newRow]); // Agregar la nueva fila
					setSumaMot2(sumaMot2 + (newRow.mot2importe))
					let horasacum = thsMot2
					let minutosacum = tminMot2
					if (minutosacum + newRow.minutmot2 > 59) {
						horasacum++
						minutosacum = minutosacum - 60
					}
					setTHsMot2(horasacum + newRow.horamot2)
					setTMinMot2(minutosacum + newRow.minutmot2)
				}
			}

			setInputValue('')
			setInputValue2('')
			inputRef.current.focus();
		}
		else {

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
	};

	const handleChange = (event) => {
		setLonaAN(event.target.value);
		const minutosmot1 = thsMot1 * 60 + tminMot1
		const minutosmot2 = thsMot2 * 60 + tminMot2
		let importemot1 = 0
		let importemot2 = 0
		if (event.target.value === "LN") {
			importemot1 = valorhoramotN * minutosmot1 / 60
			setSumaMot1(importemot1)
			importemot2 = valorhoramotN * minutosmot2 / 60
			setSumaMot2(importemot2)
		}
		if (event.target.value === "LA") {
			importemot1 = valorhoramotA * minutosmot1 / 60
			setSumaMot1(importemot1)
			importemot2 = valorhoramotA * minutosmot2 / 60
			setSumaMot2(importemot2)
		}
		const valorA = sumaParcheleg + importemot2 + importemot1 + sumaVarios + sumaChicotes
		setImpTotalRep(valorA)
	}

	const CalculaReparacion = () => {
		const valorA = sumaParcheleg + sumaMot2 + sumaMot1 + sumaVarios + sumaChicotes
		setImpTotalRep(valorA)
	}

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
		CalculaChicotes()
		setEligeChicotes(true);
		setPideSegundoValor(true)
		setPrimerLabel('Cantidad')
		setSegundoLabel('Largo')
		setTituloDialogo('Ingreso de Chicotes')
		setOpen(true);
	}
	const cargavarios = () => {
		setEligeVarios(true);
		setPideSegundoValor(true)
		setPrimerLabel('Cantidad')
		setSegundoLabel('Importe')
		setTituloDialogo('Ingreso de Varios')
		setOpen(true);
	}
	const cargaMot1 = () => {
		BuscaValorHora()
		setEligeMot1(true);
		setPideSegundoValor(true)
		setPrimerLabel('HH:MM Desde')
		setSegundoLabel('HH:MM Hasta')
		setTituloDialogo('Ingreso MOT 1Pers')
		setOpen(true);
	}
	const cargaMot2 = () => {
		BuscaValorHora()
		setEligeMot2(true);
		setPideSegundoValor(true)
		setPrimerLabel('HH:MM Desde')
		setSegundoLabel('HH:MM Hasta')
		setTituloDialogo('Ingreso MOT 2Pers')
		setOpen(true);
	}
	const borrafila = (gridId) => {

		let filtrados = []
		if (rowSelectionModel.length !== 0) {

			rowSelectionModel.map((row) => {
				if (gridId === 'parcheleg') {
					setRowsParcheleg(rowsparcheleg.filter((rows) => rows.id !== row))
					filtrados = rowsparcheleg.filter((rows) => rows.id !== row)
				}
				if (gridId === 'chicotes') {
					setRowsChicotes(rowschicotes.filter((rows) => rows.id !== row))
					filtrados = rowschicotes.filter((rows) => rows.id !== row)
				}
				if (gridId === 'varios') {
					setRowsVarios(rowsvarios.filter((rows) => rows.id !== row))
					filtrados = rowsvarios.filter((rows) => rows.id !== row)
				}
				if (gridId === 'mot1') {
					setRowsMot1(rowsMot1.filter((rows) => rows.id !== row))
					filtrados = rowsMot1.filter((rows) => rows.id !== row)
				}
				if (gridId === 'mot2') {
					setRowsMot2(rowsMot2.filter((rows) => rows.id !== row))
					filtrados = rowsMot2.filter((rows) => rows.id !== row)
				}
			}
			);
		}
		if (filtrados.length !== 0) {
			if (gridId === 'parcheleg') {
				const totalAmount = filtrados.reduce((sum, row) => sum + row.imptparche, 0);
				setSumaParcheleg(totalAmount)
			}
			if (gridId === 'chicotes') {
				const totalAmount = filtrados.reduce((sum, row) => sum + row.imptchicote, 0);
				setSumaChicotes(totalAmount)
			}
			if (gridId === 'varios') {
				const totalAmount = filtrados.reduce((sum, row) => sum + row.imptvarios, 0);
				setSumaVarios(totalAmount)
			}
			if (gridId === 'mot1') {
				const totalAmountH = filtrados.reduce((sum, row) => sum + row.horamot1, 0);
				const totalAmountM = filtrados.reduce((sum, row) => sum + row.minutmot1, 0);
				const totalAmount = (totalAmountH * 60 + totalAmountM) * valorhoramotN / 60;
				setSumaMot1(totalAmount)
			}
			if (gridId === 'mot2') {
				const totalAmountH = filtrados.reduce((sum, row) => sum + row.horamot2, 0);
				const totalAmountM = filtrados.reduce((sum, row) => sum + row.minutmot2, 0);
				const totalAmount = (totalAmountH * 60 + totalAmountM) * valorhoramotN / 60;
				setSumaMot2(totalAmount)
			}

		}
		else {
			if (gridId === 'parcheleg') {
				setSumaParcheleg(0)
			}
			if (gridId === 'chicotes') {
				setSumaChicotes(0)
			}
			if (gridId === 'varios') {
				setSumaVarios(0)
			}
			if (gridId === 'mot1') {
				setSumaMot1(0)
			}
			if (gridId === 'mot2') {
				setSumaMot2(0)
			}
		}
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
				<div style={{ height: 435, width: '20%', paddingBottom: 5, paddingLeft: 15 }}>

					<RadioButtonLNLA lonaAN={lonaAN} handleChange={handleChange} />
					<Paper elevation={2} sx={{ padding: 1, textAlign: 'center', width: 150 }}>
						<Typography variant="subtitle2" color="textSecondary">
							Importe Con IVA
						</Typography>
						<Box mt={1}>
							<Typography variant="h8" color="primary">
								${ImpTotalRep.toFixed(2)}
							</Typography>
						</Box>
					</Paper>
					<br />
					<Paper elevation={2} sx={{ padding: 1, textAlign: 'center', width: 150 }}>
						<Typography variant="subtitle2" color="textSecondary">
							Importe Sin IVA
						</Typography>
						<Box mt={1}>
							<Typography variant="h8" color="primary">
								${(ImpTotalRep / 1.21).toFixed(2)}
							</Typography>
						</Box>
					</Paper>
					<br />
					<TextField id="nomCliente"
						label="Nombre del cliente"
						variant="standard"
						value={nomCliente}
						onChange={(e) => setNomCliente(e.target.value)}
						sx={{ width: 200 }} />
					<br />
					<br />
					<Button className={estilo.botoncalculo} onClick={() => CalculaReparacion()}>Calcular</Button>

					<Button className={estilo.botoncalculo} onClick={() => abreImprime()}>Imprime</Button>
					<br />
					<br />
					<Button className={estilo.botoncalculo} onClick={() => ImpLimp()}>Limpia</Button>

					{imprime && (
						<ImpReparacion
							open={imprime}
							handleClose={cierraImprime}
							rowsvarios={rowsvarios}
							rowschicotes={rowschicotes}
							rowsMot1={rowsMot1}
							rowsMot2={rowsMot2}
							rowsparcheleg={rowsparcheleg}
							sumaVarios={sumaVarios}
							sumaParcheleg={sumaParcheleg}
							sumaChicotes={sumaChicotes}
							sumaMot1={sumaMot1}
							sumaMot2={sumaMot2}
							ImpTotalRep={ImpTotalRep}
							nomCliente={nomCliente}
						// renglondef={renglondef}
						></ImpReparacion>
					)}
				</div>
			</Grid>
			<div style={{ height: 150, width: '100%', paddingTop: 15 }}>
				<Grid container spacing={2}>
					<CustomDataGrid
						id="parcheleg"
						rows={rowsparcheleg}
						columns={colparcheleg}
						onDeleteRow={borrafila}
						toolbar={() => <CustomToolbarParchEleg sumaParcheleg={sumaParcheleg} />}
						onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
						customStyles={{ width: '21%', paddingLeft: 0 }}
					/>

					<CustomDataGrid
						id="chicotes"
						rows={rowschicotes}
						columns={colchicotes}
						onDeleteRow={borrafila}
						toolbar={() => <CustomToolbarChicotes sumaChicotes={sumaChicotes} cargachicotes={cargachicotes} />}
						onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
						customStyles={{ width: '20%', paddingLeft: 10 }}
					/>

					<CustomDataGrid
						id="varios"
						rows={rowsvarios}
						columns={colvarios}
						toolbar={() => <CustomToolbarVarios sumaVarios={sumaVarios} cargavarios={cargavarios} />}
						onDeleteRow={borrafila}
						onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
						customStyles={{ width: '19%', paddingLeft: 10 }}
					/>

					<CustomDataGrid
						id="mot1"
						rows={rowsMot1}
						columns={colMot1}
						toolbar={() => <CustomToolbarMot1 sumaMot1={sumaMot1} cargaMot1={cargaMot1} thsMot1={thsMot1} tminMot1={tminMot1} />}
						onDeleteRow={borrafila}
						onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
						customStyles={{ width: '20%', paddingLeft: 10 }}
					/>

					<CustomDataGrid
						id="mot2"
						rows={rowsMot2}
						columns={colMot2}
						toolbar={() => <CustomToolbarMot2 sumaMot2={sumaMot2} cargaMot2={cargaMot2} thsMot2={thsMot2} tminMot2={tminMot2} />}
						onDeleteRow={borrafila}
						onRowSelectionModelChange={(newRowSelectionModel) => setRowSelectionModel(newRowSelectionModel)}
						customStyles={{ width: '20%', paddingLeft: 10 }}
					/>
				</Grid>
			</div>

			{/* Diálogo para ingresar la cantidad */}
			<DialogoCarga
				open={open}
				handleClose={handleClose}
				titulodialogo={titulodialogo}
				inputRef={inputRef}
				inputValue={inputValue}
				setInputValue={setInputValue}
				inputRef2={inputRef2}
				inputValue2={inputValue2}
				setInputValue2={setInputValue2}
				pidesegundovalor={pidesegundovalor}
				primerlabel={primerlabel}
				segundolabel={segundolabel}
				botonRef={botonRef}
				handleKeyDown={handleKeyDown}
				handleConfirm={handleConfirm} />

		</Box>
	);
}

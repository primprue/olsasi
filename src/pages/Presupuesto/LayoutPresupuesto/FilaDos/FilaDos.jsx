import React, { useEffect, lazy, Suspense, useState, useRef, useMemo } from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Snackbar from '@mui/material/Snackbar';

import Alert from "@mui/material/Alert";
import Slide from '@mui/material/Slide';

import { stkrubroleeconf } from "../../../Tablas/StkRubros/StkRubroLeeConf";
import { presupcalculador } from "../../PresupCalculador";
import { stkmonedasleerorig } from "../../../Tablas/Monedas/StkMonedasLeerOrig";
import ArchiveIcon from "@mui/icons-material/Archive";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import { red, green } from "@mui/material/colors";
import { GeneraDCalculo } from "./GeneraDCalculo";
import estilo from "../../../../Styles/TextFieldSelect.module.css"
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
const TablaPresup = lazy(() => import("../TablaPresup/TablaPresup"));
const FilaConf = lazy(() => import("../FilaConf/FilaConf"));
const FilaEnrollables = lazy(() =>
	import("../FilaEnrollables/FilaEnrollables")
);
const FilaTanques = lazy(() => import("../FilaTanques/FilaTanques"));
const FilaPiletasEnr = lazy(() => import("../FilaPiletas/FilaPiletasEnr"));
const FilaToldosExt = lazy(() => import("../FilaToldosExt/FilaToldosExt"));
const FilaDetDesc = lazy(() => import("./FilaDetDesc"));
const FilaCargaDesc = lazy(() => import("./FilaCargaDesc"));
const FilaAbolinada = lazy(() => import("../FilaAbolinada/FilaAbolinada"));
const FilaComedero = lazy(() => import("../FilaComedero/FilaComedero"));
const FilaCambPanio = lazy(() => import("../FilaCambPanio/FilaCambPanio"));
const FilaModMed = lazy(() => import("../FilaModMed/FilaModMed"));
const FilaAbanico = lazy(() => import("../FilaAbanico/FilaAbanico"));
const FilaLateral = lazy(() => import("../FilaLateral/FilaLateral"));

import Agregar from "./Agregar";
import TextFieldSelect from "../../../../components/comppropios/TextFieldSelect";
import TextFieldComun from "../../../../components/comppropios/TextFieldComun";

export default function FilaDos() {
	// Esto es para poder consumir los datos del CONTEXTAPI
	const [snackbar, setSnackbar] = React.useState(null);
	const handleCloseSnackbar = () => setSnackbar(null);
	const { state, setState } = use(PresupPant);
	const { datosrenglon, setDatosRenglon } = use(PresupPant);



	let labellargo = "Largo";
	let labelancho = "Ancho";
	const { inicializaPresup } = use(PresupPant);
	const renderCount = useRef(0);
	renderCount.current += 1;
	const [stkrubrosleidos, setStkRubrosleidos] = useState([]);
	const [otramoneda, setOtraMoneda] = useState(false);
	const [cotidivisa, setCotidivisa] = useState(1.0);


	if (state.DatosPresupEleg.length !== 0) {
		var largo = state.DatosPresupEleg[0].PresupConfTipoLargo;
		var ancho = state.DatosPresupEleg[0].PresupConfTipoAncho;
		var presuptipo = state.DatosPresupEleg[0].PresupConfTipoDesc;
		//esto es porque va a ser un cálculo especial, tiene un backend para eso
		var rubrosn = "";

		if (state.DatosPresupEleg[0].PresupConfTipoRubro === "VS") {
			rubrosn = "S";
		} else {
			rubrosn = "N";
		}

		if (
			presuptipo === "LONAS ENROLLABLES" ||
			presuptipo === "TOLDO BARRACUADRA" ||
			presuptipo === "LATERAL CORREDIZO"
		) {
			labellargo = "Alto";
		}
		if (presuptipo === "CARGA DESCRIPCION") {
			labellargo = "Importe";
		}
		if (presuptipo === "CAMBIO PISO PILETA") {
			labellargo = "Largo/Diametro";
		}
		if (presuptipo === "CAMBIO PAÑO") {
			labelancho = "Ancho Lona";
			labellargo = "Paños en metros";
		}
		if (presuptipo === "MODIFICA MEDIDAS") {
			labelancho = "Ancho Actual";
			labellargo = "Largo Actual";
		}
	}


	const handleChange = (value, id) => {
		setState({ ...state, [id]: value });

	};


	async function stkrubroleerconf(cuallee) {
		const result = await stkrubroleeconf(cuallee);
		setStkRubrosleidos(result)
	}

	async function leermonedas() {

		const result = await stkmonedasleerorig();
		setState({ ...state, monedasleidas: result });
		// setCotidivisa(result[0].StkMonedasCotizacion);
	}


	useEffect(() => {
		if (presuptipo === "UNIDAD") {
			stkrubroleerconf("T");
		} else {
			stkrubroleerconf("S");
		}
	}, [presuptipo]); // eslint-disable-line react-hooks/exhaustive-deps



	useEffect(() => {
		leermonedas();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function agregar() {
		var indicetp1 = state.indicetp + 1;
		setState({ ...state, indicetp: indicetp1 });

		var PresupCantidadM = state.PresupCantidad;

		var dcalculo = [];

		var statepasante = state;
		var dcalculo1 = await GeneraDCalculo(statepasante, presuptipo, cotidivisa);

		if (dcalculo1.faltadato === true) {
			setSnackbar({
				children: "Faltan datos para el presupuesto",
				severity: "warning",
			});
		} else {
			dcalculo.push(dcalculo1);
			var datoscalculos = JSON.stringify(dcalculo);
			const datosrenglon1 = await presupcalculador(
				state.DatosPresupEleg[0],
				datoscalculos,
				presuptipo
			);
			var datospresup = ''
			datospresup = await Agregar(
				datosrenglon1,
				indicetp1,
				rubrosn,
				PresupCantidadM,
				otramoneda,
				// otramoneda.current,
				state.DescripPresup,
				state.renglonanexo,
				dcalculo
			);
			if (state.renglonanexo.length !== 0) {
				setDatosRenglon([...datosrenglon, state.renglonanexo]);
				setDatosRenglon([...datosrenglon, datospresup[0]]);
			} else {
				setDatosRenglon([...datosrenglon, datospresup[0]]);
			}
		}

	}

	const [selectedValues, setSelectedValues] = useState({});
	const handleSelectChange = (value, id) => {
		setState({ ...state, [id]: value });
		setSelectedValues((prev) => ({
			...prev,
			[id]: value,
		}));
		if (id === "idStkMonedas") {
			const monedaEncontrada = state.monedasleidas.find(m => m.idStkMonedas === value);
			setCotidivisa(monedaEncontrada.StkMonedasCotizacion);
		}
	};
	const textdata = useMemo(() => {
		if (stkrubrosleidos.length === 0) return [];

		return [{
			id: "StkRubroAbr",
			label: "Rubro",
			value: stkrubrosleidos.StkRubroAbr,
			options: stkrubrosleidos.map((option) => ({
				value: option.StkRubroAbr,
				label: option.StkRubroDesc
			}))
		}];
	}, [stkrubrosleidos]);


	let textdatam = [];

	if (state.monedasleidas !== undefined) {
		if (state.monedasleidas.length > 0) {
			textdatam = [{
				id: "idStkMonedas",
				label: "Moneda",
				value: state.monedasleidas[0].idStkMonedas,
				options: state.monedasleidas.map((option) => ({
					value: option.idStkMonedas,
					label: option.StkMonedasDescripcion
				}))
			}];

		}
	}




	function TransitionRight(props) {
		return <Slide {...props} direction="right" />;
	}
	return (
		<>
			<Grid>
				{/* <p>Renderizado: {renderCount.current} veces   </p> */}
				<Grid container size={{ xs: 1 }}>
					{rubrosn === "S" &&
						textdata.length > 0 ? (
						textdata.map(({ id, label, value, options }, index) => (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options}
								width="350px"
							/>
						))) : ('')}

				</Grid>
			</Grid>
			{presuptipo === "PAÑO UNIDO" && (
				<Grid size={{ xs: 1 }}>
					<TextFieldComun
						id="PresupVeces"
						type="number"
						label="Veces "
						value={state.PresupVeces}
						onChange={handleChange}
						width="100px"
					/>
				</Grid>
			)}
			{presuptipo !== "MODIFICA MEDIDAS" && (
				<Grid size={{ xs: 1 }}>
					<TextFieldComun
						id="PresupCantidad"
						type="number"
						label="Cantidad "
						value={state.PresupCantidad}
						onChange={handleChange}
						width="100px"
					/>
				</Grid>
			)}
			{largo !== "N" && (
				<Grid size={{ xs: 1 }}>
					<TextFieldComun
						id="PresupLargo"
						type="number"
						label={labellargo}
						value={state.PresupLargo}
						onChange={handleChange}
						width="120px"
					/>

				</Grid>
			)}{" "}
			{ancho !== "N" && (
				<Grid size={{ xs: 1 }}>
					<TextFieldComun
						id="PresupAncho"
						type="number"
						label={labelancho}
						value={state.PresupAncho}
						onChange={handleChange}
						width="100px"
					/>

				</Grid>
			)}
			<Grid container size={{ xs: 8 }}>
				{presuptipo === "CONFECCIONADA" && <FilaConf></FilaConf>}
				{presuptipo === "LONAS ENROLLABLES" && (
					<FilaEnrollables></FilaEnrollables>
				)}
				{presuptipo === "TOLDO ABANICO" && <FilaAbanico></FilaAbanico>}
				{presuptipo === "ABOLINADA" && <FilaAbolinada></FilaAbolinada>}
				{presuptipo === "CAMBIO PAÑO" && <FilaCambPanio></FilaCambPanio>}
				{presuptipo === "COMEDERO" && <FilaComedero></FilaComedero>}
				{presuptipo === "LATERAL CORREDIZO" && <FilaLateral></FilaLateral>}
				{presuptipo === "MODIFICA MEDIDAS" && <FilaModMed></FilaModMed>}
				{presuptipo === "PILETA ENROLLABLE" && (
					<FilaPiletasEnr></FilaPiletasEnr>
				)}
				{presuptipo === "PILETAS C/SOGA ELASTICA" && (
					<FilaPiletasEnr></FilaPiletasEnr>
				)}
				{presuptipo === "BOLSON PARA TANQUE" && <FilaTanques></FilaTanques>}
				{presuptipo === "PILETA CAÑOS ALUMINIO" && (
					<FilaPiletasEnr></FilaPiletasEnr>
				)}
				{presuptipo === "TOLDO BARRACUADRA" && <FilaToldosExt></FilaToldosExt>}
				{presuptipo === "CARGA DESCRIPCION" ? (
					<FilaCargaDesc></FilaCargaDesc>
				) : (
					<></>
				)}

				<Grid size={2} padding={1}>
					{state.monedasleidas.length > 0 &&
						textdatam.map(({ id, label, value, options }, index) => (
							<TextFieldSelect
								key={index}
								id={id}
								label={label}
								width="150px"
								value={selectedValues[id] ?? value ?? ''}
								onChange={handleSelectChange}
								options={options} />
						))}
				</Grid>
			</Grid>

			{presuptipo !== "UNIDAD" && rubrosn === "S" ? (
				<FilaDetDesc presuptipo={presuptipo}></FilaDetDesc>
			) : (
				<></>
			)
			}

			<Grid >
				<IconButton onClick={() => agregar()} color="primary">
					<ArchiveIcon
						style={{ color: green[500] }}
						fontSize="large"
						titleAccess="Agregar"
					/>
				</IconButton>
			</Grid>
			<Grid >
				<IconButton onClick={inicializaPresup} color="primary">
					<CancelPresentationTwoToneIcon
						style={{ color: red[500] }}
						fontSize="large"
						titleAccess="Reinicio de Presupuesto"
					/>
				</IconButton>
			</Grid >
			<Suspense fallback={<>...</>}>
				<TablaPresup data={datosrenglon} />
			</Suspense>
			{
				!!snackbar && (
					<Snackbar
						open
						anchorOrigin={{ vertical: "top", horizontal: "center" }}
						onClose={handleCloseSnackbar}
						autoHideDuration={1200}
						sx={{ width: '100%' }}
					// TransitionComponent={TransitionRight}
					>
						<Alert {...snackbar} variant="filled" onClose={handleCloseSnackbar} />
					</Snackbar>
				)
			}
		</>
	);
}


// eligemoneda.current = true;
// monedaelegida.current = value;
// const monedaEncontrada = stkmonedasleidos.current.find(m => m.idStkMonedas === value);
// cotidivisa.current = monedaEncontrada.StkMonedasCotizacion;
// const monedaEncontrada = state.stkmonedasleidos.find(m => m.idStkMonedas === value);
// setCotidivisa(monedaEncontrada.StkMonedasCotizacion);

// let textdatam = [];

// if (stkmonedasleidos.current !== undefined) {
// 	if (stkmonedasleidos.current.length > 0) {
// 		monedasleidos.current = true;
// 		textdatam = [{
// 			id: "idStkMonedas",
// 			label: "Moneda",
// 			value: stkmonedasleidos.current[0].idStkMonedas,
// 			options: stkmonedasleidos.current.map((option) => ({
// 				value: option.idStkMonedas,
// 				label: option.StkMonedasDescripcion
// 			}))
// 		}];

// 	}
// }
// const textdatam = useMemo(() => {

// 	if (state.monedasleidas.length === 0) return [];
// 	return [{
// 		id: "idStkMonedas",
// 		label: "Moneda",
// 		value: state.monedasleidas[0].idStkMonedas,
// 		options: state.monedasleidas.map((option) => ({
// 			value: option.idStkMonedas,
// 			label: option.StkMonedasDescripcion
// 		}))
// 	}];

// }, [state.monedasleidas]);

// useEffect(() => {
// 	sacadatosmonedas();
// }, [eligemoneda]); // eslint-disable-line react-hooks/exhaustive-deps

// useEffect(() => {
// 	leermonedas();
// 	sacadatosmonedas();
// }, [state.monedasleidas.length <= 0]); // eslint-disable-line react-hooks/exhaustive-deps

//const [eligemoneda, setEligeMoneda] = useState(true);
// const otramoneda = useRef(false);
// const eligemoneda = useRef(false);
// const monedaelegida = useRef('');
// const monedasleidos = useRef(false);
// const stkmonedasleidos = useRef();
// const cotidivisa = useRef(0.0);
// const presuptipo = state.DatosPresupEleg?.[0]?.PresupConfTipoDesc || "";


// const sacadatosmonedas = () => {
// 	console.log('sacadatosmonedas', state.monedasleidas)
// 	const objetosFiltrados = state.monedasleidas.filter(
// 		(objeto) => objeto.idStkMonedas === state.idStkMonedas
// 	);
// 	console.log('sacadatosmonedas objetosFiltrados ', objetosFiltrados)
// 	if (objetosFiltrados.length > 0) {
// 		setCotidivisa(objetosFiltrados[0].StkMonedasCotizacion);
// 		setState({ ...state, signomoneda: objetosFiltrados[0].StkMonedasSigno });
// 		setOtraMoneda(true);
// 		setEligeMoneda(false);
// 	}
// };
// async function leermonedas() {
// 	const result = await stkmonedasleerorig();
// 	stkmonedasleidos.current = result
// }
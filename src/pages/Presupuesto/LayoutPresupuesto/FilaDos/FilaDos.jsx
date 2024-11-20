import React, { useEffect, lazy, Suspense, useState } from "react";
import { TextField, Grid, IconButton, FormHelperText } from "@mui/material";

import styles from "../styles.module.css";
import estilo from "../../../../Styles/TextFieldSelect.module.css";
import estilot from "../../../../Styles/TextField.module.css";
import { stkrubroleeconf } from "../../../Tablas/StkRubros/StkRubroLeeConf";
import { presupcalculador } from "../../PresupCalculador";
import { stkmonedasleerorig } from "../../../Tablas/Monedas/StkMonedasLeerOrig";
import ArchiveIcon from "@mui/icons-material/Archive";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import { red, green } from "@mui/material/colors";
import { GeneraDCalculo } from "./GeneraDCalculo";
// Context
import { useContext } from "react";
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

export default function FilaDos() {
	// Esto es para poder consumir los datos del CONTEXTAPI

	const { state, setState } = useContext(PresupPant);
	const { datosrenglon, setDatosRenglon } = useContext(PresupPant);

	const [otramoneda, setOtraMoneda] = useState(false);
	const [eligemoneda, setEligeMoneda] = useState(false);
	const [cotidivisa, setCotidivisa] = useState(0.0);
	let labellargo = "Largo";
	let labelancho = "Ancho";
	const { inicializaPresup } = useContext(PresupPant);
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

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });

		if (id === "idStkMonedas") {
			setEligeMoneda(true);
		}
	};

	const sacadatosmonedas = () => {
		const objetosFiltrados = state.monedasleidas.filter(
			(objeto) => objeto.idStkMonedas === state.idStkMonedas
		);

		if (objetosFiltrados.length > 0) {
			setCotidivisa(objetosFiltrados[0].StkMonedasCotizacion);
			setState({ ...state, signomoneda: objetosFiltrados[0].StkMonedasSigno });
			setOtraMoneda(true);
			setEligeMoneda(false);
		}
	};
	async function stkrubroleerconf(cuallee) {
		const result = await stkrubroleeconf(cuallee);
		setState({ ...state, stkrubro: result });
	}
	async function leermonedas() {
		const result = await stkmonedasleerorig();
		setState({ ...state, monedasleidas: result });
	}

	useEffect(() => {
		if (presuptipo === "UNIDAD") {
			stkrubroleerconf("T");
		} else {
			stkrubroleerconf("S");
		}
	}, [presuptipo]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		sacadatosmonedas();
	}, [eligemoneda]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		leermonedas();
		sacadatosmonedas();
	}, [state.monedasleidas.length <= 0]); // eslint-disable-line react-hooks/exhaustive-deps
	async function agregar() {
		var indicetp1 = state.indicetp + 1;
		setState({ ...state, indicetp: indicetp1 });

		var PresupCantidadM = state.PresupCantidad;

		var dcalculo = [];

		var statepasante = state;
		var dcalculo1 = await GeneraDCalculo(statepasante, presuptipo, cotidivisa);
		dcalculo.push(dcalculo1);
		var datoscalculos = JSON.stringify(dcalculo);
		const datosrenglon1 = await presupcalculador(
			state.DatosPresupEleg[0],
			datoscalculos,
			presuptipo
		);
		var datospresup = await Agregar(
			datosrenglon1,
			indicetp1,
			rubrosn,
			PresupCantidadM,
			otramoneda,
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
	const textdata = [
		{
			id: "StkRubroAbr",
			label: "Rubro",
			value: state.StkRubroAbr,
			mapeo: (
				<>
					<option />
					{state.stkrubro.map((option) => (
						<option key={option.StkRubroAbr} value={option.StkRubroAbr}>
							{option.StkRubroDesc}
						</option>
					))}
				</>
			),
		},
	];
	const textdatam = [
		{
			id: "idStkMonedas",
			label: "Moneda",
			value: state.idStkMonedas,
			mapeo: (
				<>
					<option />
					{state.monedasleidas.map((optionm) => (
						<option key={optionm.idStkMonedas} value={optionm.idStkMonedas}>
							{optionm.StkMonedasDescripcion}
						</option>
					))}
				</>
			),
		},
	];
	return (
		<>
			<Grid item>
				{rubrosn === "S" &&
					state.stkrubro.length > 0 &&
					textdata.map((data) => (
						<TextField
							className={estilo.selectField}
							key={data.id}
							id={data.id}
							size="small"
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							select
							label={data.label}
							value={data.value}
							onChange={handleChange}
							variant="outlined"
							margin="dense"
						>
							{data.mapeo}
						</TextField>
					))}
			</Grid>
			{presuptipo === "PAÑO UNIDO" && (
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 5 }}
						size="small"
						variant="outlined"
						id="PresupVeces"
						type="number"
						label="Veces"
						fullWidth
						margin="dense"
						value={state.PresupVeces}
						onChange={handleChange}
						// className={classes.textField}
						className={estilot.textfcantidad}
					/>
				</Grid>
			)}
			{presuptipo !== "MODIFICA MEDIDAS" && (
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 5 }}
						size="small"
						variant="outlined"
						id="PresupCantidad"
						type="number"
						label="Cantidad"
						fullWidth
						margin="dense"
						value={state.PresupCantidad}
						onChange={handleChange}
						// className={classes.textField}
						className={estilot.textfcantidad}
					/>
				</Grid>
			)}
			{largo !== "N" && (
				<Grid item xs={1}>
					<TextField
						disabled={largo === "N"}
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupLargo"
						type="number"
						label={labellargo}
						fullWidth
						margin="dense"
						value={state.PresupLargo}
						onChange={handleChange}
						// className={classes.textField}
						className={estilot.textfcantidad}
					/>
				</Grid>
			)}{" "}
			{ancho !== "N" && (
				<Grid item xs={1}>
					<TextField
						disabled={ancho === "N"}
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupAncho"
						type="number"
						label={labelancho}
						fullWidth
						margin="dense"
						value={state.PresupAncho}
						onChange={handleChange}
						// className={classes.textField}
						className={estilot.textfcantidad}
					/>
				</Grid>
			)}
			<Grid container item xs={12}>
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
				{presuptipo !== "UNIDAD" && rubrosn === "S" ? (
					<FilaDetDesc presuptipo={presuptipo}></FilaDetDesc>
				) : (
					<></>
				)}
			</Grid>{" "}
			<Grid container item xs={1}>
				{state.monedasleidas.length > 0 &&
					textdatam.map((data) => (
						<TextField
							className={estilo.selectField}
							key={data.id}
							id={data.id}
							fullWidth
							size="small"
							select
							label={data.label}
							margin="dense"
							value={data.value}
							onChange={handleChange}
							SelectProps={{ native: true }}
							variant="outlined"
						//className={classes.textField}
						>
							{data.mapeo}
						</TextField>
					))}
			</Grid>
			<Grid item>
				<IconButton onClick={() => agregar()} color="primary">
					<ArchiveIcon
						style={{ color: green[500] }}
						fontSize="large"
						titleAccess="Agregar"
					/>
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton onClick={inicializaPresup} color="primary">
					<CancelPresentationTwoToneIcon
						style={{ color: red[500] }}
						fontSize="large"
						titleAccess="Reinicio de Presupuesto"
					/>
				</IconButton>
			</Grid>
			<Suspense fallback={<>...</>}>
				<TablaPresup data={datosrenglon} />
			</Suspense>
			{/* </Grid> */}
		</>
	);
}

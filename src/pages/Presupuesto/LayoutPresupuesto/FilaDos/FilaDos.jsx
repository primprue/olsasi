import React, { useEffect, lazy, Suspense, useState, useRef } from "react";
import { TextField, Grid, IconButton } from "@mui/material";

import styles from "../styles.module.css";
import { stkrubroleeconf } from "../../../Tablas/StkRubros/StkRubroLeeConf";
import { presupcalculador } from "../../PresupCalculador";
import { stkmonedasleerorig } from "../../../Tablas/Monedas/StkMonedasLeerOrig";
import ArchiveIcon from "@mui/icons-material/Archive";
// import { presupgrabar } from "../../PresupGrabar";
import { red } from "@mui/material/colors";
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
import useAgregar from "./useAgregar";

export default function FilaDos() {
	// Esto es para poder consumir los datos del CONTEXTAPI

	const { state, setState } = useContext(PresupPant);
	const { datosrenglon, setDatosRenglon } = useContext(PresupPant);

	const [otramoneda, setOtraMoneda] = useState(false);
	const [eligemoneda, setEligeMoneda] = useState(false);
	const [cotidivisa, setCotidivisa] = useState(0.0);
	let labellargo = "Largo";
	let labelancho = "Ancho";
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
			// eligemoneda = true;
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
			// otramoneda = true;
			// eligemoneda = false;
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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
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

		var datospresup = await useAgregar(
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
	const classes = styles;
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
			{/* <Grid
				container
				spacing={3}
				alignItems="flex-end"
				// direction="row"
				// justify="center"
				//padding={1}
				xs={12}
			> */}
			{rubrosn === "S" &&
				state.stkrubro.length > 0 &&
				textdata.map((data) => (
					<TextField
						key={data.id}
						id={data.id}
						size="small"
						inputProps={{ maxLength: 3 }}
						select
						label={data.label}
						value={data.value}
						onChange={handleChange}
						SelectProps={{ native: true }}
						variant="outlined"
						margin="dense"
					>
						{data.mapeo}
					</TextField>
				))}
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
						className={classes.textField}
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
						className={classes.textField}
					/>
				</Grid>
			)}
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
					className={classes.textField}
				/>
			</Grid>
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
					className={classes.textField}
				/>
			</Grid>
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
			<Grid container item xs={6}>
				{state.monedasleidas.length > 0 &&
					textdatam.map((data) => (
						<TextField
							key={data.id}
							id={data.id}
							//fullWidth
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

				<IconButton onClick={() => agregar()} color="primary">
					<ArchiveIcon
						style={{ color: red[500] }}
						fontSize="large"
						titleAccess="Agregar"
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

// }
// async function agregar() {
// 	var indicetp1 = state.indicetp + 1;
// 	setState({ ...state, indicetp: indicetp1 });
// 	var dcalculo = [
// 		{
// 			StkRubroAbr: state.StkRubroAbr,
// 			minmay: state.PresupMnMy,
// 			ivasn: state.PresupIVA,
// 			cantidad: state.PresupCantidad,
// 			veces: state.PresupVeces,
// 			largo: state.PresupLargo,
// 			ancho: state.PresupAncho,
// 			largon: state.PresupLargoN,
// 			anchon: state.PresupAnchoN,
// 			tipoconf: state.PresupCsSs,
// 			tipoojale: state.PresupOB,
// 			drenajesn: state.PresupDrenaje,
// 			detallep: state.DetallePresup,
// 			detaller: state.DetalleRenglon,
// 			tamfaja: state.TamFaja,
// 			tamcristal: state.TamCristal,
// 			altovolado: state.AltoVolado,
// 			presupojalesc: state.PresupOjalesC,
// 			sobrantemarco: state.SobranteMarco,
// 			tipomedeleg: state.TipoMedidaEleg,
// 			termbordeeleg: state.TermBordeEleg,
// 			anchopared: state.AnchoPared,
// 			medida: state.Medida,
// 			//para el alto del tanque
// 			alto: state.Alto,
// 			stkrubroabrtbr: state.StkRubroAbrTBR,
// 			tipomecanismo: state.TipoMecanismo,
// 			anchocomedero: state.AnchoComederoEleg,
// 			lonanuestraafuera: state.PreuspLNLF,
// 			cantbrazos: state.CantBrazos,
// 			largobrazo: state.LargoBrazo,
// 			voladosd: state.VolDS,
// 			fajabrazo: state.FajaBrazoEleg,
// 			cantHeb: state.CantHeb,
// 			cantCarro: state.CantCarro,
// 			tipocarro: state.tipocarro,
// 			tipoheb: state.tipoheb,
// 			colocacion: state.colocacion,
// 			tipoplaca: state.tipoplaca,
// 			tipopresup: presuptipo,
// 			cotdivisa: cotidivisa,
// 			signomonet: state.signomoneda,
// 		},
// 	];

// 	var StkRubroDesc = "";
// 	var PresupLargo = 0;
// 	var PresupAncho = 0;
// 	var ImpUnitario = 0.0;
// 	var importeanexo = 0.0;
// 	var ImpItem = 0.0;
// 	var PresupCantidadM = state.PresupCantidad;
// 	var detalle = presuptipo;
// 	var veces = state.PresupVeces;
// 	var datoimpunitario = 0.0;
// 	var datoimpitem = 0.0;
// 	var datoscalculos = JSON.stringify(dcalculo);
// 	const datosrenglon1 = await presupcalculador(
// 		state.DatosPresupEleg[0],
// 		datoscalculos,
// 		presuptipo
// 	);

// 	//esto es porque va a ser un cálculo especial, tiene un backend para eso
// 	if (rubrosn === "S") {
// 		var unidmed = "";
// 		if (datosrenglon1[0][0].StkRubroUM) {
// 			unidmed = datosrenglon1[0][0].StkRubroUM + " ";
// 		}
// 		StkRubroDesc =
// 			unidmed +
// 			datosrenglon1[0][0].Detalle +
// 			datosrenglon1[0][0].StkRubroDesc;

// 		if (datosrenglon1[0][0].MDesc === "S") {
// 			StkRubroDesc =
// 				StkRubroDesc + " " + state.DescripPresup + " " + state.DetalleRenglon;
// 		}
// 		datoimpunitario = datosrenglon1[0][0].ImpUnitario;

// 		if (otramoneda) {
// 			ImpUnitario = Number(Math.ceil(datoimpunitario / cotidivisa)).toFixed(
// 				2
// 			);
// 			ImpItem = Number(
// 				Math.ceil(datoimpunitario / cotidivisa) * PresupCantidadM
// 			).toFixed(2);
// 		} else {
// 			ImpUnitario = Number(Math.ceil(datoimpunitario)).toFixed(2);
// 			ImpItem = Number(Math.ceil(datoimpunitario * PresupCantidadM)).toFixed(
// 				2
// 			);
// 		}

// 		PresupLargo = datosrenglon1[0][0].Largo;
// 		PresupAncho = datosrenglon1[0][0].Ancho;

// 		importeanexo = 0;

// 		if (state.renglonanexo.length !== 0) {
// 			if (otramoneda) {
// 				importeanexo = state.renglonanexo.ImpItemAnexo / cotidivisa;
// 			} else {
// 				importeanexo = state.renglonanexo.ImpItemAnexo;
// 			}
// 			ImpUnitario = Number(Math.ceil(ImpUnitario * 1 + importeanexo)).toFixed(
// 				2
// 			);
// 			ImpItem = Number(
// 				Math.ceil(ImpItem * 1 + importeanexo * state.PresupCantidad)
// 			).toFixed(2);
// 			StkRubroDesc = StkRubroDesc + state.renglonanexo.StkRubroDesc;
// 		}
// 		//acá veo si es paño unido o no porque sino tiene ancho o largo en 0, no es confección

// 		if (PresupLargo === 0 || PresupAncho === 0) {
// 			if (otramoneda) ImpItem = (ImpUnitario / cotidivisa) * 1 * veces;
// 			else ImpItem = ImpUnitario * 1 * veces;
// 		}

// 		if (PresupLargo === 0 && PresupAncho === 0) {
// 			if (otramoneda)
// 				ImpItem =
// 					(datosrenglon1[0][0].ImpUnitario / cotidivisa) * PresupCantidadM;
// 			else ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
// 		}
// 	}
// 	//si no es algo que se necesita rubro
// 	else {
// 		StkRubroDesc = detalle;
// 		if (otramoneda) {
// 			ImpUnitario = datosrenglon1[0] / cotidivisa;
// 			ImpItem = (datosrenglon1[0] / cotidivisa) * PresupCantidadM;
// 		} else {
// 			ImpUnitario = datosrenglon1[0];
// 			ImpItem = datosrenglon1[0] * PresupCantidadM;
// 		}
// 	}
// 	if (presuptipo === "MODIFICA MEDIDAS") {
// 		PresupLargo = "-";
// 		PresupAncho = "-";
// 	}

// 	const ImpUnitarion = ImpUnitario * 1;
// 	const ImpUnitariofa = ImpUnitarion.toLocaleString("es-AR", {
// 		style: "currency",
// 		currency: "ARS",
// 	});
// 	let ImpUnitariof = ImpUnitariofa.replace(/ARS/g, state.signomoneda)
// 		.replace(/€|USD|\$/g, "")
// 		.trim();
// 	ImpUnitariof = state.signomoneda + " " + ImpUnitariof;

// 	const ImpItemn = ImpItem * 1;
// 	const ImpItemfa = ImpItemn.toLocaleString("es-AR", {
// 		style: "currency",
// 		currency: "ARS",
// 	});
// 	let ImpItemf = ImpItemfa.replace(/ARS/g, state.signomoneda)
// 		.replace(/€|USD|\$/g, "")
// 		.trim();
// 	ImpItemf = state.signomoneda + " " + ImpItemf;

// 	var datospresup = [
// 		{
// 			id: state.indicetp, //agregado porque en tablapresup me exige un indice id
// 			PresupCantidad: state.PresupCantidad,
// 			StkRubroDesc,
// 			PresupLargo,
// 			PresupAncho,
// 			ImpUnitario,
// 			ImpUnitariof,
// 			ImpItem,
// 			ImpItemf,
// 			dcalculo,
// 		},
// 	];

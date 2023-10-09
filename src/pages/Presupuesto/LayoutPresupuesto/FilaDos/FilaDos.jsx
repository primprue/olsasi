import React, { useEffect } from "react";
import {
	TextField,
	Grid,
	FormControlLabel,
	Checkbox,
	IconButton,
} from "@mui/material";

import styles from "../styles.module.css";
import { stkrubroleeconf } from "../../../Tablas/Rubros/StkRubroLeeConf";
import { presupcalculador } from "../../PresupCalculador";
import { stkmonedasleercod } from "../../../Tablas/Monedas/StkMonedasLeerCod";
import ArchiveIcon from "@mui/icons-material/Archive";
// import { presupgrabar } from "../../PresupGrabar";
import { red } from "@mui/material/colors";

// Context
import { useContext } from "react";

import { PresupPantContext } from "../../PresupPant";
import TablaPresup from "../TablaPresup/TablaPresup";
import FilaConf from "../FilaConf/FilaConf";
// import FilaEnrollables from "../FilaEnrollables/FilaEnrollables";
// import FilaTanques from "../FilaTanques/FilaTanques"
// import FilaPiletasEnr from "../FilaPiletas/FilaPiletasEnr"
// import FilaToldosExt from "../FilaToldosExt/FilaToldosExt";
// import FilaDetDesc from "./FilaDetDesc"
// import FilaCargaDesc from "./FilaCargaDesc";
// import FilaAbolinada from "../FilaAbolinada/FilaAbolinada"
// import FilaComedero from "../FilaComedero/FilaComedero"
// import FilaCambPanio from "../FilaCambPanio/FilaCambPanio"
// import FilaModMed from "../FilaModMed/FilaModMed";
// import FilaAbanico from "../FilaAbanico/FilaAbanico";
// import FilaLateral from "../FilaLateral/FilaLateral";

export default function FilaDos() {
	// Esto es para poder consumir los datos del CONTEXTAPI
	const { state, setState } = useContext(PresupPantContext);
	const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);

	// según el presupuesto elegido, lee la tabla y se decide que pide
	const [selectedValue, setSelectedValue] = React.useState("REC");
	const [endolares, setEndolares] = React.useState(false);
	const [cotidivisa, setCotidivisa] = React.useState(0.0);
	let indice = 0;

	if (state.DatosPresupEleg.length !== 0) {
		var largo = state.DatosPresupEleg[0].PresupConfTipoLargo;
		var ancho = state.DatosPresupEleg[0].PresupConfTipoAncho;
		var presuptipo = state.DatosPresupEleg[0].PresupConfTipoDesc;

		//esto es porque va a ser un cálculo especial, tiene un backend para eso
		var rubrosn = "";
		state.labellargo = "Largo";
		state.labelancho = "Ancho";
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
			state.labellargo = "Alto";
		}
		if (presuptipo === "CARGA DESCRIPCION") {
			state.labellargo = "Importe";
		}
		if (presuptipo === "CAMBIO PISO PILETA") {
			state.labellargo = "Largo/Diametro";
		}
		if (presuptipo === "CAMBIO PAÑO") {
			state.labelancho = "Ancho Lona";
			state.labellargo = "Paños en metros";
		}
		if (presuptipo === "MODIFICA MEDIDAS") {
			state.labelancho = "Ancho Actual";
			state.labellargo = "Largo Actual";
		}
	}

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
		if (event.target.name === "endolares") {
			const chequeo = event.target.checked;
			setEndolares(event.target.checked);
			setState({ ...state, dolaressn: chequeo });
		}
	};

	async function stkrubroleerconf(cuallee) {
		const result = await stkrubroleeconf(cuallee);
		setState({ ...state, stkrubro: result });
	}

	useEffect(() => {
		stkmonedaleecod();
		if (presuptipo === "UNIDAD") {
			stkrubroleerconf("T");
		} else {
			stkrubroleerconf("S");
		}
	}, [presuptipo]); // eslint-disable-line react-hooks/exhaustive-deps

	async function stkmonedaleecod() {
		const cotdoldivisa = await stkmonedasleercod();
		const cotdoldivisa1 = cotdoldivisa[0].DolDiv;
		setCotidivisa(cotdoldivisa1);
	}

	async function agregar() {
		var indicetp1 = state.indicetp + 1;
		setState({ ...state, indicetp: indicetp1 });
		var dcalculo = [
			{
				// id: indice + 1,
				StkRubroAbr: state.StkRubroAbr,
				minmay: state.PresupMnMy,
				ivasn: state.PresupIVA,
				cantidad: state.PresupCantidad,
				veces: state.PresupVeces,
				largo: state.PresupLargo,
				ancho: state.PresupAncho,
				largon: state.PresupLargoN,
				anchon: state.PresupAnchoN,
				tipoconf: state.PresupCsSs,
				tipoojale: state.PresupOB,
				drenajesn: state.PresupDrenaje,
				detallep: state.DetallePresup,
				detaller: state.DetalleRenglon,
				tamfaja: state.TamFaja,
				tamcristal: state.TamCristal,
				altovolado: state.AltoVolado,
				presupojalesc: state.PresupOjalesC,
				sobrantemarco: state.SobranteMarco,
				tipomedeleg: state.TipoMedidaEleg,
				termbordeeleg: state.TermBordeEleg,
				anchopared: state.AnchoPared,
				medida: state.Medida,
				//para el alto del tanque
				alto: state.Alto,
				stkrubroabrtbr: state.StkRubroAbrTBR,
				tipomecanismo: state.TipoMecanismo,
				anchocomedero: state.AnchoComederoEleg,
				lonanuestraafuera: state.PreuspLNLF,
				cantbrazos: state.CantBrazos,
				largobrazo: state.LargoBrazo,
				voladosd: state.VolDS,
				fajabrazo: state.FajaBrazoEleg,
				cantHeb: state.CantHeb,
				cantCarro: state.CantCarro,
				tipocarro: state.tipocarro,
				tipoheb: state.tipoheb,
				colocacion: state.colocacion,
				tipoplaca: state.tipoplaca,
				tipopresup: presuptipo,
				dolaressn: state.dolaressn,
				cotdivisa: cotidivisa,
			},
		];

		// if ( state.dolaressn) {
		//   stkmonedaleecod()
		// }
		var StkRubroDesc = "";
		var PresupLargo = 0;
		var PresupAncho = 0;
		var ImpUnitario = 0;
		var importeanexo = 0;
		var ImpItem = 0;
		var PresupCantidadM = state.PresupCantidad;
		var detalle = presuptipo;
		var veces = state.PresupVeces;

		var datoscalculos = JSON.stringify(dcalculo);
		const datosrenglon1 = await presupcalculador(
			state.DatosPresupEleg[0],
			datoscalculos,
			presuptipo
		);
		//esto es porque va a ser un cálculo especial, tiene un backend para eso
		if (rubrosn === "S") {
			var unidmed = "";
			if (datosrenglon1[0][0].StkRubroUM) {
				unidmed = datosrenglon1[0][0].StkRubroUM + " ";
			}
			StkRubroDesc =
				unidmed +
				datosrenglon1[0][0].Detalle +
				datosrenglon1[0][0].StkRubroDesc;

			if (datosrenglon1[0][0].MDesc === "S") {
				StkRubroDesc =
					StkRubroDesc + " " + state.DescripPresup + " " + state.DetalleRenglon;
			}

			if (endolares) {
				ImpUnitario = datosrenglon1[0][0].ImpUnitario / cotidivisa;
				ImpItem =
					(datosrenglon1[0][0].ImpUnitario / cotidivisa) * PresupCantidadM;
			} else {
				ImpUnitario = datosrenglon1[0][0].ImpUnitario;
				ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
			}

			PresupLargo = datosrenglon1[0][0].Largo;
			PresupAncho = datosrenglon1[0][0].Ancho;

			importeanexo = 0;

			if (state.renglonanexo.length !== 0) {
				if (endolares) {
					importeanexo = state.renglonanexo.ImpItemAnexo / cotidivisa;
				} else {
					importeanexo = state.renglonanexo.ImpItemAnexo;
				}
				ImpUnitario = ImpUnitario * 1 + importeanexo;
				ImpItem = ImpItem + importeanexo * state.PresupCantidad;
				StkRubroDesc = StkRubroDesc + state.renglonanexo.StkRubroDesc;
			}
			//acá veo si es paño unido o no porque sino tiene ancho o largo en 0, no es confección

			if (PresupLargo === 0 || PresupAncho === 0) {
				ImpItem = ImpUnitario * 1 * veces;
			}

			if (PresupLargo === 0 && PresupAncho === 0) {
				if (endolares)
					ImpItem =
						(datosrenglon1[0][0].ImpUnitario / cotidivisa) * PresupCantidadM;
				else ImpItem = datosrenglon1[0][0].ImpUnitario * PresupCantidadM;
			}
		} else {
			StkRubroDesc = detalle;
			ImpUnitario = datosrenglon1[0];
			ImpItem = datosrenglon1[0] * PresupCantidadM;
		}
		if (presuptipo === "MODIFICA MEDIDAS") {
			PresupLargo = "-";
			PresupAncho = "-";
		}
		var datospresup = [
			{
				id: state.indicetp, //agregado porque en tablapresup me exige un indice id
				PresupCantidad: state.PresupCantidad,
				StkRubroDesc,
				PresupLargo,
				PresupAncho,
				ImpUnitario,
				ImpItem,
				dcalculo,
			},
		];

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
					<option></option>
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

	console.log("state  ", state);
	return (
		<>
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
					label={state.labellargo}
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
					label={state.labelancho}
					fullWidth
					margin="dense"
					value={state.PresupAncho}
					onChange={handleChange}
					className={classes.textField}
				/>
			</Grid>
			{presuptipo === "MODIFICA MEDIDAS" && (
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupLargoN"
						type="number"
						label={state.labellargoN}
						fullWidth
						margin="dense"
						value={state.PresupLargoN}
						onChange={handleChange}
						className={classes.textField}
					/>
				</Grid>
			)}
			{presuptipo === "MODIFICA MEDIDAS" && (
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="PresupAnchoN"
						type="number"
						label={state.labelanchoN}
						fullWidth
						margin="dense"
						value={state.PresupAnchoN}
						onChange={handleChange}
						className={classes.textField}
					/>
				</Grid>
			)}

			<Grid container item xs={12}>
				{presuptipo === "CONFECCIONADA" && <FilaConf></FilaConf>}
				{/* {presuptipo === "MODIFICA MEDIDAS" && <FilaModMed></FilaModMed>}
        {presuptipo === "LONAS ENROLLABLES" && <FilaEnrollables></FilaEnrollables>}
        {presuptipo === "BOLSON PARA TANQUE" && <FilaTanques></FilaTanques>}
        {presuptipo === "PILETA ENROLLABLE" && <FilaPiletasEnr></FilaPiletasEnr>}
        {presuptipo === "PILETA CAÑOS ALUMINIO" && <FilaPiletasEnr></FilaPiletasEnr>}
        {presuptipo === "TOLDO BARRACUADRA" && <FilaToldosExt></FilaToldosExt>}
        {presuptipo === "ABOLINADA" && <FilaAbolinada></FilaAbolinada>}
        {presuptipo === "COMEDERO" && <FilaComedero></FilaComedero>}
        {presuptipo === "CAMBIO PAÑO" && <FilaCambPanio></FilaCambPanio>}
        {presuptipo === "TOLDO ABANICO" && <FilaAbanico></FilaAbanico>}
        {presuptipo === "LATERAL CORREDIZO" && <FilaLateral></FilaLateral>}
        {(presuptipo === "CARGA DESCRIPCION") ? <FilaCargaDesc></FilaCargaDesc> : <></>}
        {(presuptipo !== "UNIDAD" && rubrosn === "S") ? <FilaDetDesc presuptipo={presuptipo}></FilaDetDesc> : <></>}
      */}
				<Grid item xs={2}>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.dolaressn}
								onChange={handleChange}
								value={state.cotdiv}
								name="endolares"
							/>
						}
						label="En dólares?"
					/>
				</Grid>
				<IconButton onClick={() => agregar()} color="primary">
					<ArchiveIcon
						style={{ color: red[500] }}
						fontSize="large"
						titleAccess="Agregar"
					/>
				</IconButton>
			</Grid>
			<TablaPresup data={datosrenglon} />
		</>
	);
}

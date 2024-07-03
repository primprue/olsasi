import React, { useEffect, useRef } from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
	Checkbox,
} from "@mui/material";
import styles from "../styles.module.css";
import { stkrubroleelat } from "../../../Tablas/StkRubros/StkRubroLeeLAT";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";
import estilo from "../../../../Styles/TextFieldSelect.module.css";
import estiloI from "../../../../Styles/RadioGroup.module.css";
import estiloII from "../../../../Styles/TextField.module.css";
import estiloIII from "../../../../Styles/Check.module.css";

export default function FilaLateral() {
	const { state, setState } = useContext(PresupPant);
	const [chcarros, setChCarros] = React.useState(false);
	const [chcolocacion, setColocacion] = React.useState(false);
	const [hebillas, setHebillas] = React.useState([]);
	const [carros, setCarros] = React.useState([]);
	const [placaajus, setPlacaajus] = React.useState([]);

	const handleChecked = (event) => {
		if (event.target.name === "checkedCarros") {
			setChCarros(event.target.checked);
		} else {
			setColocacion(event.target.checked);
			setState({ ...state, colocacion: event.target.checked });
		}
	};

	async function stkrubroleerlat() {
		const result = await stkrubroleelat();

		setHebillas(result[0]);
		setCarros(result[1]);
		setPlacaajus(result[2]);
		// setState({ ...state, stkrubrolat: result });
	}
	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const classes = styles;

	useEffect(() => {
		if (state.stkrubrolat.length === 0) {
			stkrubroleerlat();
		}
	}, [state.stkrubrolat]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Grid container spacing={2} xs={12}>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 1 }}
						size="small"
						variant="outlined"
						id="CantHeb"
						type="number"
						label="Cant.Hebillas :  "
						margin="dense"
						value={state.CantHeb}
						onChange={handleChange}
						className={estiloII.textfcantpadchico}
					/>
				</Grid>
				<Grid item xs={3}>
					{state.CantHeb !== 0 && (
						<TextField
							id="tipoheb"
							select
							label="Hebillas"
							variant="outlined"
							value={state.tipoheb}
							className={estilo.selectField}
							onChange={handleChange}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							helperText="Seleccionar tipo hebillas incluye placa"
						>
							<>
								<option></option>
								{hebillas.map((option) => (
									<option
										key={option.StkRubroAbrLAT}
										value={option.StkRubroAbrLAT}
									>
										{option.StkRubroDescLAT}
									</option>
								))}
							</>
						</TextField>
					)}
				</Grid>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 1 }}
						size="small"
						variant="outlined"
						id="CantCarro"
						type="number"
						label="Cant.Carros :  "
						margin="dense"
						value={state.CantCarro}
						onChange={handleChange}
						className={estiloII.textfcantpadchico}
					/>
				</Grid>
				<Grid item xs={3}>
					{state.CantCarro !== 0 && (
						<TextField
							id="tipocarro"
							select
							variant="outlined"
							label="Carro"
							value={state.tipocarro}
							onChange={handleChange}
							className={estilo.selectField}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							helperText="Seleccionar tipo carro"
						>
							<>
								<option></option>
								{carros.map((option) => (
									<option
										key={option.StkRubroAbrLAT}
										value={option.StkRubroAbrLAT}
									>
										{option.StkRubroDescLAT}
									</option>
								))}
							</>
						</TextField>
					)}
				</Grid>
				<Grid item xs={1}>
					<TextField
						inputProps={{ maxLength: 1 }}
						size="small"
						variant="outlined"
						id="CantPlaca"
						type="number"
						label="Cant.Placas :  "
						margin="dense"
						value={state.CantPlaca}
						onChange={handleChange}
						className={estiloII.textfcantpadchico}
					/>
				</Grid>
				<Grid item xs={3}>
					{state.CantCarro !== 0 && (
						<TextField
							id="tipoplaca"
							select
							variant="outlined"
							label="Placa Ajuste"
							value={state.tipoplaca}
							onChange={handleChange}
							className={estilo.selectField}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							helperText="Seleccionar placa ajuste"
						>
							<>
								<option></option>
								{placaajus.map((option) => (
									<option
										key={option.StkRubroAbrLAT}
										value={option.StkRubroAbrLAT}
									>
										{option.StkRubroDescLAT}
									</option>
								))}
							</>
						</TextField>
					)}
				</Grid>
				<Grid item spacing={2} xs={4}>
					<FormControlLabel
						className={estiloIII.formControlLabelCheck}
						control={
							<Checkbox
								className={estiloIII.check}
								checked={chcolocacion}
								onChange={handleChecked}
								name="checkedColocacion"
							/>
						}
						label="Colocación?"
					/>
				</Grid>
			</Grid>
		</>
	);
}

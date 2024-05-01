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
			<Grid container>
				<Grid item>
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
						className={classes.textField}
					/>
				</Grid>
				<Grid item>
					{state.CantHeb !== 0 && (
						<TextField
							id="tipoheb"
							select
							label="Hebillas"
							variant="outlined"
							value={state.tipoheb}
							onChange={handleChange}
							SelectProps={{
								native: true,
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
				<Grid item xs={2}>
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
						className={classes.textField}
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
							SelectProps={{
								native: true,
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
				<Grid item xs={2}>
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
						className={classes.textField}
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
							SelectProps={{
								native: true,
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
				<Grid item xs={2}>
					<FormControlLabel
						control={
							<Checkbox
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

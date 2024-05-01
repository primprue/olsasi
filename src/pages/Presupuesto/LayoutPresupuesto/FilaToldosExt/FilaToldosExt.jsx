import React, { useEffect } from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";
import styles from "../styles.module.css";
import { stkrubroleetbr } from "../../../Tablas/StkRubros/StkRubroLeeTBR";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaToldosExt(props) {
	const { state, setState } = useContext(PresupPant);
	const [mecanismo, setMecanismo] = React.useState("Manual");

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const tipomecanismo = (event) => {
		setMecanismo(event.target.value);
		setState({ ...state, TipoMecanismo: event.target.value });
	};

	async function stkrubroleertbr() {
		const result = await stkrubroleetbr();

		setState({ ...state, stkrubrotbr: result });
	}

	useEffect(() => {
		if (state.stkrubrotbr.length === 0) {
			stkrubroleertbr();
		}
	}, [state.stkrubrotbr]); // eslint-disable-line react-hooks/exhaustive-deps

	//stkrubroleecodgrupored leer los rubros de los accesorios de toldo  grupo 6
	const tamtoldo = [
		{
			id: "StkRubroAbrTBR",
			label: "Tamaño Toldo",
			value: state.StkRubroAbrTBR,
			mapeo: (
				<>
					<option></option>
					{state.stkrubrotbr.map((option) => (
						<option key={option.StkRubroAbrTBR} value={option.StkRubroAbrTBR}>
							{option.StkRubroDescTBR}
						</option>
					))}
				</>
			),
		},
	];

	const classes = styles;

	return (
		<>
			{/* <Grid container item xs={12}> */}
			{/* <Grid container item direction="row" xs={12}> */}

			{/* <Grid container item xs={12}> */}
			<Grid item xs={3}>
				<RadioGroup
					row
					size="small"
					name="Mecanismo"
					label="Movido por :"
					value={mecanismo}
					onChange={tipomecanismo}
					margin="dense"
				>
					<FormControlLabel
						size="small"
						value="Manual"
						control={<Radio />}
						label="Manual"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="MotorCT"
						control={<Radio />}
						label="Motor c/Tecla"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="MotorCC"
						control={<Radio />}
						label="Motor c/control"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
			</Grid>
			{tamtoldo.map((data) => (
				<TextField
					id={data.id}
					key={data.id}
					size="small"
					select
					label={data.label}
					margin="dense"
					value={data.value}
					onChange={handleChange}
					SelectProps={{ native: true }}
					variant="outlined"
					helperText="Medida Toldo"
				>
					{data.mapeo}
				</TextField>
			))}

			<Grid item xs={1}>
				<TextField
					inputProps={{ maxLength: 3 }}
					size="small"
					variant="outlined"
					id="AltoVolado"
					type="number"
					label="Volado en cm :  "
					fullWidth
					margin="dense"
					value={state.AltoVolado}
					onChange={handleChange}
					className={classes.textField}
				/>
			</Grid>
		</>
	);
}

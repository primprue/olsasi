import React from "react";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

import estilo from "../../../../Styles/TextFieldSelect.module.css";
import estiloII from "../../../../Styles/TextField.module.css";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaTanques() {
	//  const [selectedValue, setSelectedValue] = React.useState("PVC05");
	const { state, setState } = useContext(PresupPant);
	// const [setFaja] = React.useState('2P');

	// const [AnchoPared, setAnchoPared] = React.useState(0.20)
	// const [DetallePresup, setDetallePresup] = React.useState('')

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const tipomedidatanque = [
		{
			id: "TipoMedidaEleg",
			label: "Medida de :",
			value: state.value,
			mapeo: (
				<>
					<option></option>
					{state.TipoMedida.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</>
			),
		},
	];

	const terminacionborde = [
		{
			id: "TermBordeEleg",
			label: "Terminación :",
			value: state.value,
			mapeo: (
				<>
					<option></option>
					{state.TermBorde.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</>
			),
		},
	];

	return (
		<>
			<Grid container spacing={2}>
				<Grid >
					{tipomedidatanque.map((data) => (
						<TextField
							id={data.id}
							key={data.id}
							size="small"
							select
							label={data.label}
							margin="dense"
							value={data.value}
							onChange={handleChange}
							className={estilo.selectField}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							variant="outlined"
							helperText="Qué medida tenemos?"
						>
							{data.mapeo}
						</TextField>
					))}
				</Grid>
				<Grid span={{ xs: 2 }}>
					{terminacionborde.map((data) => (
						<TextField
							id={data.id}
							key={data.id}
							size="small"
							select
							label={data.label}
							margin="dense"
							value={data.value}
							onChange={handleChange}
							className={estilo.selectField}
							InputLabelProps={{
								className: estilo.selectLabel,
							}}
							SelectProps={{
								native: true,
								className: estilo.menuItem,
							}}
							variant="outlined"
							helperText="Cómo termina el Bolsón"
						>
							{data.mapeo}
						</TextField>
					))}
				</Grid>
				<Grid span={{ xs: 2 }}>
					<TextField
						input={{ maxLength: 3 }}
						size="small"
						variant="outlined"
						id="AnchoPared"
						margin="dense"
						label="Pared en cm : "
						// fullWidth
						value={state.AnchoPared}
						onChange={handleChange}
						className={estiloII.textfcantidad}
						helperText="Si tiene pared"
					/>
				</Grid>

				<Grid span={{ xs: 2 }}>
					<TextField
						input={{ maxLength: 5 }}
						size="small"
						variant="outlined"
						id="Medida"
						margin="dense"
						label="Medida/Cant."
						value={state.Medida}
						onChange={handleChange}
						className={estiloII.textfcantidad}
						helperText="Medida o Cantidad de chapas"
					/>
				</Grid>
				<Grid span={{ xs: 2 }}>
					<TextField
						input={{ maxLength: 4 }}
						size="small"
						variant="outlined"
						id="Alto"
						margin="dense"
						label="Alto"
						value={state.Alto}
						onChange={handleChange}
						className={estiloII.textfcantidad}
						helperText="Altura del tanque"
					/>
				</Grid>
			</Grid>
		</>
	);
}

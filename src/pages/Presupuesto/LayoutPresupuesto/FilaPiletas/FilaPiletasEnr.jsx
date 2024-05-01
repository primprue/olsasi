import React from "react";
import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormHelperText,
} from "@mui/material";
// Context
import { useContext } from "react";
import PresupPant from "../../../../context/PresupPant";

export default function FilaPiletasEnr(props) {
	const [selectedValue, setSelectedValue] = React.useState("cd");
	const { state, setState } = useContext(PresupPant);
	const [ojalbronce, setOjalBronce] = React.useState("hz");
	// const [DescripPresup, setDescripPresup] = React.useState('')
	// var [DetallePresup, setDetallePresup] = React.useState('')

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setState({ ...state, PresupDrenaje: event.target.value });
	};

	const handleChange2 = (event) => {
		setOjalBronce(event.target.value);
		setState({ ...state, PresupOB: event.target.value });
	};

	return (
		<>
			<Grid item xs={2}>
				<RadioGroup
					row
					size="small"
					name="Drenajesn"
					value={selectedValue}
					onChange={handleChange}
					margin="dense"
				>
					<FormControlLabel
						size="small"
						value="cd"
						control={<Radio />}
						label="C/D"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="sd"
						control={<Radio />}
						label="S/D"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
				<FormHelperText margin="dense">Drenaje</FormHelperText>
			</Grid>
			<Grid item xs={2}>
				<RadioGroup
					row
					size="small"
					name="tipoOjal"
					value={ojalbronce}
					onChange={handleChange2}
					margin="dense"
				>
					<FormControlLabel
						size="small"
						value="hz"
						control={<Radio />}
						label="HZ"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
					<FormControlLabel
						size="small"
						value="br"
						control={<Radio />}
						label="BR"
						labelPlacement="top"
						disabled={props.disable}
						margin="dense"
					/>
				</RadioGroup>
				<FormHelperText margin="dense">Ojales</FormHelperText>
			</Grid>
		</>
	);
}

import React from "react";

import {
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	TextField,
} from "@mui/material";
import styles from "../styles.module.css";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function FilaAbolinada(props) {
	// const [selectedValue, setSelectedValue] = React.useState(20);
	const { state, setState } = useContext(PresupPantContext);
	const [ojalbronce, setOjalBronce] = React.useState("hz");

	const handleChange = (event) => {
		const id = event.target.id;
		setState({ ...state, [id]: event.target.value });
	};

	const handleChange2 = (event) => {
		setOjalBronce(event.target.value);
		setState({ ...state, PresupOB: event.target.value });
	};

	const classes = styles;

	return (
		<>
			<Grid item xs={2}>
				<TextField
					inputProps={{ maxLength: 3 }}
					size="small"
					variant="outlined"
					id="PresupOjalesC"
					type="number"
					label="Ojales cada, en cm :  "
					fullWidth
					margin="dense"
					value={state.PresupOjalesC}
					onChange={handleChange}
					className={classes.textField}
				/>
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
			</Grid>

			{/* <Grid item xs={3}>
        <TextField
          inputProps={{ maxLength: 12 }}
          size="small"
          variant="outlined"
          id="DescripPresup"
          margin="dense"
          label="Descripción"
          // fullWidth
          value={state.DescripPresup}
          helperText='No imprime medidas'
          onChange={handleChange3}
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          inputProps={{ maxLength: 25 }}
          size="small"
          variant="outlined"
          id="DetallePresup"
          margin="dense"
          label="Detalle Presupuesto "
          // fullWidth
          value={state.DetallePresup}
          helperText='Saca la descripción por defecto'
          onChange={handleChange4}
          className={classes.textField}
        />
      </Grid> */}
		</>
	);
}

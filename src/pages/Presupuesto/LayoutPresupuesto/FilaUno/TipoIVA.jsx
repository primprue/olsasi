import React, { useMemo } from "react";
import {

	FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
// Context
import { use } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";


export default function TipoIVA() {

	const { state, setState } = use(PresupPant);

	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOption = useMemo(() => state.PresupIVA || "CIVA", [state.PresupIVA]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, PresupIVA: newOption });
	};

	return (
		<div>
			<Grid >
				{state.PresupMnMy === "mn" && (
					<CustomSwitch value={selectedOption} onChange={handleOptionChange} opcion1={'CIVA'} opcion2={'SIVA'}
						titulo1={'c/IVA'} titulo2={'s/IVA'}
						tithelpertext={'Importe : '} />)}

			</Grid>
		</div>
	);
};

// export default TipoIVA;
// export default function TipoIVA() {
// 	const [selectedValue, setSelectedValue] = React.useState("CIVA");
// 	const { state, setState } = useContext(PresupPant);

// 	const handleChange = (event) => {
// 		setSelectedValue(event.target.value);
// 		setState({ ...state, PresupIVA: event.target.value });
// 	};

// 	return (
// 		// <Grid  span={{ xs: 1 }}>
// 		<Grid >
// 			{state.PresupMnMy === "mn" && (
// 				<RadioGroup
// 					className={estilo.radioGroup}
// 					row
// 					size="small"
// 					name="tipoIVA"
// 					value={selectedValue}
// 					onChange={handleChange}
// 					margin="dense"
// 				>
// 					<FormControlLabel
// 						value="CIVA"
// 						control={
// 							<Radio
// 								classes={{ root: estilo.radio, checked: estilo.radioChecked }}
// 							/>
// 						}
// 						className={estilo.formControlLabel}
// 						label="c/IVA"
// 						labelPlacement="top"
// 						margin="dense"
// 					/>
// 					<FormControlLabel
// 						value="SIVA"
// 						control={
// 							<Radio
// 								classes={{ root: estilo.radio, checked: estilo.radioChecked }}
// 							/>
// 						}
// 						className={estilo.formControlLabel}
// 						label="s/IVA"
// 						labelPlacement="top"
// 						margin="dense"
// 					/>
// 				</RadioGroup>
// 			)}
// 			{state.PresupMnMy === "mn" && (
// 				<FormHelperText>Cálculo con IVA o sin IVA</FormHelperText>)}
// 		</Grid>
// 		// </Grid>
// 	);
// }

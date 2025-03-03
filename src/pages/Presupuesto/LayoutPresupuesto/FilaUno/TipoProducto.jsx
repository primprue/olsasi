
import React, { use, useMemo } from "react";
import { FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid2";
import estilo from "../../../../Styles/RadioGroup.module.css";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";

export default function TipoProducto() {
	const { state, setState } = use(PresupPant);

	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOption = useMemo(() => state.PresupProducto || "PAE", [state.PresupProducto]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, PresupProducto: newOption });
	};

	return (
		<Grid className={estilo.grilla}>
			<div>
				<CustomSwitch value={selectedOption} onChange={handleOptionChange} opcion1={'PE'} opcion2={'PAE'}
					titulo1={'Elab.'} titulo2={'a-El.'}
					tithelpertext={'Prod. : '} />

			</div>
		</Grid>
	);
}

// import React from "react";
// import {
// 	FormHelperText,
// } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import estilo from "../../../../Styles/RadioGroup.module.css";
// // Context
// import { useContext } from "react";
// import PresupPant from "../../../../context/PresupPant";
// import CustomSwitch from "../../../../components/comppropios/CustomSwitch";


// export default function TipoProducto() {
// 	const { state, setState } = useContext(PresupPant);
// 	const [selectedOption, setSelectedOption] = React.useState("PAE"); // Estado en el padre
// 	// Función para actualizar la opción seleccionada
// 	const handleOptionChange = (newOption) => {
// 		setState({ ...state, PresupProducto: newOption });
// 		setSelectedOption(newOption);
// 	};

// 	return (
// 		<Grid className={estilo.grilla}>
// 			<div>
// 				<CustomSwitch value={selectedOption} onChange={handleOptionChange} opcion1={'PE'} opcion2={'PAE'}
// 					titulo1={'Elab.'} titulo2={'a-El.'} />
// 				<FormHelperText sx={{ color: "blue", fontWeight: "bold", fontSize: "15px" }}>Prod. : {selectedOption}</FormHelperText>
// 			</div>
// 		</Grid>
// 	);
// };
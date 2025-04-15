
import React, { use, useMemo } from "react";
import Grid from "@mui/material/Grid";
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

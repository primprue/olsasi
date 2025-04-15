import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
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


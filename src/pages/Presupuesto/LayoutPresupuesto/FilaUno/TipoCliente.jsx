

import { use, useMemo } from "react";
import PresupPant from "../../../../context/PresupPant";
import CustomSwitch from "../../../../components/comppropios/CustomSwitch";

export default function TipoCliente() {

	const { state, setState } = use(PresupPant);

	// Memorizar la opción seleccionada basada en state.PresupProducto
	const selectedOption = useMemo(() => state.PresupMnMy || "mn", [state.PresupMnMy]);

	// Función para actualizar la opción seleccionada
	const handleOptionChange = (newOption) => {
		setState({ ...state, PresupMnMy: newOption });
	};

	return (
		<div>
			<CustomSwitch
				value={selectedOption}
				onChange={handleOptionChange}
				opcion1={'mn'}
				opcion2={'my'}
				titulo1={'Min.'}
				titulo2={'May.'}
				tithelpertext={'Cliente : '} />
		</div>
	);
};


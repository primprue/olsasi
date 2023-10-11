import React from "react";
import SelecCampos from "./SelecCampos.jsx";
function Index(props) {
	const { columns, open, setOpen, datos, gridStyle } = props;
	return (
		<>
			{SelecCampos({ open, columns, setOpen, datos, gridStyle })}

			{/* una vez seleccionados los campos si pongo imprimir llamo al componente imprimir pantalla */}
			{/* <ImprimirPantalla /> */}
		</>
	);
}

export default Index;

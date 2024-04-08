import React from "react";
import { Dialog } from "@mui/material";
import SelecCampos from "./SelecCampos.jsx";
function Index(props) {
	const { columns, open, setOpen, datos, gridStyle } = props;
	return (
		<>
			<Dialog fullWidth={true} maxWidth="md" open={props.open}>
				{SelecCampos({ open, columns, setOpen, datos, gridStyle })}
			</Dialog>
			{/* una vez seleccionados los campos si pongo imprimir llamo al componente imprimir pantalla */}
			{/* <ImprimirPantalla /> */}
		</>
	);
}

export default Index;

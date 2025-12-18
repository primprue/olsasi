// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import BCierraDialogo from "../../../Styles/Boton.module.css";
import CloseIcon from "@mui/icons-material/Close";

export const PresupPreview = (props) => {
	var datos = props.rowsel;
	var nombrepresupue = "";
	var nombrepresupueb = "";
	if (datos) {
		var Clienteb = datos.NombreCliente.trimRight();
		const Cliente = datos.NombreCliente.trim();
		Clienteb = Cliente.replace(/ /g, "\\ ");
		var fecha = datos.PresupEncabFecha
		const filename = `Presupuesto nro ${datos.id} ${Cliente} ${fecha}.pdf`;
		nombrepresupue = `/${encodeURIComponent(filename)}`;
		nombrepresupueb = `/Presupuesto\\ nro\\ ${datos.id}\\ ${Clienteb}\\ ${fecha}.pdf`;
	}
	else {
		nombrepresupue = `basics.pdf`;
	}
	async function cierradialogo() {
		// if (nombrepresupue !== "/basics.pdf") {
		// 	await PresupBorradespPreview(nombrepresupue);
		// }
		// props.setOpen({ preview: false });
		props.setOpen(false);
	}



	return (
		<div>
			<Dialog fullScreen open={props.open} onClose={cierradialogo}>
				<DialogTitle>
					<button
						onClick={cierradialogo}
						className={BCierraDialogo.botoncierradialogo}
					>
						<div className={BCierraDialogo.iconocierradialogo}>
							<CloseIcon />
						</div>
						Cerrar
					</button>
				</DialogTitle>

				<iframe
					src={nombrepresupue}
					title="Visualizador de PDF"
					width="100%"
					height="500px"
				></iframe>
			</Dialog>
		</div>
	);
};

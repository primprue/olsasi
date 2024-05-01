// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import BCierraDialogo from "../../../../Styles/Boton.module.css";
import CloseIcon from "@mui/icons-material/Close";
import IpServidor from "../../../VariablesDeEntorno.js";
export const PresupPrevista = (props) => {
	const { open, Presup } = props;

	var nombrepresup = "";
	if (Presup) {
		var Cliente = Presup.NombreCliente.trimRight();
		nombrepresup =
			"Presupuesto nro " +
			Presup.id +
			" " +
			Cliente +
			" " +
			Presup.PresupEncabFecha +
			".pdf";
	}
	const url = IpServidor;
	function cierradialogo() {
		props.handleClosePP;
	}

	return (
		<div>
			<Dialog fullScreen open={props.open}>
				<DialogTitle>
					<button
						variant="contained"
						onClick={cierradialogo}
						className={BCierraDialogo.botoncierradialogo}
					>
						<div className={BCierraDialogo.iconocierradialogo}>
							<CloseIcon />
						</div>
						Cerrar
					</button>
				</DialogTitle>
			</Dialog>
		</div>
	);
};

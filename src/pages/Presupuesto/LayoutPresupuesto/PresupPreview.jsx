// import carpetaimppresup from '../../PathEspeciales'
// Lee Rubro por codigo de gupo
import React from "react";
import { Dialog, DialogTitle } from "@mui/material";
import BCierraDialogo from "../../../Styles/Boton.module.css";
import CloseIcon from "@mui/icons-material/Close";

export const PresupPreview = (props) => {
	function cierradialogo() {
		props.setOpen({ ppreview: false });
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
				<iframe
					src="/basics.pdf"
					title="Visualizador de PDF"
					width="100%"
					height="500px"
				></iframe>
			</Dialog>
		</div>
	);
};

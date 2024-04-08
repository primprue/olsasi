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
	// console.log("el armado  ", `${url}${nombrepresup}`);
	// console.log("nombrepresup  ", nombrepresup);
	// const pdfFileName = nombrepresup;
	// const pdfFilePath =
	// 	url.IpServidor2 + "/home/sandra/Documentos/OLSAFrecuentes/PresupSistema/";
	// const encodedFileName = encodeURIComponent(pdfFileName);
	// const nombredelpresupuesto = pdfFilePath + encodedFileName;
	// console.log("pdfFilePath  ", pdfFilePath);
	// console.log("encodedFileName  ", encodedFileName);
	// console.log("nombredelpresupuesto  ", nombredelpresupuesto);
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
				{/* <Link to={nombredelpresupuesto}>Ir a PDF</Link> */}
				{/* <iframe
					type="application/pdf"
					src={nombredelpresupuesto}
					title="Visualizador de PDF"
					width="100%"
					height="500px"
				></iframe> */}
				{/*	<p>
						Tu navegador no soporta visualizar PDFs, puedes descargarlo{" "}
						<a href="ruta_del_archivo.pdf">aquí</a>.
					</p>
				*/}
			</Dialog>
		</div>
	);
};

// 	return (
// 		<div>
// 			<Dialog fullScreen open={props.open}>
// 				{/* <DialogTitle>
// 					<button
// 						variant="contained"
// 						onClick={cierradialogo}
// 						className={BCierraDialogo.botoncierradialogo}
// 						>
// 						<div className={BCierraDialogo.iconocierradialogo}>
// 							<CloseIcon />
// 						</div>
// 						Cerrar
// 					</button>
// 				</DialogTitle> */}
// 				{console.log("nombrepresup  en el div ", url)}
// 				{nombrepresup &&
// 					((<h2>Visualizando:{`${url}`}</h2>)
// 					(
// 						// <div>
// 						// 	<Document file={`${url}${nombrepresup}`}></Document>
// 						// </div>
// 						<iframe
// 							src={`${url}`} // Reemplaza con la ruta de tu archivo PDF
// 							title="Visualizador de PDF"
// 							width="100%"
// 							height="500px"
// 						>
// 							{/* <p>
// 								Tu navegador no soporta visualizar PDFs, puedes descargarlo{" "}
// 								<a href={`${url}`}>aquí</a>.
// 							</p> */}
// 						</iframe>
// 					))}
// 			</Dialog>
// 		</div>
// 	);
// };

{
	/* <Dialog fullScreen open={props.open}>
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
		src=" public/basics.pdf" // Reemplaza con la ruta de tu archivo PDF
		title="Visualizador de PDF"
		width="100%"
		height="500px"
	>
		<p>
			Tu navegador no soporta visualizar PDFs, puedes descargarlo{" "}
			<a href="ruta_del_archivo.pdf">aquí</a>.
		</p>
	</iframe>
</Dialog> */
}

import request from "superagent";

import IpServidor from "../../../VariablesDeEntorno.js";

export const PresupNombre = (datos) => {
	var nombrepresupue = "";
	if (datos) {
		var Cliente = datos.NombreCliente.trimRight();
		Cliente = Cliente.replace(/ /g, "\\ ");
		nombrepresupue = `Presupuesto\\ nro\\ ${datos.id}*.pdf`;

		// `\\ ${Cliente}\\ ${datos.PresupEncabFecha}\\.pdf`;

		// nombrepresupue =
		// 	"Presupuesto nro " +
		// 	datos.id +
		// 	" " +
		// 	Cliente +
		// 	" " +
		// 	datos.PresupEncabFecha +
		// 	" .pdf";
	}
	// Presupuesto\ nro\ 6372\ la\ luna\ verde\ 19-02-2024\ .pdf

	nombrepresupue = encodeURIComponent(nombrepresupue);
	return new Promise((resolve) => {
		setTimeout(() => {
			const url = IpServidor + "/presupnombre/?id=" + nombrepresupue;
			request
				.get(url)
				.set("Content-Type", "application/json")
				.then((res) => {
					resolve(res);
				});
		}, 1000);
	});

	// const remoteFilePath =
	// 	"http://192.168.2.11/home/sandra/Documentos/OLSAFrecuentes/PresupSistema/Presupuesto nro 6922*.pdf";
	// const localFilePath = "/home/sandra/SistOLSA/olsasi/public/basics.pdf"; // Cambia la ruta según tu directorio de la aplicación

	// fetch(remoteFilePath)
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! Status: ${response.status}`);
	// 		}
	// 		return response.arrayBuffer();
	// 	})
	// 	.then((buffer) => {
	// 		// Guardar el archivo localmente
	// 		fs.writeFileSync(localFilePath, Buffer.from(buffer));

	// 		console.log("Descarga completada");
	// 		// Aquí puedes integrar lógica de React para mostrar el PDF en un iframe
	// 	})
	// 	.catch((error) => {
	// 		console.error("Error al descargar el archivo:", error);
	// 	});
};

import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {

	return columnsFill();
}
function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{ field: "idOTDatos", type: "text", headerName: "id datos", width: 200, editable: false },
			{ field: "OTDatosOrdenAparicion", type: "text", headerName: "Orden de Aparición", width: 200, editable: true },
			{ field: "OTDatosDesc", type: "text", headerName: "descripcion", width: 200, editable: true },
			{ field: "OTDatosTipoPed", type: "text", headerName: "tipo", width: 100, editable: false },
			{ field: "opcion", type: "text", headerName: "Opción Campo Select", width: 150, editable: false },
			{ field: "OTDatosRequerido", type: "text", headerName: "requerido", width: 100, editable: false },
			{ field: "OTDatosAncho", type: "text", headerName: "Ancho", width: 100, editable: true },

		]);
	});
}

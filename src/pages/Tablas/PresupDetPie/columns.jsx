import estilotabla from "../../../Styles/Tabla.module.css";

export async function llenarcolumns() {
	return columnsFill();
}
function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "PieLeyenda(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: estilotabla.encabcolumns,
			// },+
			{
				headerName: "Detalle",
				field: "PresupDetPieLeyenda",
				order: true,
				width: 500,
				editable: true,
				required: true,
				maxLength: 120,
				pattern: /^/,
				xs: 8,
				placeholder:
					"__________________________________________________________",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

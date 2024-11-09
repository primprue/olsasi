import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "Grupos(ID)",
			// 	field: "idStkGrupo",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: estilotabla.encabcolumns,
			// },+
			{
				headerName: "Detalle",
				field: "StkGrupoDesc",
				order: true,
				width: 200,
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			}, {
				headerName: "Abreviatura",
				field: "StkGrupoAbr",
				order: true,
				width: 100,
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			}
		]);
	});
}

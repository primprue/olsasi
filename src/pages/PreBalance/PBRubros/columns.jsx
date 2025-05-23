import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "Rubros(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: estilotabla.encabcolumns,
			// },+

			{
				headerName: "Descripción",
				field: "PBRubrosDetalle",
				width: 250,
				editable: true,
				required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},

			// {
			// 	title: "Contador de Rubro",
			// 	field: "StkGrupoContRubro",
			// 	editable: "never",
			// 	order: true,
			// },
		]);
	});
}

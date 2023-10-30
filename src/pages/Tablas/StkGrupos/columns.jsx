export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "Grupo(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: "encabcolumns",
			// },+
			{
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
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Descripción",
				field: "StkGrupoDesc",
				width: 250,
				editable: true,
				required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				// alignItems: "left",
				headerClassName: "encabcolumns",
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

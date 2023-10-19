export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Grupo(ID)",
				field: "id",
				editable: "never",
				order: true,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Descripcion",
				field: "StkGrupoDesc",
				order: true,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Abreviatura",
				field: "StkGrupoAbr",
				order: true,
				headerClassName: "encabcolumns",
			},
			// {
			//   title: "Contador de Rubro",
			//   field: "StkGrupoContRubro",
			//   editable: "never",
			//   order: true,
			// },
		]);
	});
}

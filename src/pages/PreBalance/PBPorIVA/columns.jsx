import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "Porcentaje IVA",
			// 	field: "id",
			// 	editable: true,
			// 	order: true,
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Porcentaje IVA",
				field: "PBPorcIVA",
				editable: true,
				order: true,
				headerClassName: estilotabla.encabcolumns,
			}


		]);
	});
}

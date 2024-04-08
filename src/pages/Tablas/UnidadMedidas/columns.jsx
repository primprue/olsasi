import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve, reject) {
		resolve([
			{
				headerName: "Código",
				field: "id",
				editable: true,
				required: true,
				maxLength: 4,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Descripción",
				field: "StkUnMedDesc",
				order: true,
				width: 200,
				editable: true,
				required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "_________________",
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

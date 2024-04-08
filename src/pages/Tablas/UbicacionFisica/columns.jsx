import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	// const ubicacion = [
	// 	{ value: "PAR", label: "PARQUE" },
	// 	{ value: "RUT", label: "RUTA" },
	// 	{ value: "GB", label: "GRUNBEING" },
	// ];

	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve, reject) {
		resolve([
			{
				headerName: "Lugar Físico",
				field: "id",
				editable: true,
				required: true,
				maxLength: 4,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Ub. Geográfica",
				field: "StkUbFisicaGeo",
				order: true,
				// type: "singleSelect",
				required: true,
				width: 250,
				// valueOptions: ubicacion,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

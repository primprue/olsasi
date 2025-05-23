import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	const sumrest = [
		{ value: "S", label: "S" },
		{ value: "R", label: "R" },
	];
	return columnsFill(sumrest);
}

function columnsFill(sumrest) {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Abreviatura",
				field: "id",
				editable: "never",
				order: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Detalle",
				field: "PBCompDesc",
				order: true,
				width: 200,
				editable: true,
				required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			}, {
				headerName: "Sum/Rest",
				field: "PBCompSumaResta",
				type: "singleSelect",
				order: true,
				width: 120,
				editable: true,
				required: true,
				maxLength: 5,
				valueOptions: sumrest,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			}
		]);
	});
}

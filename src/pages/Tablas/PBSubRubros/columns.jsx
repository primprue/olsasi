
import estilotabla from "../../../Styles/Tabla.module.css";
import { PBRubrosValueLeer } from "../PBRubros/PBRubrosValueLeer";
export async function llenarcolumns() {
	const pbrubro = await PBRubrosValueLeer();
	console.log('pbrubro ', pbrubro)

	return columnsFill(pbrubro);
}

function columnsFill(pbrubro) {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "SubRubros(ID)",
				field: "id",
				editable: "never",
				order: true,
				headerClassName: "encabcolumns",
			},

			{
				headerName: "Rubro",
				field: "PBSubRubroIdRubro",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: pbrubro,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Descripción",
				field: "PBSubRubroDetalle",
				order: true,
				width: 250,
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},

		]);
	});
}


import estilotabla from "../../../Styles/Tabla.module.css";
import { PBRubrosValueLeer } from "../PBRubros/PBRubrosValueLeer";
export async function llenarcolumns() {
	const pbrubro = await PBRubrosValueLeer();
	return columnsFill(pbrubro);
}

function columnsFill(pbrubro) {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "SubRubros(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	required: false,
			// 	order: true,
			// 	headerClassName: "encabcolumns",
			// },
			{
				headerName: "SubRubros(ID)",
				field: "PBidSubRubro",
				editable: false,
				required: false,
				order: true,
				autoFocus: false,

				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Rubro",
				field: "PBSubRubroIdRubro",
				type: "singleSelect",
				required: true,
				width: 250,
				valueOptions: pbrubro,
				editable: true,
				readOnly: false,
				autoFocus: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Descripción",
				field: "PBSubRubroDetalle",
				order: true,
				width: 250,
				editable: true,
				readOnly: false,
				required: true,
				autoFocus: true,
				maxLength: 250,
				pattern: /^/,
				xs: 8,
				placeholder: "______________________________",
				// alignItems: "left",
				headerClassName: estilotabla.encabcolumns,
			},

		]);
	});
}

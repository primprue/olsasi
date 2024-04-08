import { leeStkGrupo } from "./leeStkGrupo";
import { leeStkRubro } from "./leeStkRubro";
import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	const stkGrupos = await leeStkGrupo();

	const stkRubros = await leeStkRubro();
	return columnsFill(stkGrupos, stkRubros);
}

function columnsFill(stkGrupos, stkRubros) {
	return new Promise(function (resolve, reject) {
		resolve([
			// {
			// 	headerName: "Items(ID)",
			// 	field: "id",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: estilotabla.encabcolumns,
			// },

			{
				headerName: "Grupo",
				field: "StkItemsGrupo",
				type: "singleSelect",
				valueOptions: stkGrupos,
				order: true,
				width: 300,
				maxLength: 45,
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Rubro",
				field: "StkItemsRubroAbr",
				type: "singleSelect",
				valueOptions: stkRubros,
				order: true,
				width: 300,
				maxLength: 45,
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Descripción",
				field: "StkItemsDesc",
				order: true,
				width: 300,
				editable: true,
				// required: true,
				maxLength: 45,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Detalle Ord.Trab. S/N",
				field: "StkItemsOTD",
				order: true,
				width: 80,
				editable: true,
				// required: true,
				maxLength: 1,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Cantidad",
				field: "StkItemsCantidad",
				order: false,
				width: 100,
				type: "number",
				editable: true,
				required: false,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Disponible",
				field: "StkItemsCantDisp",
				order: false,
				width: 100,
				type: "number",
				editable: true,
				required: false,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Fecha Actualización",
				field: "StkItemsFAct",
				order: true,
				width: 150,
				type: "Date",
				editable: false,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Stock Mínimo",
				field: "StkItemsMin",
				order: false,
				width: 120,
				type: "number",
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Stock Máximo",
				field: "StkItemsMax",
				order: false,
				width: 120,
				type: "number",
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: estilotabla.encabcolumns,
			},
			// {
			//     headerName: "Observaciones",
			//     field: "StkItemsObserv",
			//     tipo:"numero"
			// },
		]);
	});
	// resolve(columns);
}
// )
// }

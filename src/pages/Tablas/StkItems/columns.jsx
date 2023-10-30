import { leeStkGrupo } from "./leeStkGrupo";
import { leeStkRubro } from "./leeStkRubro";

export async function llenarcolumns() {
	const stkGrupos = await leeStkGrupo();

	const stkRubros = await leeStkRubro();

	return columnsFill(stkGrupos, stkRubros);
}

// useEffect(() => {
//   console.log("estoy en useeffect de itemscolumns ");
//   console.log("props ");
//   console.log(rowData);
// }, [rowData]);

function columnsFill(stkGrupos, stkRubros) {
	return new Promise(function (resolve, reject) {
		resolve([
			// {
			//   headerName: "Items(ID)",
			//   field: "id",
			// 	editable: "never",
			// 	order: true,
			// 	headerClassName: "encabcolumns",
			// },

			{
				headerName: "Grupo",
				field: "StkItemsGrupo",
				type: "singleSelect",
				valueOptions: stkGrupos,
				order: true,
				width: 200,
				editable: true,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Rubro",
				field: "StkItemsRubro",
				type: "singleSelect",
				valueOptions: stkRubros,
				order: true,
				width: 200,
				editable: true,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Descripción",
				field: "StkItemsDesc",
				order: true,
				width: 200,
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Detalle Ord.Trab. S/N",
				field: "StkItemsOTD",
				order: true,
				width: 200,
				editable: true,
				required: true,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: "encabcolumns",
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
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Cantidad Disponible",
				field: "StkItemsCantDisp",
				order: false,
				width: 150,
				type: "number",
				editable: true,
				required: false,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Fecha Actualización",
				field: "StkItemsFAct",
				order: true,
				width: 150,
				editable: false,
				required: false,
				maxLength: 5,
				pattern: /^/,
				xs: 8,
				placeholder: "______",
				headerClassName: "encabcolumns",
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
				headerClassName: "encabcolumns",
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
				headerClassName: "encabcolumns",
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

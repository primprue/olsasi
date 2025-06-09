import estilotabla from "../../../../../Styles/Tabla.module.css";

export async function llenarcolumns() {

	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "Cód",
			// 	field: "id",
			// 	width: 25,
			// 	xs: 4,
			// 	editable: false,
			// 	headerClassName: "encabcolumns",
			// },
			{
				headerName: "Fecha",
				field: "StkMovFecha",
				order: true,
				width: 100,
				editable: false,
				required: false,
				maxLength: 145,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Largo",
				field: "StkMovLargo",
				width: 80,
				editable: false,
				required: false,
				type: "number",
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Ancho",
				field: "StkMovAncho",
				width: 80,
				editable: false,
				required: false,
				type: "number",
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Total",
				field: "StkMovTotal",
				width: 100,
				editable: false,
				required: false,
				type: "number",
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Rubro",
				field: "StkMovRubroAbr",
				width: 100,
				editable: false,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Item",
				field: "StkMovItemDesc",
				width: 250,
				editable: false,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Cliente",
				field: "StkMovCliente",
				width: 200,
				maxLength: 145,
				editable: false,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Proveedor",
				field: "Proveedor",
				width: 200,
				maxLength: 145,
				editable: false,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Referencia",
				field: "StkMovNroRef",
				width: 150,
				editable: false,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

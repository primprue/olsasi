import { leerStkMonedas } from "../Monedas/StkMonedasLeerP";
import { leetipoprov } from "./LeeTipoProv";

//sacado de https://mui.com/x/react-data-grid/editing/ With auto-stop
//https://github.com/mui/mui-x/issues/4437

//https://codesandbox.io/s/columntypesgrid-material-demo-forked-hmb3e9?file=/demo.js
//https://mui.com/x/react-data-grid/column-definition/#column-types

export async function llenarcolumns() {
	const tipoprov = await leetipoprov();

	const stkMonedas = await leerStkMonedas();

	return columnsFill(tipoprov, stkMonedas);
}

function columnsFill(tipoprov, stkMonedas) {
	return new Promise(function (resolve) {
		resolve([
			{ headerName: "id", field: "id", type: "text", xs: 4, editable: false },
			{
				headerName: "Descripción",
				field: "ProveedoresDesc",
				placeholder: "_________________",
				editable: true,
				required: true,
				maxLength: 10,
				width: 250,
				pattern: /^/,
				xs: 8,
				headerClassName: "encabcolumns",
			},

			{
				headerName: "Tipo",
				field: "ProveedoresTipo",
				type: "singleSelect",
				valueOptions: tipoprov,
				required: true,
				editable: true,
				width: 200,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "CUIT",
				field: "ProveedoresCUIT",
				editable: true,
				width: 120,
				color: "secondary",
				type: "text",
				pattern: /^[0-9]{0,2}-[0-9]{0,8}-[0-9]{1,1}$/,
				placeholder: "99-99999999-9",
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Calle",
				field: "ProveedoresCalle",
				editable: true,
				width: 350,
				type: "text",
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Calle Nro.",
				field: "ProveedoresNroCalle",
				editable: true,
				type: "number",
				defaultValue: 0,
				xs: 4,
				headerClassName: "encabcolumns",
			},

			{
				headerName: "Piso",
				field: "ProveedoresPiso",
				editable: true,
				type: "text",
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Dto",
				field: "ProveedoresDto",
				editable: true,
				type: "text",
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "CodPos",
				field: "ProveedoresCodPos",
				type: "text",
				editable: true,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Loc",
				field: "ProveedoresLoc",
				type: "text",
				editable: true,
				width: 120,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Pcia",
				field: "ProveedoresPcia",
				type: "text",
				editable: true,
				width: 120,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Tel",
				field: "ProveedoresTel",
				type: "text",
				editable: true,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Contacto",
				field: "ProveedoresContacto",
				type: "text",
				editable: true,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Mail",
				field: "ProveedoresMail",
				type: "email",
				editable: true,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Web",
				field: "ProveedoresWeb",
				type: "text",
				editable: true,
				xs: 4,
				headerClassName: "encabcolumns",
			},
			{
				field: "ProveedoresCodMon",
				headerName: "CodMon",
				type: "singleSelect",
				required: true,
				valueOptions: stkMonedas,
				editable: "true",
				xs: 4,
				headerClassName: "encabcolumns",
			},
		]);
	});
}

// inputProps: {
// 	"data-testid": `validated-textfield-ProveedoresDesc`,
// },

import { leerStkMonedas } from "../Monedas/StkMonedasLeerP";
import { leetipoprov } from "./LeeTipoProv";
import estilotabla from "../../../Styles/Tabla.module.css";
//sacado de https://mui.com/x/react-data-grid/editing/ With auto-stop
//https://github.com/mui/mui-x/issues/4437

//https://codesandbox.io/s/columntypesgrid-material-demo-forked-hmb3e9?file=/demo.js
//https://mui.com/x/react-data-grid/column-definition/#column-types

//localhost:4000/stkbgsubrubroleer

export async function llenarcolumns() {
	const tipoprov = await leetipoprov();
	const monedas = await leerStkMonedas();
	return columnsFill(tipoprov, monedas);
}

function columnsFill(tipoprov, monedas) {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "id",
			// 	field: "id",
			// 	type: "number",
			// 	width: 25,
			// 	editable: false,
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Descripción",
				field: "ProveedoresDesc",
				placeholder: "_________________",
				editable: true,
				required: true,
				maxLength: 145,
				width: 250,
				pattern: /^/,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Tipo",
				field: "ProveedoresTipo",
				type: "singleSelect",
				width: 200,
				valueOptions: tipoprov,
				// required: true,
				editable: true,
				headerClassName: estilotabla.encabcolumns,
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

				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Calle",
				field: "ProveedoresCalle",
				editable: true,
				width: 350,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Calle Nro.",
				field: "ProveedoresNroCalle",
				editable: true,
				type: "number",
				defaultValue: 0,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Piso",
				field: "ProveedoresPiso",
				editable: true,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Dto",
				field: "ProveedoresDto",
				editable: true,
				type: "text",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "CodPos",
				field: "ProveedoresCodPos",
				type: "text",
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Loc",
				field: "ProveedoresLoc",
				type: "text",
				editable: true,
				width: 120,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Pcia",
				field: "ProveedoresPcia",
				type: "text",
				editable: true,
				width: 120,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Tel",
				field: "ProveedoresTel",
				type: "text",
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Contacto",
				field: "ProveedoresContacto",
				type: "text",
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Mail",
				field: "ProveedoresMail",
				type: "email",
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Web",
				field: "ProveedoresWeb",
				type: "text",
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "CodMon",
				field: "ProveedoresCodMon",
				type: "singleSelect",
				width: 150,
				// required: true,
				valueOptions: monedas,
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

// inputProps: {
// 	"data-testid": `validated-textfield-ProveedoresDesc`,
// },

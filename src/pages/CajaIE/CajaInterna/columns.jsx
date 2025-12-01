import estilotabla from "../../../Styles/Tabla.module.css";
import { leerStkMonedas } from "../../Tablas/Monedas/StkMonedasLeerP.jsx";
export async function llenarcolumns() {
	const entsal = [
		{ value: "E", label: "Entrada" },
		{ value: "S", label: "Salida" },
	];
	const mantar = [
		{ value: "M", label: "Mañana" },
		{ value: "T", label: "Tarde" },
	];
	const monedas = await leerStkMonedas();
	return columnsFill(entsal, mantar, monedas);
}
function columnsFill(entsal, mantar, monedas) {
	return new Promise(function (resolve) {

		resolve([
			// {
			// 	headerName: "id",
			// 	field: "id",
			// 	type: "text",
			// 	width: 3,
			// 	editable: false,
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Fecha",
				field: "CajaInternaFecha",
				type: "Date",
				width: 150,
				editable: true,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,

			},
			{
				headerName: "Concepto",
				field: "CajaInternaConcepto",
				editable: true,
				width: 200,
				align: "left", //alinea el contenido
				headerAlign: "center",
				xs: 8,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Moneda",
				field: "CajaInternaMoneda",
				type: "singleSelect",
				valueOptions: monedas,
				editable: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Ent/Sal",
				field: "CajaInternaES",
				type: "singleSelect",
				valueOptions: entsal,
				editable: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Man/Tar",
				field: "CajaInternaMT",
				type: "singleSelect",
				valueOptions: mantar,
				editable: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Importe",
				field: "CajaInternaImporte",
				type: "text",
				placeholder: "999999999,99",
				// required: true,
				editable: true,
				defaultValue: 0,
				maxLength: 18,
				xs: 4,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				headerClassName: estilotabla.encabcolumns,
			},
			// 			},
			// {
			// 	headerName: "ImporteM",
			// 	field: "CajaInternaImporteM",
			// 	width: 150,
			// 	editable: true,
			// 	type: "text",
			// 	maxLength: 9,
			// 	align: "right", //alinea el contenido
			// 	headerAlign: "center", //alinea el encabezado
			// 	textAlign: "right",
			// 	xs: 4,
			// 	defaultValue: "0",
			// 	pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
			// 	align: "right",
			// 	renderCell: (params) => (
			// 		<div style={{ textAlign: "right" }}>
			// 			{params.value && `$ ${params.value}`}{" "}
			// 			{/* Agrega el signo monetario */}
			// 		</div>
			// 	),
			// 	headerClassName: estilotabla.encabcolumns,
			// headerClassName: estilotabla.encabcolumns,
			// renderCell: (params) => {
			// 	const value = Number(params.value);
			// 	const formatted = !isNaN(value)
			// 		? value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
			// 		: "";
			// 	const fontWeight = value > 0 ? "bold" : "inherit";
			// 	return (
			// 		<div style={{ textAlign: "right", width: "100%", fontWeight }}>
			// 			{formatted ? `$ ${formatted}` : ""}
			// 		</div>
			// 	);
			// },
			// },

		]);
	});
}
// {
// 	headerName: "Instr.Pago",
// 	field: "CajaIECodIP",
// 	type: "singleSelect",
// 	required: true,
// 	valueOptions: instrumpago,
// 	editable: true,
// 	xs: 4,
// 	headerClassName: estilotabla.encabcolumns,
// },

// {
// 	headerName: "Imp.Ins.de Pago",
// 	field: "CajaIEImpIP",
// 	width: 150,
// 	editable: true,
// 	type: "text",
// 	//header ClassName: "encabcolumns",
// 	maxLength: 9,
// 	align: "right", //alinea el contenido
// 	headerAlign: "center", //alinea el encabezado
// 	textAlign: "right",
// 	xs: 4,
// 	pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
// 	renderCell: (params) => (
// 		<div>{params.value && `$ ${Number(params.value).toFixed(2)}`}{" "} </div>
// 	),
// 	headerClassName: estilotabla.encabcolumns,
// }

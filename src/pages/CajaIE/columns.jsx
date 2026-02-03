import estilotabla from "../../Styles/Tabla.module.css";
import { CajaIPLeer } from "./CajaIPLeer";
import { CajaCPLeer } from "./CajacPLeer";
import { leerStkMonedas } from "../Tablas/Monedas/StkMonedasLeerP.jsx";
export async function llenarcolumns() {
	const puntosn = [
		{ value: "M", label: "M" },
		{ value: "T", label: "T" },
	];
	const instrumpago = await CajaIPLeer();
	const conceptopago = await CajaCPLeer();
	const monedas = await leerStkMonedas();
	return columnsFill(puntosn, instrumpago, conceptopago, monedas);
}
function columnsFill(puntosn, instrumpago, conceptopago, monedas) {
	return new Promise(function (resolve) {
		resolve([
			// {
			// 	headerName: "id",
			// 	field: "idCajaIE",
			// 	type: "text",
			// 	width: 3,
			// 	editable: false,
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Fecha",
				field: "CajaIEFecha",
				type: "Date",
				width: 150,
				editable: false,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,

			},
			{
				headerName: "Cliente",
				field: "CajaIECliente",
				editable: true,
				width: 200,
				align: "left", //alinea el contenido
				headerAlign: "center",
				xs: 8,
				required: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Concepto",
				field: "CajaIEConcepto",
				type: "singleSelect",
				required: true,
				valueOptions: conceptopago,
				editable: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			// {
			// 	headerName: "Concepto",
			// 	field: "CajaCPDesc",
			// 	type: "singleSelect",
			// 	// required: true,
			// 	valueOptions: conceptopago,
			// 	editable: true,
			// 	xs: 4,
			// 	headerClassName: estilotabla.encabcolumns,
			// },
			{
				headerName: "Man-Tar",
				field: "CajaIEMT",
				type: "singleSelect",
				required: true,
				valueOptions: puntosn,
				editable: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Moneda",
				field: "CajaIEMoneda",
				type: "singleSelect",
				valueOptions: monedas,
				editable: true,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Importe",
				field: "CajaIEImporte",
				width: 150,
				editable: true,
				type: "text",
				maxLength: 9,
				align: "right", //alinea el contenido
				headerAlign: "center", //alinea el encabezado
				textAlign: "right",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
				renderCell: (params) => {
					const value = Number(params.value);
					const formatted = !isNaN(value)
						? value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
						: "";
					const fontWeight = value > 0 ? "bold" : "inherit";
					return (
						<div style={{ textAlign: "right", width: "100%", fontWeight }}>
							{formatted ? `$ ${formatted}` : ""}
						</div>
					);
				},
			},
			{
				headerName: "Instr.Pago",
				field: "CajaIECodIP",
				type: "singleSelect",
				valueOptions: instrumpago,
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Imp.Ins.de Pago",
				field: "CajaIEImpIP",
				width: 150,
				type: "text",
				maxLength: 9,
				align: "right",
				headerAlign: "center",
				textAlign: "right",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
				renderCell: (params) => {
					const value = Number(params.value);
					const formatted = !isNaN(value)
						? value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
						: "";

					const color = value > 0 ? "green" : value < 0 ? "red" : "inherit";

					return (
						<div style={{ color, textAlign: "right", width: "100%" }}>
							{formatted ? `$ ${formatted}` : ""}
						</div>
					);
				},
			},
			{
				headerName: "Diferencia",
				field: "CajaIEDiferencia",
				width: 150,
				editable: true,
				align: "right",
				headerAlign: "center",
				headerClassName: estilotabla.encabcolumns,
				renderCell: (params) => {
					const value = Number(params.value);
					const formatted = !isNaN(value)
						? value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
						: "";

					const color = value > 0 ? "green" : value < 0 ? "red" : "inherit";

					return (
						<div style={{ color, textAlign: "right", width: "100%" }}>
							{formatted ? `$ ${formatted}` : ""}
						</div>
					);
				},
			},
			{
				headerName: "Grab",
				field: "CajaIEGrabado",
				width: 150,
				editable: true,
				align: "center",
				headerAlign: "center",
				headerClassName: estilotabla.encabcolumns,

			}
			// {
			// 	headerName: "parentId",
			// 	field: "parentId",
			// 	width: 150,
			// 	type: "number",

			// },

			// {
			// 	headerName: "esSubfila",
			// 	field: "esSubfila",
			// 	width: 150,
			// 	type: "boolean",

			// }



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

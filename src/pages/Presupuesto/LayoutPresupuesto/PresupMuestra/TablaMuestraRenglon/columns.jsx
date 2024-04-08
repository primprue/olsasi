// import { ClientesLeerPresup } from "../../../Tablas/Clientes/ClientesLeerPresup";
import estilotabla from "../../../../../Styles/Tabla.module.css";
import { styled } from "@mui/system";
const MultilineCell = styled("div")`
	white-space: normal;
	line-height: 1.2;
	max-height: 3.6em; /* Puedes ajustar esta altura según tu necesidad */
	overflow: hidden;
`;
export async function llenarcolumns() {
	// const clientepresup = await ClientesLeerPresup();

	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "id",
				field: "id",
				editable: "never",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			,
			{
				headerName: "Cant.",
				field: "PresupRenglonCant",
				editable: "never",
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Descripción",
				field: "PresupRenglonDesc",
				editable: "never",
				renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
				width: 700,
				headerAlign: "center",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Largo",
				field: "PresupRenglonLargo",
				type: "numeric",
				width: 100,
				pattern: /^[0-9]{0,4}.[0-9]{0,2}/,
				align: "right",
				editable: "never",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Ancho",
				field: "PresupRenglonAncho",
				type: "numeric",
				width: 100,
				pattern: /^[0-9]{0,4}.[0-9]{0,2}/,
				align: "right",
				editable: "never",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Imp.Unit.",
				field: "PresupRenglonImpUnit",
				type: "text",
				width: 150,
				placeholder: "99999999,99",
				required: true,
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				editable: "never",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Imp.Item.",
				field: "PresupRenglonImpItem",
				type: "text",
				width: 150,
				placeholder: "99999999,99",
				required: true,
				editable: true,
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Detalles internos del presupuesto",
				field: "PresupRenglonParamInt",
				// renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
				width: 4500,
				editable: "never",
				headerClassName: estilotabla.encabcolumnsmt,
			},
		]);
	});
}

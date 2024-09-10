// import { ClientesLeerPresup } from "../../../Tablas/Clientes/ClientesLeerPresup";
import estilotabla from "../../../../Styles/Tabla.module.css";
import { styled } from "@mui/system";
const MultilineCell = styled("span")`
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
			// {
			// 	headerName: "id",
			// 	field: "id",
			// 	editable: false,
			// 	headerClassName: estilotabla.encabcolumnsmt,
			// },
			{
				headerName: "RenglonNro",
				field: "OTRenglonNro",
				editable: false,
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Nro Orden",
				field: "idOTRenglonNroOT",
				editable: false,
				headerClassName: estilotabla.encabcolumnsmt,
			},

			{
				headerName: "Cant.",
				field: "OTRenglonCant",
				editable: false,
				width: 80,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}/,
				align: "right",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Descripción",
				field: "OTRenglonDesc",
				editable: false,
				renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
				width: 700,
				headerAlign: "center",
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Largo",
				field: "OTRenglonLargo",
				type: "numeric",
				width: 100,
				pattern: /^[0-9]{0,4}.[0-9]{0,2}/,
				align: "right",
				editable: false,
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Ancho",
				field: "OTRenglonAncho",
				type: "numeric",
				width: 100,
				pattern: /^[0-9]{0,4}.[0-9]{0,2}/,
				align: "right",
				editable: false,
				headerClassName: estilotabla.encabcolumnsmt,
			},
			{
				headerName: "Imp.Unit.",
				field: "OTRenglonImpItem",
				type: "text",
				width: 150,
				placeholder: "99999999,99",
				editable: false,
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,8}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				headerClassName: estilotabla.encabcolumnsmt,
			},

			{
				headerName: "Detalles internos de la orden",
				field: "OTRenglonDetalles",
				// renderCell: (params) => <MultilineCell>{params.value}</MultilineCell>,
				width: 4500,
				editable: false,

				headerClassName: estilotabla.encabcolumnsmt,
			},
		]);
	});
}

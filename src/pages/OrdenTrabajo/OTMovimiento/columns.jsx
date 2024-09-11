// import { ClientesLeerPresup } from "../../../Tablas/Clientes/ClientesLeerPresup";
import estilotabla from "../../../Styles/Tabla.module.css";
<<<<<<< Updated upstream
import { ClientesLeerEncabOT } from "../../Tablas/Clientes/ClientesLeerEncabOT";
=======
import { ClientesLeerOT } from "../../Tablas/Clientes/ClientesLeerOT";
>>>>>>> Stashed changes
import { OTEstadoLeer } from "./OTEstadoLeer";
export async function llenarcolumns() {
	// const clientepresup = await ClientesLeerPresup();
	const estado = await OTEstadoLeer();
<<<<<<< Updated upstream
	const clientes = await ClientesLeerEncabOT();
=======
	const clientes = await ClientesLeerOT();
>>>>>>> Stashed changes
	return columnsFill(estado, clientes);
}

function columnsFill(estado, clientes) {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Nro.",
				field: "id",
				editable: "never",
<<<<<<< Updated upstream
				width: 80,
				headerClassName: estilotabla.encabcolumns,
			},

=======
				headerClassName: estilotabla.encabcolumns,
			},
>>>>>>> Stashed changes
			{
				headerName: "Cliente ",
				field: "OTEncabCliente",
				type: "singleSelect",
				required: false,
				width: 250,
				valueOptions: clientes,
				editable: "false",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
<<<<<<< Updated upstream
				headerName: "Cliente no Registrado ",
				field: "OTEncabClienteNoReg",
				width: 200,
				editable: "false",
=======
				headerName: "Cliente ",
				field: "OTEncabClienteNoReg",
				width: 250,
>>>>>>> Stashed changes
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Estado",
				field: "OTEncabEstado",
				type: "singleSelect",
				required: true,
				width: 150,
				valueOptions: estado,
				editable: "true",
				xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Fecha ",
				field: "OTEncabFecha",
				order: true,
				width: 120,
				editable: false,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Promesa",
				field: "OTEncabFechaPromesa",
				order: true,
				width: 120,
				editable: false,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Total",
				field: "OTEncabImpTotal",
				type: "text",
				width: 120,
				placeholder: "999999,99",
				required: true,
				editable: true,
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Seña",
				field: "OTEncabSenia",
				type: "text",
				width: 120,
				placeholder: "999999,99",
				required: true,
				editable: true,
				maxLength: 9,
				xs: 4,
				pattern: /^[0-9]{0,6}.[0-9]{0,2}$/,
				align: "right",
				renderCell: (params) => (
					<span style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</span>
				),
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Transporte",
				field: "OTEncabTransporte",
				width: 150,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

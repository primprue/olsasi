// import { ClientesLeerPresup } from "../../../Tablas/Clientes/ClientesLeerPresup";
import estilotabla from "../../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	// const clientepresup = await ClientesLeerPresup();

	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Nro.",
				field: "id",
				editable: "never",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Cliente ",
				field: "NombreCliente",
				width: 350,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Fecha",
				field: "PresupEncabFecha",
				order: true,
				width: 100,
				editable: false,
				required: false,
				maxLength: 10,
				pattern: /^/,
				xs: 8,
				placeholder: "_____",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "MayMin",
				field: "PresupEncabMayMin",
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Total",
				field: "PresupEncabTotal",
				type: "text",
				width: 100,
				placeholder: "999999,99",
				required: true,
				editable: true,
				maxLength: 9,
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
			{
				headerName: "Explicación",
				field: "PresupEncabExplic",
				width: 350,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

import { leeTipoClien } from "./LeeTipoClien";
import estilotabla from "../../../Styles/Tabla.module.css";

export async function llenarcolumns() {
	const tipoclien = await leeTipoClien();

	return columnsFill(tipoclien);
}

function columnsFill(tipoclien) {
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
				headerName: "Descripción",
				field: "ClientesDesc",
				placeholder: "_________________",
				editable: false,
				maxLength: 10,
				width: 250,
				pattern: /^/,
				//xs: 8,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Domicilio",
				field: "ClientesDomicilio",
				width: 230,
				defaultValue: "",
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "CodPos",
				field: "ClientesCodPos",
				//width: 50,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Loc",
				field: "ClientesLoc",
				width: 200,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Pcia",
				field: "ClientesPcia",
				width: 150,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Tel-WA",
				field: "ClientesTel",
				width: 250,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "IVA",
				field: "ClientesIVA",
				width: 50,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "CUIT",
				field: "ClientesCUIT",
				width: 150,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Mail",
				field: "ClientesMail",
				width: 250,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Tipo",
				field: "ClientesTipo",
				type: "singleSelect",
				width: 150,
				valueOptions: tipoclien,
				editable: false,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Contacto",
				field: "ClientesContacto",
				width: 150,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Categoría",
				field: "ClientesCategoria",
				width: 50,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Observación",
				field: "ClientesObserv1",
				width: 350,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Observación",
				field: "ClientesObserv2",
				width: 350,
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Fecha",
				field: "ClientesFecha",
				//width: 150,
				type: "Date",
				editable: false,
				//xs: 4,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

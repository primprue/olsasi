// import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoClien } from "./LeeTipoClien";

export async function llenarcolumns() {
	const tipoclien = await leeTipoClien();

	return columnsFill(tipoclien);
	//, objstkMonedas);
}

function columnsFill(tipoclien) {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Cód",
				field: "id",
				width: 25,
				xs: 4,
				editable: false,
			},
			{
				headerName: "Descripción",
				field: "ClientesDesc",
				placeholder: "_________________",
				editable: true,
				required: true,
				maxLength: 10,
				width: 250,
				pattern: /^/,
				xs: 8,
			},
			{
				headerName: "Domicilio",
				field: "ClientesDomicilio",
				width: 150,
				defaultValue: "",
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "CodPos",
				field: "ClientesCodPos",
				width: 50,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Loc",
				field: "ClientesLoc",
				width: 150,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Pcia",
				field: "ClientesPcia",
				width: 150,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Tel-WA",
				field: "ClientesTel",
				width: 100,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "IVA",
				field: "ClientesIVA",
				width: 50,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "CUIT",
				field: "ClientesCUIT",
				width: 150,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Mail",
				field: "ClientesMail",
				width: 50,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Tipo",
				field: "ClientesTipo",
				type: "singleSelect",
				width: 50,
				valueOptions: tipoclien,
				required: true,
				editable: true,
			},
			{
				headerName: "Contacto",
				field: "ClientesContacto",
				width: 150,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Categoría",
				field: "ClientesCategoria",
				width: 50,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Observación",
				field: "ClientesObserv1",
				width: 350,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Observación",
				field: "ClientesObserv2",
				width: 350,
				required: true,
				editable: true,
				xs: 4,
			},
			{
				headerName: "Fecha",
				field: "ClientesFecha",
				width: 150,
				required: true,
				editable: true,
				xs: 4,
			},
		]);
	});
}

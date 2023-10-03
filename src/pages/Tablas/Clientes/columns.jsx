// import { stkMonedasleerRed } from "../../Stock/Rubros/StkMonedasLeerRed";
import { leeTipoClien } from "./LeeTipoClien";

export async function llenarColumns() {
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
				width: "25%",
				defaultGroupOrder: 1,
			},
			{
				headerName: "Descripción",
				field: "ClientesDesc",
				width: "130%",
				defaultGroupOrder: 0,
			},
			{
				headerName: "Domicilio",
				field: "ClientesDomicilio",
				width: "150%",
				defaultValue: "",
			},
			{
				headerName: "CodPos",
				field: "ClientesCodPos",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Loc",
				field: "ClientesLoc",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Pcia",
				field: "ClientesPcia",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Tel-WA",
				field: "ClientesTel",
				width: "100%",
				defaultValue: "",
			},
			{
				headerName: "IVA",
				field: "ClientesIVA",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "CUIT",
				field: "ClientesCUIT",
				width: "100%",
				defaultValue: "",
			},
			{
				headerName: "Mail",
				field: "ClientesMail",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Tipo",
				field: "ClientesTipo",
				width: "50%",
				valueOptions: tipoclien,
			},
			{
				headerName: "Contacto",
				field: "ClientesContacto",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Categoría",
				field: "ClientesCategoria",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Observación",
				field: "ClientesObserv1",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Observación",
				field: "ClientesObserv2",
				width: "50%",
				defaultValue: "",
			},
			{
				headerName: "Fecha",
				field: "ClientesFecha",
				width: "50%",
				defaultValue: "",
			},
		]);
	});
}

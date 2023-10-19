import React from "react";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Transporte(ID)",
				field: "id",
				editable: "never",
				order: true,
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Descripción",
				field: "TransporteDesc",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Teléfono ",
				field: "TransporteTel1",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Teléfono ",
				field: "TransporteTel2",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "WhatsApp ",
				field: "TransporteWA",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Mail ",
				field: "TransporteMail",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Domicilio ",
				field: "TransporteDom",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Localidad ",
				field: "TransporteLoc",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Destino ",
				field: "TransporteDestino",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
			{
				headerName: "Observaciones ",
				field: "TransporteObser",
				order: true,
				defaultValue: "",
				headerClassName: "encabcolumns",
			},
		]);
	});
}

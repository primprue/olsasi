import leePresupConfTipoLeeAnexo from "../../leePresupConfTipoLeeAnexo";
import React from "react";
import estilotabla from "../../../../Styles/Tabla.module.css";
export async function filaanexosColumns() {
	//     const tipoanexo = await leePresupConfTipoLeeAnexo('S');
	//     console.log('tipoanexo ', tipoanexo)
	//     return columnsFill(tipoanexo);
	// }

	// function columnsFill(tipoanexo) {
	return new Promise(function (resolve) {
		resolve([
			// {
			//     headerName: "id",
			//     field: "id",
			//     editable: false,
			//     width: 22,

			// },

			{
				headerName: "Descripción",
				field: "PresupConfTipoDesc",
				type: "text",
				required: false,
				editable: false,
				cellClassName: "estilotabla.multiline-cell",
				width: 250,
			},

			{
				headerName: "Cantidad",
				field: "AnexoMedida",
				editable: true,
				type: "number",
				width: 100,
				align: "right",
			},
			{
				headerName: "Imp. Unitario",
				field: "importea",
				type: "currency",
				width: 130,
				required: false,
				editable: false,
				align: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				// disable: true,
			},
			{
				headerName: "Imp. Total",
				field: "importet",
				type: "currency",
				width: 130,
				// height: 8,
				required: false,
				editable: false,
				align: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				// disable: true,
			},
			{
				headerName: "Imprime",
				field: "PresupConfTipoImprime",
				width: 100,
				required: false,
				editable: false,
				align: "right",
				//  disable: true,
			},
			// {
			//     field: "checkboxSelection",
			//     headerName: "Selec",

			// }
		]);
	});
}

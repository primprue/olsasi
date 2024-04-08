import React from "react";
import estilotabla from "../../../Styles/Tabla.module.css";
export async function llenarcolumns() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				headerName: "Código",
				field: "id",
				type: "text",
				maxLength: 3,
				editable: true,
				headerClassName: estilotabla.encabcolumns,
			},
			{
				headerName: "Descripción",
				field: "StkMonedasDescripcion",
				placeholder: "_________________",
				editable: true,
				required: true,
				maxLength: 30,
				width: 200,
				pattern: /^/,
				xs: 8,
				headerClassName: estilotabla.encabcolumns,
			},

			{
				headerName: "Cotización",
				field: "StkMonedasCotizacion",
				type: "text",
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
			,
			{
				headerName: "Signo",
				field: "StkMonedasSigno",
				placeholder: "_________________",
				editable: true,
				required: true,
				maxLength: 10,
				width: 100,
				pattern: /^/,
				xs: 8,
				headerClassName: estilotabla.encabcolumns,
			},
		]);
	});
}

// inputProps: {
// 	"data-testid": `validated-textfield-ProveedoresDesc`,
// },

import React from "react";
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
			},

			{
				headerName: "Cotización",
				field: "StkMonedasCotizacion",
				type: "text",
				placeholder: "999999,99",
				required: true,
				editable: true,
				// alignItems: "right",
				// renderEditCell: (val) => {
				// 	return `Editando: ${val.value}`;
				// },
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
				// valueParser: (value) => parseFloat(value.toFixed(2)),
				// valueFormatter: (params) => {
				// 	// Formatear el valor numérico con dos decimales
				// 	return params.value.toFixed(2);
				// },
			},
		]);
	});
}

// inputProps: {
// 	"data-testid": `validated-textfield-ProveedoresDesc`,
// },

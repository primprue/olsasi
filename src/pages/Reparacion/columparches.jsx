import React from "react";

export async function llenarcolumnsparches() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{ field: 'cantparche', headerName: 'Cant', width: 10 },
			{ field: 'medparche', headerName: 'Medida', width: 80 },
			{ field: 'impparche', headerName: 'Imp.', width: 80, textAlign: "right", renderCell: (params) => (
				<div style={{ textAlign: "right" }}>
					{params.value && `$ ${params.value}`}{" "}
					{/* Agrega el signo monetario */}
				</div>
			), },
			{ field: 'imptparche', headerName: 'Importe', type: 'number', width: 80, renderCell: (params) => (
				<div style={{ textAlign: "right" }}>
					{params.value && `$ ${params.value}`}{" "}
					{/* Agrega el signo monetario */}
				</div>
			), },
		]);
	});
}

import React from "react";

export async function llenarcolumnschicotes() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{headerName: 'id', field: 'id'},
			{ field: 'cantchicote', 
				headerName: 'Cant',
				width: 10, 
				editable : true },
			{ field: 'medchicote', 
				headerName: 'Medida', 
				width: 80, 
				editable : true  },

			{ field: 'impchicote', 
				headerName: 'Imp.',
				width: 80, 
				textAlign: "right", 
				renderCell: (params) => (
				<div style={{ textAlign: "right" }}>
					{params.value && `$ ${params.value}`}{" "}
					{/* Agrega el signo monetario */}
				</div>
			), },
			{ field: 'imptchicote', 
				headerName: 'Importe', 
				type: 'number', 
				width: 80, 
				renderCell: (params) => (
				<div style={{ textAlign: "right" }}>
					{params.value && `$ ${params.value}`}{" "}
					{/* Agrega el signo monetario */}
				</div>
			), },
		]);
	});
}

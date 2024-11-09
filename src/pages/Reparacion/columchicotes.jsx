export async function llenarcolumnschicotes() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				field: 'cantchicote',
				headerName: 'Cant',
				width: 10,
				type: 'number',
				textAlign: "right",
				editable: true,
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && ` ${Number(params.value).toFixed(2)}`}{" "}
					</div>
				),
			},

			{
				field: 'medchicote',
				headerName: 'Mts',
				width: 50,
				type: 'number',
				textAlign: "right",
				editable: true,
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && ` ${Number(params.value).toFixed(2)}`}{" "}
					</div>
				),
			},

			{
				field: 'impchicote',
				headerName: 'Imp.',
				width: 80,
				type: 'number',
				textAlign: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${Number(params.value).toFixed(2)}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
			},
			{
				field: 'imptchicote',
				headerName: 'Importe',
				type: 'number',
				width: 80,
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${Number(params.value).toFixed(2)}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
			},
		]);
	});
}

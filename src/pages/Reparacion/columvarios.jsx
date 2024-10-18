export async function llenarcolumnsvarios() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {headerName: 'id', field: 'id'},

			{
				field: 'cantvarios',
				headerName: 'Cant',
				width: 10,
				editable: true,
			},
			{
				field: 'impvarios',
				headerName: 'Imp.',
				width: 80,
				textAlign: "right",
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
				editable: true
			},
			{
				field: 'imptvarios',
				headerName: 'Importe',
				type: 'number',
				width: 80,
				renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${params.value}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
			},
		]);
	});
}

export async function llenarcolumnsparcheleg() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			{
				field: 'cantparche', headerName: 'Cant', width: 10, renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && ` ${Number(params.value).toFixed(2)}`}{" "}
					</div>
				),
			},
			{
				field: 'medparche', headerName: 'Medida', width: 80
			},
			{
				field: 'impparche',
				headerName: 'Imp.', width: 80, type: 'number', textAlign: "right", renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${Number(params.value).toFixed(2)}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
			},
			{
				field: 'imptparche', headerName: 'Importe', type: 'number', textAlign: "right", width: 100, renderCell: (params) => (
					<div style={{ textAlign: "right" }}>
						{params.value && `$ ${Number(params.value).toFixed(2)}`}{" "}
						{/* Agrega el signo monetario */}
					</div>
				),
			},
		]);
	});
}

import estilotabla from "../../Styles/Tabla.module.css";
export async function llenarcolumnsmot1() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {headerName: 'id', field: 'id'},

			{
				field: 'mot1desde',
				headerName: 'Desde',
				type: 'number',
				width: 10,
				// editable: true,
				textAlign: "right",
				// renderCell: (params) => (
				// 	<div style={{ textAlign: "right" }}>
				// 		{params.value && ` ${Number(params.value).toFixed(2)}`}{" "}
				// 	</div>
				// ),
			},
			{
				field: 'mot1hasta',
				headerName: 'Hasta',
				type: 'number',
				width: 100,
				textAlign: "right",
				// renderCell: (params) => (
				// 	<div style={{ textAlign: "right" }}>
				// 		{params.value && `$ ${Number(params.value).toFixed(2)}`}{" "}
				// 		{/* Agrega el signo monetario */}
				// 	</div>
				// ),
				editable: true
			},
			{
				field: 'mot1importe',
				headerName: 'Importe',
				type: 'number',
				width: 140,
				placeholder: "999999,00",
				textAlign: "right",
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
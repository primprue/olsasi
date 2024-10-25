import estilotabla from "../../Styles/Tabla.module.css";
export async function llenarcolumnsmot2() {
	return columnsFill();
}

function columnsFill() {
	return new Promise(function (resolve) {
		resolve([
			// {headerName: 'id', field: 'id'},
			{
				field: 'mot2desde',
				headerName: 'Desde',
				type: 'number',
				width: 60,
				textAlign: "right",
			},
			{
				field: 'mot2hasta',
				headerName: 'Hasta',
				type: 'number',
				width: 60,
				textAlign: "right",
				editable: true
			},
			{
				field: 'horamot2',
				headerName: 'Hora',
				type: 'number',
				width: 60,
				textAlign: "right",
				editable: true
			},
			{
				field: 'minutmot2',
				headerName: 'Minuto',
				type: 'number',
				width: 60,
				textAlign: "right",
				editable: true
			},
		]);
	});
}

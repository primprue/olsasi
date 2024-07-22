// de < OTDataGrid >
/* 
	const loadData = (data) => {
		// const newData = [...rows, { id: rows.length + 1, data }];
		// setRows(newData);
		const newData = [...renglonot, { id: renglonot.length + 1, data }];
		setRenglonot(newData);
	};

	const handleRowSelect = ({ row }) => {
		setRowSel(row);
	};

const handleChange = (event) => {
		const id = event.target.id;
		setOTdatos({ ...otdatos, [id]: event.target.value });
	};

*/
// if (datosgenot !== "") {
// 	newRow.DatosConf = JSON.stringify(datosgenot);
// } else {
// setSnackbar({
// 	children: "Modificado no confirmado",
// 	severity: "success",
// });

//zotdatos.renglonespresup.splice(newRow.id, 1, newRow);

// otdatos.renglonespresup.map((primer) => {
// 	primer.map((segundo) => {
// 		segundo.id === newRow.id && (segundo = newRow);
// 		console.log("segundo  ", segundo);
// 		setOTdatos({ ...otdatos, renglonespresup: segundo });
// 	});
// });

//setOTdatos({ ...otdatos, renglonpresup: newRow });

// </OTDataGrid >

//OTGenera
// const mostrarElementos = arreglodef.map((elemento) => {
// 	const nombresPropiedades = Object.keys(elemento);
// 	return (
// 		<div key={elemento.id}>
// 			{nombresPropiedades.map((nombrePropiedad, index) => (
// 				<CampoDinamico
// 					key={nombrePropiedad}
// 					dato={elemento[nombrePropiedad]}
// 					nombre={nombrePropiedad}
// 					indice={index}
// 				/>
// 			))}
// 		</div>
// 	);
// });

// <div className={estilos.contenedor}>
// 	{/* <TablaDinamica arregloDef={arreglodef}></TablaDinamica> */}
// 	<span className={estilos.contenedordiv}>Cant</span>

// 	<span className={estilos.contenedordiv}>Descripción</span>

// 	<span className={estilos.contenedordiv}>Largo</span>

// 	<span className={estilos.contenedordiv}>Ancho</span>

// 	<span className={estilos.contenedordiv}>Imp.Item</span>
// 	{mostrarElementos}
// </div>

//CampoMuestra
// style: {
// 	minWidth: calculateMinWidth(
// 		elemento[nombrePropiedad]
// 	),
// 	maxWidth: calculateMaxWidth(
// 		elemento[nombrePropiedad]
// 	),
// },

import printJS from "print-js";

export default function ImprimirPantalla({ datos, properties }) {

	printJS({
		maxWidth: 800,
		properties: properties,
		scanStyles: false,
		printable: datos,
		type: "json",
		header: '<h3 class="custom-h3">My custom header</h3>',
		onPrintDialogClose: () => {
			console.log("El cuadro de impresión se ha cerrado")
		},

	});
}

// const handleClose = () => {
// 	setImprimirTF(false);
// };
// onPrintDialogClose: () => props.handleClose(),
// gridStyle: "border: 2px solid #3971A5;background: blue",
// style: "background: blue",
import printJS from "print-js";

export default function (props) {
	printJS({
		maxWidth: 800,
		properties: props.properties,
		scanStyles: false,
		printable: props.datos,
		type: "json",
		header: '<h3 class="custom-h3">My custom header</h3>',
		onPrintDialogClose: () => props.handleClose(),
		// gridStyle: "border: 2px solid #3971A5;background: blue",
		// style: "background: blue",
	});
}

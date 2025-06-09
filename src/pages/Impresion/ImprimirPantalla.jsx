import React, { useEffect } from "react";
import printJS from "print-js";

export default function ImprimirPantalla({ datos, open, properties, onClose }) {
	useEffect(() => {
		if (open && properties.length > 0) {
			printJS({
				maxWidth: 800,
				properties: properties,
				scanStyles: false,
				printable: datos,
				type: "json",
				header: '<h3 class="custom-h3">My custom header</h3>',
				onPrintDialogClose: () => {
					onClose(); // se cierra correctamente al terminar
				},
			});
		}
	}, [open, properties, datos, onClose]);

	return null;
}


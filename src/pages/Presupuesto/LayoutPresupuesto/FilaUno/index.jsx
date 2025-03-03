import FilaUnoIzq from "./FilaUnoIzq";
import TipoCliente from "./TipoCliente";
import TipoIVA from "./TipoIVA";
import TipoProducto from "./TipoProducto";

export default function FilaUno() {
	return (
		<>
			<TipoCliente />
			<TipoIVA />
			<TipoProducto />
			<FilaUnoIzq />
		</>
	);
}

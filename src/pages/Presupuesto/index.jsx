import FilaDos from "./LayoutPresupuesto/FilaDos/FilaDos.jsx";
import Grid from "@mui/material/Grid";
import TipoCliente from "./LayoutPresupuesto/FilaUno/TipoCliente.jsx";
import TipoIVA from "./LayoutPresupuesto/FilaUno/TipoIVA.jsx";
import TipoProducto from "./LayoutPresupuesto/FilaUno/TipoProducto.jsx";
import FilaUnoIzq from "./LayoutPresupuesto/FilaUno/FilaUnoIzq.jsx";
import FilaPrincipal from "./LayoutPresupuesto/FilaPrincipal/FilaPrincipal.jsx";
export default function Presupuesto() {
	return (
		<>
			<Grid container spacing={2} alignItems="center" padding={2} >
				<TipoCliente />
				<TipoIVA />
				<TipoProducto />
				<FilaUnoIzq />
				<FilaDos />
				{/* <FilaPrincipal /> */}

			</Grid>
		</>
	);
}

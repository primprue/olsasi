import { Grid, Stack } from "@mui/material";
import FilaUnoIzq from "./FilaUnoIzq";
import TipoCliente from "./TipoCliente";
import TipoIVA from "./TipoIVA";
import TipoProducto from "./TipoProducto";

export default function FilaUno() {
	return (
		<>
			{/* <Grid
				container
				spacing={3}
				// alignItems="flex-end"
				direction="row"
				// justify="center"
				padding={3}
				alignItems="center"
				// xs={12}
			> */}
			{/* <Grid item xs={2}> */}
			<TipoCliente />
			<TipoIVA />
			<TipoProducto />
			<FilaUnoIzq />
			{/* </Grid> */}
			{/* </Grid> */}
		</>
	);
}

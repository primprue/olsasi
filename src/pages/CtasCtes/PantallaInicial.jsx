import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useContext } from "react";
import CtasCtesContext from "../../context/CtasCtesContext.jsx";
// import { ConectaAfip } from "./AFIP/ConectaAfip.jsx";
import BuscaCompAfip from "./AFIP/BuscaCompAfip.jsx";
import ParamComp from "./Tablas/ParamComp/index.jsx";
import { Label } from "@mui/icons-material";
import Facturacion from "./Facturacion/index.jsx";
export default function PantallaInicial() {
	const { fcdatos, setFCdatos } = useContext(CtasCtesContext);
	//Obtener tipos de comprobantes disponibles
	// async function compdisp() {
	// 	const voucherTypes = await afip.ElectronicBilling.getVoucherTypes();
	// 	console.log("Comprobantes disponibles  ", voucherTypes);
	// }
	// function LlamaPI() {
	// 	<BuscaCompAfip></BuscaCompAfip>;
	// }
	// function LlamaParam() {
	// 	<ParamComp></ParamComp>;
	// }
	return (
		<Box
			sx={{
				width: "100%",
				align: "center",
				justifycontent: "center",
				boxShadow: 5,
				padding: 5,
			}}
		>
			{fcdatos.nroordafac.id !== undefined && (
				<Facturacion />
				// <pre>{JSON.stringify(fcdatos, null, 2)}</pre>
			)}
			{/* <Button onClick={ConectaAfip}>ConectaAfip</Button> */}
			{/* <Button onClick={LlamaParam}>ParamComp</Button> */}
			{/* <ParamComp></ParamComp> */}
			{/* <BuscaCompAfip></BuscaCompAfip>; */}
		</Box>
	);
}

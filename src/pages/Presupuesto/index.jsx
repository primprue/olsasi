import React from "react";

import { useEffect } from "react";

import { useContext } from "react";
import StaticContexto from "../../context/StaticContext.jsx";
import PresupPant from "../../context/PresupPant";
import FilaUno from "./LayoutPresupuesto/FilaUno/index.jsx";
import FilaDos from "./LayoutPresupuesto/FilaDos/FilaDos.jsx";
export default function Presupuesto() {
	const { state, setState } = useContext(PresupPant);
	const { valor, setValor } = useContext(StaticContexto);

	useEffect(() => {
		setValor("Presupuestos");
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<FilaUno />
			<FilaDos />
		</>
	);
}

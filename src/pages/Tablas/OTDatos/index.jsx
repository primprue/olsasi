import React from "react";

import { useEffect } from "react";

import { useContext } from "react";
import StaticContexto from "../../../context/StaticContext.jsx";
import OTDatosForm from "./OTDatosForm.jsx";
export default function OTDatos() {
	const { valor, setValor } = useContext(StaticContexto);


	useEffect(() => {
		setValor("OTDatos");

	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<OTDatosForm />
		</>
	);
}

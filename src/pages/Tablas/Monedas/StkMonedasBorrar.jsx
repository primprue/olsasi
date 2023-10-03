import request from "superagent";
import MuestraMensaje from "../../../components/lib/MuestraMensaje";
import IpServidor from "../../VariablesDeEntorno";

// import "react-table/react-table.css";

export function StkMonedasBorrar(props) {
	const { idStkMonedas } = props;
	const url = IpServidor + "/stkmonedasborrar/?id=" + idStkMonedas;
	request
		.delete(url)
		.set("Content-Type", "application/json")
		.then(function (res) {
			MuestraMensaje(res);
		})
		.catch((err) => MuestraMensaje(err));
}

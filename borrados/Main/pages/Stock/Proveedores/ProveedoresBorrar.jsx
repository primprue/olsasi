import request from "superagent";
// import ReactTable from 'react-table'
// import "react-table/react-table.css";

import IpServidor from "../../VariablesDeEntorno";
import MuestraMensaje from "../../../../lib/Mensaje";

export function ProveedoresBorrar(props) {
	return new Promise(function () {
		const { id } = props;
		const url = IpServidor + "/proveedoresborrar/" + id;
		request
			.delete(url)
			.set("Content-Type", "application/json")
			.then(function (res) {
				MuestraMensaje(res);
			})
			.catch((err) => MuestraMensaje(err));
	});
}

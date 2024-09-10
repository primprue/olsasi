import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
// import { resolveTypeReferenceDirective } from 'typescript';

export function TransporteLeerCod(props) {
	var id = props;

	return new Promise(function (resolve) {
		const url = IpServidor + "/transporteleercod/?id=" + id;
		request
			.get(url)
			.set("Content-Type", "application/json")
			.then((res) => {
				const transporte = JSON.parse(res.text);
				resolve(transporte);
			});
	});
}

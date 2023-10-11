import IpServidor from '../../../../VariablesDeEntorno'
import request from "superagent";

export default function filaanexosData() {
    return new Promise(function (resolve) {
        const url = IpServidor + "/presupconftipoleeanexo/?anexo=" + 'nS';
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const filaanexosdata = JSON.parse(res.text);
                resolve(filaanexosdata);
            });
    });
}


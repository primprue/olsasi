import request from "superagent";
import IpServidor from "../VariablesDeEntorno.js";


export const copiafact = () => {

    return new Promise(resolve => {
        // setTimeout(() => {
        const url = IpServidor + "/copiafact";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then(res => {
                console.log('res  ', res)
                resolve(res.text);
                console.log('res.text  ', res.text)
            });
        // }, 2000);
    });
}

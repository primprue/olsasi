import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

export function presupdetpieData() {
    return new Promise(function (resolve) {
        const url = IpServidor + "/presupdetpieleer";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const presupdetpie = JSON.parse(res.text);
                resolve(presupdetpie);
                //.catch() //Todo: agregar el catch error.

            });
    });
}

import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Lee Rubro por codigo de gupo

export const PBSubRubrosLeer = () => {

    return new Promise(resolve => {
        const url = IpServidor + "/pbsubrubrosleer";
        console.log('url', url)
        request
            .get(url)
            .set("Content-Type", "application/json")
            .set("Cache-Control", "no-cache")
            .then(res => {
                const subrubros = JSON.parse(res.text);
                resolve(subrubros);
            });
    });
};

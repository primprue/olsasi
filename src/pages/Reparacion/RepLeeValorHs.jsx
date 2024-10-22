import React from 'react'
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import MuestraMensaje from "../../components/lib/MuestraMensaje";


export const RepLeeValorHs = () => {
    return new Promise((resolve) => {
        const url = IpServidor + "/repleevalorhs";
        request
            .get(url)
            .set("Content-Type", "application/json")
            .then((res) => {
                const paramrep = JSON.parse(res.text);
                resolve(paramrep);
            })
            .catch((err) => MuestraMensaje(err));
    });
};


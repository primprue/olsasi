import request from "superagent";
import IpServidor from '../VariablesDeEntorno';

// Lee Rubro por codigo de gupo

export const leelistaprecios = () => {
  return new Promise(resolve => {
    const url =  IpServidor + '/listaprecios'
    
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const listaprecios = JSON.parse(res.text)
        resolve(listaprecios);
      })
        });
};

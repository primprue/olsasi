import { presupDetPieBorrar } from "./presupDetPieBorrar";

export function onRowDelete(oldData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            presupDetPieBorrar(oldData);
            resolve();
        }, 1000);
    });
}

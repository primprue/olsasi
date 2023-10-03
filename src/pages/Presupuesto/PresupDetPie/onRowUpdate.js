import { presupDetPieModificar } from "./presupDetPieModificar";

export function onRowUpdate(newData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            presupDetPieModificar(newData);
            resolve();
        }, 1000);
    });
}

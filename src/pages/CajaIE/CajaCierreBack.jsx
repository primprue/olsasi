
import { Dialog } from '@mui/material';
import TextFieldComunChico from '../../components/comppropios/TextFieldComunChico';
import React from 'react';

export default function CajaCierreBack({ rows, onClose }) {
    return new Promise(function () {
        setTimeout(() => {
            const { rows } = props;

            const url = IpServidor + "/cajacierre";
            request
                .post(url)
                .set("Content-Type", "application/json")
                .send({ rows: rows })
                .set("X-API-Key", "foobar")
                .then((res) => {
                    MuestraMensaje(res);
                })
                .catch((err) => {
                    MuestraMensaje(err);
                });
        }, 300);
    });
    // return (
    //     <Dialog open={true} onClose={onClose}>
    //         <TextFieldComunChico />
    //         <div>CajaCierre {JSON.stringify(rows)}</div>
    //     </Dialog>
    // );
}

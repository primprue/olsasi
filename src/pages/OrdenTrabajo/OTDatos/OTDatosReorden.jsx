import React from 'react'
import { useEffect } from "react";
import { useState } from "react";

import { use } from "react";
import PresupPant from "../../../context/PresupPant.jsx";
import { Button, Dialog } from '@mui/material';
import formdata from "./formdata.js";
import estilotabla from "../../../Styles/Tabla.module.css";
import { llenarcolumns } from './colreorden.jsx';
import { OTDatosReordenTabla } from './OTDatosReordenTabla.jsx';

export default function OTDatosReorden(props) {
    const { open, handleClose, datosreorden } = props;
    // const { otdatos, setOTdatos } = use(OrdTrabajo);
    const { state, setState } = use(PresupPant);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const backend = 'otdatosreordentabla';
    const arrayModificado = datosreorden.map(({ idOTDatos, ...resto }) => ({
        id: idOTDatos,
        ...resto
    }));
    const [campos, setCampos] = useState(arrayModificado);

    async function columnsFetch() {
        var col = await llenarcolumns();
        setColumns(col);
    }

    async function initialFetch() {
        columnsFetch();
        // setRows(datosreorden);
    }

    useEffect(() => {
        initialFetch();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // Guardamos el índice del elemento que se está arrastrando
    const [indiceArrastrado, setIndiceArrastrado] = useState(null);

    // 2. Evento: Cuando empieza el arrastre
    const handleDragStart = (index) => {
        setIndiceArrastrado(index);
    };

    // 3. Evento: Cuando pasas por encima de otra fila (obligatorio preventDefault)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 4. Evento: Cuando se suelta el elemento sobre una fila destino
    const handleDrop = (indiceDestino) => {
        if (indiceArrastrado === null || indiceArrastrado === indiceDestino) return;

        // Clonamos el array original para no mutar el estado directamente
        const copiaCampos = [...campos];

        // Removemos el elemento de su posición original
        const [elementoMovido] = copiaCampos.splice(indiceArrastrado, 1);

        // Lo insertamos en la nueva posición de destino
        copiaCampos.splice(indiceDestino, 0, elementoMovido);

        // Actualizamos el estado de React (la pantalla se reordena sola)
        setCampos(copiaCampos);
        setIndiceArrastrado(null);

        // Mandamos el nuevo orden a guardar en la base de datos de MySQL
        guardarNuevoOrdenEnBD(copiaCampos);
    };
    // Función ficticia para enviar los datos a tu API / Backend
    const guardarNuevoOrdenEnBD = (listaOrdenada) => {
        // Generamos un mapeo simple de cómo quedó el orden de los IDs
        const ordenIds = listaOrdenada.map((campo, index) => ({
            OTDatosOrdenAparicion: campo.OTDatosOrdenAparicion,
            nuevo_orden: index + 1,// El orden empieza en 1 para tu BD
            id: campo.id
        }));

        console.log("Enviar esto a MySQL mediante Axios/Fetch:", ordenIds);
        const vaareordenar = OTDatosReordenTabla(ordenIds, backend);


    };


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={false}
                fullWidth={true}

            >
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5', textAlign: 'left' }}>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>idOTDatos</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>OTDatosOrdenAparicion</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>OTDatosDesc</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>OTDatosTipoPed</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>opcion</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>OTDatosRequerido</th>
                            <th style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>OTDatosAncho</th>

                        </tr>
                    </thead>
                    <tbody>
                        {campos.map((campo, index) => (
                            <tr
                                key={campo.idOTDatos}
                                draggable // Hace la fila arrastrable nativamente
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(index)}
                                style={{
                                    cursor: 'grab',
                                    backgroundColor: indiceArrastrado === index ? '#f0f0f0' : 'white',
                                    opacity: indiceArrastrado === index ? 0.5 : 1,
                                    borderBottom: '1px solid #eee',
                                    transition: 'background-color 0.2s'
                                }}
                            >
                                <td style={{ padding: '10px' }}>{campo.idOTDatos}</td>
                                <td style={{ padding: '10px', fontWeight: 'bold' }}>{campo.OTDatosOrdenAparicion}</td>
                                <td style={{ padding: '10px' }}>{campo.OTDatosDesc}</td>
                                <td style={{ padding: '10px' }}>{campo.OTDatosTipoPed}</td>
                                <td style={{ padding: '10px' }}>{campo.OTDatosDesc}</td>
                                <td style={{ padding: '10px' }}>{campo.opcion}</td>
                                <td style={{ padding: '10px' }}>{campo.OTDatosRequerido}</td>
                                <td style={{ padding: '10px' }}>{campo.OTDatosAncho}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </Dialog>
        </>
    )
}


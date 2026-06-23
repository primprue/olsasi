

import { useState } from "react";
import { clientesleerdescmayigual } from "../Tablas/Clientes/ClientesLeerDesc";

import { Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from 'react';
import TextFieldSelect from "../../components/comppropios/TextFieldSelect";
import PresupPant from "../../context/PresupPant.jsx";
import { MedClileerCodFac } from "./MedClileerCodFac.jsx";
import BotonComun from "../../components/comppropios/BotonComun.jsx";
export default function BuscadorMedidasClientes() {
    const { state, setState } = useState([]);
    const [clientes, setClientes] = useState([]);
    const [idClientes, setIdClientes] = useState('');
    const [clienteeleg, setClienteeleg] = useState('');
    const handleChange = (event) => {
        const id = event.target.id;
        setClientes({ ...state, [id]: event.target.value });
    };
    async function clientesleerdescrip() {
        const result = await clientesleerdescmayigual('');
        setClientes(result);
    }

    useEffect(() => {
        clientesleerdescrip();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const textdata = useMemo(() => {

        if (clientes.length === 0) return []

        return [{
            id: "idClientes",
            label: "Cliente",
            value: idClientes,
            options: clientes.map((option) => ({
                value: option.idClientes,
                label: option.ClientesDesc
            }))
        }];
    }, [clientes, idClientes]);

    async function traeDatosClientesMedidas() {
        const res = await MedClileerCodFac(clienteeleg, 'medclileercodfac');
        console.log('res traeDatosClientesMedidas ', res)
        // setIdClientes(id);
        // setState({ ...state, idClientes: id });
    }
    const [selectedValues, setSelectedValues] = useState({});
    const handleSelectChange = (value, id) => {
        setClienteeleg(value);
    };
    return (
        <>
            <Grid container size={{ xs: 1 }}>
                {textdata.length > 0 ? (
                    textdata.map(({ id, label, value, options }, index) => (
                        <TextFieldSelect
                            key={index}
                            id={id}
                            label={label}
                            value={selectedValues[id] ?? value ?? ''}
                            onChange={handleSelectChange}
                            options={options}
                            width="350px"
                        />
                    ))) : ('')}
            </Grid>

            <BotonComun
                disabled={clienteeleg === ''}
                onClick={() => traeDatosClientesMedidas()}
                texto="Leer"
            />
        </>
    );
}
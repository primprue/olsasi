

import { useState } from "react";
import { clientesleerdescmayigual } from "../Tablas/Clientes/ClientesLeerDesc";
import useStyles from "./styles.module.css";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from 'react';
import TextFieldSelect from "../../components/comppropios/TextFieldSelect";
import PresupPant from "../../context/PresupPant.jsx";
export default function PantallaScanear() {
    const { state, setState } = useState([]);
    const [clientes, setClientes] = useState([]);
    const [idClientes, setIdClientes] = useState('');
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

    const [selectedValues, setSelectedValues] = useState({});
    const handleSelectChange = (value, id) => {
        console.log('value  ', value)
        console.log('id  ', id)

    };
    const classes = useStyles;
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

        </>
    );
}


import { use, useState } from "react";
import { clientesleerdescmayigual } from "../Tablas/Clientes/ClientesLeerDesc";

import { Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useMemo } from 'react';
import TextFieldSelect from "../../components/comppropios/TextFieldSelect";
import PresupPant from "../../context/PresupPant.jsx";
import BotonComun from "../../components/comppropios/BotonComun.jsx";
import IndexTablas from "../../components/IndexTablas.jsx";
import formdata from "../Tablas/MedCli/formdata.js"
import TablasContexto from "../../context/TablasContext.jsx";
import MedCliTablaMedidas from "./MedCliTablaMedidas.jsx";
import Scanner from "../Scanear/Scanner.jsx";
import { DatosLeer } from "../../components/DatosLeer.jsx";
import MedCliAltaMed from "./MedCliAltaMed.jsx";
import estilo from "../../Styles/Boton.module.css";
import { MedCliConvertidor } from "./MedCliConvertidor.jsx";
export default function BuscadorMedidasClientes() {
    const { formdatos, setFormdatos } = use(TablasContexto);
    const [clientes, setClientes] = useState([]);
    const [idClientes, setIdClientes] = useState('');
    const [clienteeleg, setClienteeleg] = useState('');
    const [llamamedcli, setLlamamedcli] = useState(false);
    const [traenroot, setTraenroot] = useState(false);
    const [datoot, setDatoot] = useState('');
    const [open, setOpen] = useState(false);
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


    const cambiaback = (clienteeleg) => {
        // formdata.nombackleer = `medclileercodfac?id=${clienteeleg}`;

        setLlamamedcli(true);
    };

    //medclileerultot
    async function scanear(clienteeleg) {
        formdata.nombackleer = `medclileerultot?id=${clienteeleg}`;
        const informacion = await DatosLeer(formdata.nombackleer);
        setDatoot(informacion);
        setTraenroot(true);
    };
    const [selectedValues, setSelectedValues] = useState({});
    const handleSelectChange = (value, id) => {
        setClienteeleg(value);

    };

    useEffect(() => {
        formdata.datocampo = clienteeleg; //esto se carga en formdata para que lo use en DialogoDatos
        setFormdatos(formdata); // se carga en formdata para que lo use en DialogoDatos
    }, [clienteeleg]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose = () => {

        setTraenroot(false);
    };

    return (
        <>
            <Grid container spacing={2} alignItems="center" padding={2}>
                <Grid xs={2}  >
                    <Button
                        variant="contained"
                        className={estilo.botonocultoactivaconmouse}
                        onClick={() => MedCliConvertidor()}
                    >
                        ojo!
                    </Button>
                </Grid>
                <Grid xs={2}  >
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
                <Grid xs={2}  >
                    <BotonComun
                        disabled={clienteeleg === ''}
                        onClick={() => cambiaback(clienteeleg)}
                        texto="Consultar"
                    />
                </Grid>
                <Grid xs={2}  >
                    <BotonComun
                        disabled={clienteeleg === ''}
                        onClick={() => scanear(clienteeleg)}
                        texto="Scanear"
                    />
                </Grid>
            </Grid>
            {/* {llamamedcli && <IndexTablas rutaRelativa="MedCli" />} */}
            {llamamedcli && <MedCliTablaMedidas clienteeleg={clienteeleg} />}
            {traenroot && <MedCliAltaMed
                open={traenroot}
                handleClose={handleClose}
                datoot={datoot} />}

        </>
    );
}
import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { CurrencyTextField } from '../../hooks/useCurrencyTextField';
import { Button, Input } from '@mui/material';
import estilo from "../../Styles/Reparacion.module.css";
const CustomToolbarMot1 = ({ sumaMot1, cargaMot1, thsMot1, tminMot1 }) => {
    return (
        <GridToolbarContainer >
            <div>
                <CurrencyTextField
                    id="Total"
                    size="small"
                    label="Total"
                    value={sumaMot1}
                    className={estilo.tfcurrency}
                ></CurrencyTextField>
            </div>
            <div>
                <Input
                    id="THosMOT1"
                    size="small"
                    value={thsMot1}
                    className={estilo.tfield}
                ></Input>
                <a>:</a>
                <Input
                    id="TMinMOT1"
                    size="small"
                    value={tminMot1}
                    className={estilo.tfield}

                ></Input>

                <Button className={estilo.botonabredialogo} onClick={() => cargaMot1()}>MOT.1</Button>
            </div>
        </GridToolbarContainer>
    );
}


export default CustomToolbarMot1;

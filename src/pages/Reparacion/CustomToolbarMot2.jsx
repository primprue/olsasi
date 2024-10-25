import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { CurrencyTextField } from '../../hooks/useCurrencyTextField';
import { Button, Input } from '@mui/material';
import estilo from "../../Styles/Reparacion.module.css";
const CustomToolbarMot2 = ({ sumaMot2, cargaMot2, thsMot2, tminMot2 }) => {
    return (
        <GridToolbarContainer >
            <div>
                <CurrencyTextField
                    id="Total"
                    size="small"
                    label="Total"
                    value={sumaMot2}
                    className={estilo.tfcurrency}
                ></CurrencyTextField>
            </div>
            <div>
                <Input
                    id="THosMOT2"
                    size="small"
                    value={thsMot2}
                    className={estilo.tfield}
                ></Input>
                <a>:</a>
                <Input
                    id="TMinMOT2"
                    size="small"
                    value={tminMot2}
                    className={estilo.tfield}

                ></Input>

                <Button className={estilo.botonabredialogo} onClick={() => cargaMot2()}>MOT.2</Button>
            </div>
        </GridToolbarContainer>
    );
}


export default CustomToolbarMot2;

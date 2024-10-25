// CustomDataGrid.jsx
import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { CurrencyTextField } from '../../hooks/useCurrencyTextField';
import { Button } from '@mui/material';
import estilo from "../../Styles/Reparacion.module.css";
const CustomToolbarVarios = ({ sumaVarios, cargavarios }) => {

    return (
        <GridToolbarContainer >

            <CurrencyTextField
                id="Total"
                size="small"
                label="Total"
                value={sumaVarios}
                className={estilo.tfcurrency}
            ></CurrencyTextField>

            <Button className={estilo.botonabredialogo} onClick={() => cargavarios()}>Varios</Button>
        </GridToolbarContainer>
    );
}


export default CustomToolbarVarios;

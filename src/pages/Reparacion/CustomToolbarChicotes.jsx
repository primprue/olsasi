// CustomDataGrid.jsx
import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { CurrencyTextField } from '../../hooks/useCurrencyTextField';
import { Button } from '@mui/material';
import estilo from "../../Styles/Reparacion.module.css";
const CustomToolbarChicotes = ({ sumaChicotes, cargachicotes }) => {

    return (
        <GridToolbarContainer >

            <CurrencyTextField
                id="Total"
                size="small"
                label="Total"
                value={sumaChicotes}
                className={estilo.tfcurrency}
            ></CurrencyTextField>

            <Button className={estilo.botonabredialogo} onClick={() => cargachicotes()}>Chicotes</Button>
        </GridToolbarContainer>
    );
}


export default CustomToolbarChicotes;

// CustomDataGrid.jsx
import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { CurrencyTextField } from '../../hooks/useCurrencyTextField';
import estilo from "../../Styles/Reparacion.module.css";
const CustomToolbarParchEleg = ({ sumaParcheleg }) => {

    return (
        <GridToolbarContainer >

            <CurrencyTextField
                id="Total"
                size="small"
                label="Total"
                value={sumaParcheleg}
                className={estilo.tfcurrency}
            ></CurrencyTextField>

        </GridToolbarContainer>
    );
}


export default CustomToolbarParchEleg;

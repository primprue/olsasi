import React from "react";
import { NumericFormat } from 'react-number-format';
export function CurrencyTextField (props){
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumericFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator={true}
        prefix={'$ '} // Puedes cambiarlo según tu moneda
      />
    );
  };
  
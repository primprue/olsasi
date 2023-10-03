import React from "react";


import FilaUnoIzq from "./FilaUnoIzq";
import TipoCliente from "./TipoCliente";
import TipoIVA from "./TipoIVA";
import TipoProducto from "./TipoProducto"

export default function Fila() {
  return (
    <>
      {/* <Grid
        container
        spacing={3}
        // alignItems="flex-end"
        // direction="row"
        // justify="center"
        alignItems="center"
        xs={12}
      > */}
      <TipoCliente />
      <TipoIVA />
      <TipoProducto/>
      <FilaUnoIzq />
    

      {/* </Grid> */}
    </>
  );
}

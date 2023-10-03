import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { globalContext } from "../App";

export function SetGlobals(prop) {
  const { valor, setValor } = useContext(globalContext);
  setValor({ ...valor, prop });
  // return {};
}
//Esto espara setear valores en el global context

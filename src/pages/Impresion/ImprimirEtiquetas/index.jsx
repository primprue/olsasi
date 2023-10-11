import React from "react";

import ImprimirEtiquetas from "./ImprimirEtiquetas";

export default function Index(props) {
    return (
        <>
            <ImprimirEtiquetas open={props.open} />
        </>
    );
}
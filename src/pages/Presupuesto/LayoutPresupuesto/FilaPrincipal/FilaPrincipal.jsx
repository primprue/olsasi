import PresupPantContext from "../../../../context/PresupPant";
import { useContext } from "react";

export default function FilaPrincipal() {
    // Ahora pasas el objeto de contexto correcto
    const contexto = useContext(PresupPantContext);
    const { state, setState } = contexto;
    console.log('state  ', state);

    return (
        <>
            <p>FilaPrincipal</p>
        </>
    );
}
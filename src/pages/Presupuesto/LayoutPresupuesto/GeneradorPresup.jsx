// utilidades/generador.js
// import REACT_APP_API_URL from "../../../../variables.env";
const REACT_APP_API_URL = import.meta.env.VITE_API_URL;
export const GeneradorPresup = (datosParaEnvio, nroPresupuesto1) => {
    const {
        ClienteMayMin, nomClienteElegE, idClienteElegE, condiciones,
        operador, tipoleygral, explicacionPresup,
        productos, leyenda, leyendatanque, totalpresup, totalparacontrolar, nroPresupuesto, tipopresup, sDescripPresup
    } = datosParaEnvio;
    // otracondicion,
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${REACT_APP_API_URL}/generarpdf`;
    // CAMBIO CLAVE: Usa '_blank' para que tu app de React no se "congele" ni se pierda
    form.target = '_blank';

    const agregarCampo = (nombre, valor) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = nombre;
        // Aseguramos que el valor sea string, si es objeto lo convertimos
        input.value = typeof valor === 'object' ? JSON.stringify(valor) : valor;
        form.appendChild(input);
    };

    const nombreLimpio = nomClienteElegE?.trimEnd() || "Cliente";
    const hoy = new Date();
    const f = new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const fechaFormateada = f.format(hoy).replaceAll('/', '-');
    const tituloPresup = nroPresupuesto1 !== 0
        ? `Presupuesto nro ${nroPresupuesto1} ${nombreLimpio} ${fechaFormateada}`
        : 'Vista_PREVIA_Presupuesto';
    let espresupdesc = false;
    if (tipopresup === 'CARGA DESCRIPCION') {
        espresupdesc = true;
    }
    if (sDescripPresup !== null && sDescripPresup !== '') {
        espresupdesc = true;
    }
    agregarCampo('nombrepresup', tituloPresup);
    agregarCampo('fecha', fechaFormateada);
    agregarCampo('ClienteMayMin', ClienteMayMin);
    agregarCampo('nomClienteElegE', nomClienteElegE);
    agregarCampo('idClienteElegE', idClienteElegE);
    agregarCampo('condiciones', condiciones); // El helper ya hace el stringify
    // agregarCampo('otracondicion', otracondicion);
    agregarCampo('operador', operador);
    agregarCampo('tipoleygral', tipoleygral);
    agregarCampo('explicacionPresup', explicacionPresup);
    agregarCampo('productos', productos);
    agregarCampo('nroPresupuesto', nroPresupuesto1); // <--- AGREGA ESTO
    if (totalparacontrolar !== 0) {
        agregarCampo('totalpresup', totalpresup);
    }
    agregarCampo('leyenda', leyenda);
    agregarCampo('leyendatanque', leyendatanque);
    agregarCampo('espresupdesc', espresupdesc);
    agregarCampo('informacion', 'plantillapresup.html');
    document.body.appendChild(form);

    try {
        form.submit();
    } finally {
        // Un pequeño timeout evita que el navegador cancele el envío al borrar el nodo muy rápido
        setTimeout(() => {
            document.body.removeChild(form);
        }, 100);
    }
};



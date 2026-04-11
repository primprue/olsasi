const REACT_APP_API_URL = import.meta.env.VITE_API_URL;
const GeneradorOT = () => {
    // Estos son los datos que quieres enviar
    const datos = {
        numeroOT: "123456789",
        tipoorden: "General",
        dencliente: "Sandra Perez",
        telefono: "(123) 456-7890",
        localidad: "Santiago",
        // Para los productos (arrays), los mandaremos como un string JSON
        productos: JSON.stringify([
            { nombre: "Laptop", precio: 1200 },
            { nombre: "Mouse", precio: 25 }
        ]),
        informacion: 'plantillaot.html'

    };
    // const IpHtml = "http://192.168.2.108:3001"; //IP para prueba en el servidor de notebook
    return (
        <div style={{ padding: '20px' }}>
            <h2>Generar Orden de Trabajo</h2>

            {/* El 'action' es la URL de tu servidor Node */}
            {/* <form action="http://localhost:3001/generarpdf" method="POST" > */}
            <form action={`${REACT_APP_API_URL}/generarpdf`} method="POST">

                {/* Creamos inputs ocultos para que el usuario no los vea, pero se envíen */}
                <input type="hidden" name="numeroOT" value={datos.numeroOT} />
                <input type="hidden" name="tipoorden" value={datos.tipoorden} />
                <input type="hidden" name="dencliente" value={datos.dencliente} />
                <input type="hidden" name="telefono" value={datos.telefono} />
                <input type="hidden" name="localidad" value={datos.localidad} />
                <input type="hidden" name="productos" value={datos.productos} />
                <input type="hidden" name="informacion" value={datos.informacion} />
                <button type="submit" style={{ cursor: 'pointer', padding: '10px' }}>
                    DESCARGAR PDF
                </button>
            </form>

        </div>
    );
};

export default GeneradorOT;
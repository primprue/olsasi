import React, { useState } from 'react';
import { format } from "date-fns";
import PideFechas from '../../components/comppropios/PideFechas';
import { PBListaMovpSubRubro } from './PBListaMovpSubRubro';
import { GeneradorListMSR } from './GeneradorListMSR';

export default function PBListaMov() {
    const [modalOpen, setModalOpen] = useState(true);

    // Los estados viven aquí, en el padre
    const [fechaDesde, setFechaDesde] = useState(format(new Date(), "yyyy-MM-dd"));
    const [fechaHasta, setFechaHasta] = useState(format(new Date(), "yyyy-MM-dd"));

    async function handleConsultar() {
        const rows = await PBListaMovpSubRubro(fechaDesde, fechaHasta, 'pblistamovpsubrubro');
    };

    return (
        <div>
            {/* <button onClick={() => setModalOpen(true)}>Abrir Filtro de Fechas</button> */}

            <PideFechas
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                fechaDesde={fechaDesde}
                fechaHasta={fechaHasta}
                setFechaDesde={setFechaDesde}
                setFechaHasta={setFechaHasta}
                onAceptar={handleConsultar}
            />

            <div>
                <h3>Reporte de fechas: {fechaDesde} a {fechaHasta}</h3>
            </div>
        </div>
    );
}
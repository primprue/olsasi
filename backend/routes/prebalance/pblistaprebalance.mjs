import express from "express";
var router = express.Router();
import { genpdfprebalance } from '../impresion/genpdfprebalance.mjs';
import { conexionpool } from '../conexion.mjs';


router.get("/", async (req, res) => {
    const fechahoy = new Date();
    const aniohoy = fechahoy.getFullYear();
    const meshoy = String(fechahoy.getMonth() + 1).padStart(2, '0');
    const diahoy = String(fechahoy.getDate()).padStart(2, '0'); //para que tenga dos dígitos
    const fechahoyn = `${aniohoy}-${meshoy}-${diahoy}`;

    const impVentas = req.query.impVentas;

    //     try {
    //         const modificaventas = await conexionpool.query(
    //     `INSERT INTO BasePreBalance.PBVtas(PBMesV, PBAnioV, PBImporteV, PBFechaV, PBMesCerV)
    //     VALUES(meshoy, aniohoy, impVentas, fechahoy, 'N')
    // ON DUPLICATE KEY UPDATE
    //     PBImporteV = VALUES(impVentas),
    //         PBFechaV = VALUES(fechahoy),
    //         PBMesCerV = VALUES('N')`)


    //La fecha tiene que ser mayor a : si el mes actual es < 4, entonces la fecha debe ser mayor a
    // 31-03-Año actual - 1, sino > 31-03-Año actual
    // const fechaDesde = meshoy < 4 ? `${aniohoy - 1}-03-31` : `${aniohoy}-03-31`;
    // const fechaHasta = meshoy < 4 ? `${aniohoy}-04-01` : fechahoy;
    const fechaDesde = meshoy < 4 ? `${aniohoy - 1}-04-01` : `${aniohoy}-04-01`;
    const fechaHasta = meshoy < 4 ? `${aniohoy}-04-01` : fechahoyn;
    const cerrado = 'N'
    try {
        // const modificaventas =
        //     `INSERT INTO BasePreBalance.PBVtas (PBMesV, PBAnioV, PBImporteV, PBFechaV, PBMesCerV)
        //         VALUES(${meshoy}, ${aniohoy}, ${impVentas}, '${fechahoyn}',  'N')
        //         ON DUPLICATE KEY UPDATE
        //         PBImporteV = VALUES(PBImporteV),
        //         PBFechaV = VALUES(PBFechaV),
        //         PBMesCerV = VALUES(PBMesCerV)`
        // console.log('modificaventas  ', modificaventas)
        // await conexionpool.query(modificaventas)


        const datositems = `SELECT 
                    PBItemsSubRubro, 
                    BasePreBalance.PBSubRubros.PBSubRubroDetalle, 
                    MONTH(PBItemsFecha) AS mes, 
                    SUM(
                        CASE
                        WHEN BasePreBalance.PBComprobantes.PBCompSumaResta = 'S' THEN
                            (PBItemsImp + PBItemsOtros1 + PBItemsOtros2 + PBItemsOtros3 + PBItemsOtros4)
                        WHEN BasePreBalance.PBComprobantes.PBCompSumaResta = 'R' THEN
                            -(PBItemsImp + PBItemsOtros1 + PBItemsOtros2 + PBItemsOtros3 + PBItemsOtros4)
                        ELSE 0
                        END
                    ) AS totalImp,
                    SUM(
                        CASE 
                            WHEN BasePreBalance.PBComprobantes.PBCompSumaResta = 'S' THEN
                            (PBItemsIVA + PBItemsOtros)
                            WHEN BasePreBalance.PBComprobantes.PBCompSumaResta = 'R' THEN
                            (-PBItemsIVA - PBItemsOtros)
                            ELSE 0 
                        END
                    ) AS totalIVA
                FROM BasePreBalance.PBItems
                JOIN BasePreBalance.PBSubRubros 
                    ON BasePreBalance.PBSubRubros.PBidSubRubro = BasePreBalance.PBItems.PBItemsSubRubro
                JOIN BasePreBalance.PBComprobantes
                    ON BasePreBalance.PBComprobantes.PBCompAbre = BasePreBalance.PBItems.PBItemsTipoComp
                WHERE PBItemsFecha >= ? AND PBItemsFecha < ?
                GROUP BY 
                    PBItemsSubRubro, 
                    mes, 
                    BasePreBalance.PBSubRubros.PBSubRubroDetalle
                ORDER BY BasePreBalance.PBSubRubros.PBidSubRubro`;

        const params = [fechaDesde, fechaHasta];
        let [dataitems] = await conexionpool.query(datositems, params);
        const datosventas = `
        SELECT PBImporteV / 1.21 as ImporteVenta, PBMesV, PBAnioV FROM BasePreBalance.PBVtas
            WHERE PBFechaV > ? AND PBFechaV <= ?`;

        const params1 = [fechaDesde, fechaHasta];
        const [dataventas] = await conexionpool.query(datosventas, params1);

        const datosivapag = `
        SELECT   PBIVAPagIMP , month(PBidIVAPagFecha) as mesivapag, year(PBidIVAPagFecha) as anioivapag  from BasePreBalance.PBIVAPag
            WHERE PBidIVAPagFecha > ? AND PBidIVAPagFecha <= ?`;

        const [dataivapag] = await conexionpool.query(datosivapag, params);

        const mesesOrden = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
        // 1. Agrupar los datos de los rubros
        const agrupadoPorRubro = dataitems.reduce((acc, item) => {
            const detalle = item.PBSubRubroDetalle;
            const mes = item.mes;
            const monto = parseFloat(item.totalImp);

            if (!acc[detalle]) {
                acc[detalle] = { detalle, meses: {}, total: 0 };
                mesesOrden.forEach(m => acc[detalle].meses[m] = 0);
            }

            acc[detalle].meses[mes] = monto;
            acc[detalle].total += monto;
            return acc;
        }, {});
        // 2. Calcular el TOTAL IVA por mes
        const totalIVACpras = { detalle: 'IVA Compras', meses: {}, total: 0 };
        mesesOrden.forEach(m => totalIVACpras.meses[m] = 0);
        dataitems.forEach(item => {
            const mes = item.mes;
            const iva = parseFloat(item.totalIVA);
            totalIVACpras.meses[mes] += iva;
            totalIVACpras.total += iva;
        });
        // 2. Calcular el TOTAL Ventas por mes
        const Ventas = { detalle: 'Ventas', meses: {}, total: 0 };
        mesesOrden.forEach(m => Ventas.meses[m] = 0);
        dataventas.forEach(item => {
            const mes = item.PBMesV;
            const venta = parseFloat(item.ImporteVenta);
            Ventas.meses[mes] += venta;
            Ventas.total += venta;
        });

        // 2. Calcular el  Ventas - Gastos por mes
        const totalGastosData = { detalle: 'GASTOS', meses: {}, total: 0 };
        mesesOrden.forEach(m => totalGastosData.meses[m] = 0);
        dataitems.forEach(item => {
            const mes = item.mes;
            const Gastos = parseFloat(item.totalImp);
            totalGastosData.meses[mes] += Gastos;
            totalGastosData.total += Gastos;
        });
        // 3. Calcular la Utilidad (Ventas - Gastos) por mes
        const totalGsVtaData = { detalle: 'Ventas - Gastos', meses: {}, total: 0 };
        const totalIvaVtas = { detalle: 'IVA Ventas', meses: {}, total: 0 };

        mesesOrden.forEach(m => {
            // Restamos el valor de ventas menos el de gastos para cada mes
            const diferenciaMes = Ventas.meses[m] - totalGastosData.meses[m];
            const ivaventas = Ventas.meses[m] * 21 / 100;
            totalGsVtaData.meses[m] = diferenciaMes;
            totalIvaVtas.meses[m] = ivaventas;
            totalIvaVtas.total += ivaventas;
        });

        // El total anual es la diferencia de los totales acumulados
        totalGsVtaData.total = Ventas.total - totalGastosData.total;

        const totalNeto = { detalle: 'Neto', meses: {}, total: 0 };

        mesesOrden.forEach(m => {
            // Restamos el valor de ventas menos el de gastos para cada mes
            const diferenciaMes = totalIvaVtas.meses[m] - totalIVACpras.meses[m];
            totalNeto.meses[m] = diferenciaMes;
            totalNeto.total += diferenciaMes;
        });

        // El total anual es la diferencia de los totales acumulados
        totalGsVtaData.total = Ventas.total - totalGastosData.total;

        // 2. Calcular el TOTAL IVA Pagado por mes
        const IvaPagado = { detalle: 'Iva Pagado', meses: {}, total: 0 };
        mesesOrden.forEach(m => IvaPagado.meses[m] = 0);
        dataivapag.forEach(item => {
            const mes = item.mesivapag;
            const venta = parseFloat(item.PBIVAPagIMP);
            IvaPagado.meses[mes] += venta;
            IvaPagado.total += venta;
        });

        // 3. Unificar todo en la lista final
        const listaFinal = Object.values(agrupadoPorRubro);
        listaFinal.push(totalGastosData); // Agregamos la fila de Gastos al final
        listaFinal.push(totalGsVtaData); // Agregamos la fila de Ventas - Gastos al final
        listaFinal.push(totalIvaVtas); // Agregamos la fila de IVA al final
        listaFinal.push(totalIVACpras); // Agregamos la fila de IVA al final
        listaFinal.push(totalNeto); // Agregamos la fila de Ventas al principio
        listaFinal.unshift(Ventas); // Agregamos la fila de Ventas al principio
        listaFinal.push(IvaPagado); // Agregamos la fila de IVA Pagado al principio


        // 4. Generar PDF y responder
        const nombreArchivo = await genpdfprebalance(listaFinal, fechaDesde, fechaHasta);
        return res.json({ success: true, archivo: nombreArchivo });

    } catch (err) {
        console.error("Error en el proceso:", err);
        if (err.errno === 1062) return res.status(460).json({ message: "Clave duplicada" });

        return res.status(500).json({
            leyenda: "Error interno del servidor",
            error: err.message
        });
    }
});
export default router;


SELECT 
    JSON_OBJECTAGG(fecha, TotalesPorMoneda) AS TotalesPorFecha
FROM (
    SELECT 
        fecha,
        JSON_OBJECTAGG(
            moneda, 
            JSON_OBJECT('conceptos', conceptosDetalle)
        ) AS TotalesPorMoneda
    FROM (
        SELECT 
            fecha,
            moneda,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                     'concepto', t.concepto,
                    'detconepto', t.detconepto,
                    'moneda', t.moneda,
                    'totalM', t.totalM,
                    'totalT', t.totalT,
                    'totalInstr', t.totalInstr,
                    'totalTEfvo', t.totalT - t.totalInstr
                    -- 'totalMEsp', t.totalM + t.totalT - t.totalInstr
                )
            ) AS conceptosDetalle
        FROM (
            SELECT 
                DATE(c.CajaIEFecha) AS fecha,
                c.CajaIEMoneda AS moneda,
                c.CajaIEConcepto AS concepto,
                p.CajaCPDesc AS detconepto,
                SUM(CASE WHEN c.CajaIEMT = 'M' THEN c.CajaIEImporte ELSE 0 END) AS totalM,
                SUM(CASE WHEN c.CajaIEMT = 'T' THEN c.CajaIEImporte ELSE 0 END) AS totalT,
                SUM(CASE WHEN c.CajaIEMT = 'T' AND c.CajaIEImpIP <> 0 AND c.CajaIECodIP <> 'EFC' THEN c.CajaIEImpIP ELSE 0 END) AS totalInstr
            FROM BaseCaja.CajaIE c
            INNER JOIN BaseCaja.CajaCP p ON p.idCajaCP = c.CajaIEConcepto
            -- EL FILTRO CRÍTICO AQUÍ:
            WHERE c.CajaIEFecha >= ? 
              AND c.CajaIEFecha <= ?
            GROUP BY DATE(c.CajaIEFecha), c.CajaIEMoneda, c.CajaIEConcepto
        ) t
        GROUP BY fecha, moneda
    ) t2
    GROUP BY fecha
) final;
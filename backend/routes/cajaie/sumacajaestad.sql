
SELECT JSON_OBJECTAGG(
        moneda,
        JSON_OBJECT(
            'saldoEf', saldoEf, -- El saldo es general de la moneda
            'conceptos', conceptosDetalle
        )
    ) AS TotalesPorMoneda
FROM (
    SELECT 
        t.moneda,
        t.saldoEf,
        -- Agrupamos todos los conceptos de esta moneda en un array de objetos JSON
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'concepto', t.concepto,
                'totalM', t.totalM,
                'totalT', t.totalT,
                'totalInstr', t.totalInstr,
                'totalTSinInstr', t.totalT - t.totalInstr,
                'totalMEsp', t.totalM + t.totalT - t.totalInstr + t.saldoEf
            )
        ) AS conceptosDetalle
    FROM (
        SELECT 
            c.CajaIEMoneda AS moneda,
            c.CajaIEConcepto AS concepto, -- Asumo que así se llama tu campo
            SUM(CASE WHEN c.CajaIEMT = 'M' AND DATE(c.CajaIEFecha) BETWEEN ? AND ? THEN c.CajaIEImporte ELSE 0 END) AS totalM,
            SUM(CASE WHEN c.CajaIEMT = 'T' AND DATE(c.CajaIEFecha) BETWEEN ? AND ? THEN c.CajaIEImporte ELSE 0 END) AS totalT,
            SUM(CASE WHEN c.CajaIEMT = 'T' AND c.CajaIEImpIP <> 0 AND c.CajaIECodIP <> 'EFC' AND DATE(c.CajaIEFecha) BETWEEN ? AND ? THEN c.CajaIEImpIP ELSE 0 END) AS totalInstr,
            COALESCE(s.CajaSaldoEfImporte, 0) AS saldoEf
        FROM BaseCaja.CajaIE c
        LEFT JOIN (
            -- Subconsulta de saldo (se mantiene igual)
            SELECT x.CajaSaldoEfMoneda, x.CajaSaldoEfImporte
            FROM BaseCaja.CajaSaldoEf x
            INNER JOIN (
                SELECT CajaSaldoEfMoneda, MAX(idCajaSaldoEfFecha) AS ultFecha
                FROM BaseCaja.CajaSaldoEf
                GROUP BY CajaSaldoEfMoneda
            ) y ON x.CajaSaldoEfMoneda = y.CajaSaldoEfMoneda AND x.idCajaSaldoEfFecha = y.ultFecha
        ) s ON s.CajaSaldoEfMoneda = c.CajaIEMoneda
        -- Agrupamos por MONEDA y por CONCEPTO
        GROUP BY c.CajaIEMoneda, c.CajaIEConcepto, s.CajaSaldoEfImporte
    ) t
    GROUP BY t.moneda, t.saldoEf
) final;
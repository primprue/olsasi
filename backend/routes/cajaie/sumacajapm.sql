SELECT JSON_OBJECTAGG(
           moneda,
           JSON_OBJECT(
               'totalM', totalM,
               'totalT', totalT,
               'totalInstr', totalInstr,
               'totalTSinInstr', totalT - totalInstr,
               'saldoEf', saldoEf,
               'totalMEsp', totalM + totalT - totalInstr + saldoEf
           )
       ) AS TotalesPorMoneda
FROM (
    SELECT 
        c.CajaIEMoneda AS moneda,
        SUM(CASE WHEN c.CajaIEMT = 'M' AND DATE(c.CajaIEFecha) = curdate() THEN c.CajaIEImporte ELSE 0 END) AS totalM,
        SUM(CASE WHEN c.CajaIEMT = 'T' AND DATE(c.CajaIEFecha) = curdate() THEN c.CajaIEImporte ELSE 0 END) AS totalT,
        SUM(CASE WHEN c.CajaIEMT = 'T' AND c.CajaIEImpIP <> 0 AND c.CajaIECodIP <> 'EFC' AND DATE(c.CajaIEFecha) = curdate() THEN c.CajaIEImpIP ELSE 0 END) AS totalInstr,
        COALESCE(s.CajaSaldoEfImporte, 0) AS saldoEf
    FROM BaseCaja.CajaIE c
    LEFT JOIN (
        SELECT x.CajaSaldoEfMoneda, x.CajaSaldoEfImporte
        FROM BaseCaja.CajaSaldoEf x
        INNER JOIN (
            SELECT CajaSaldoEfMoneda, MAX(idCajaSaldoEfFecha) AS ultFecha
            FROM BaseCaja.CajaSaldoEf
            GROUP BY CajaSaldoEfMoneda
        ) y
        ON x.CajaSaldoEfMoneda = y.CajaSaldoEfMoneda
       AND x.idCajaSaldoEfFecha = y.ultFecha
    ) s ON s.CajaSaldoEfMoneda = c.CajaIEMoneda
    GROUP BY c.CajaIEMoneda, s.CajaSaldoEfImporte
) t;


-- curdate()
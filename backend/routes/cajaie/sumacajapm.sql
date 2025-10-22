
SELECT JSON_OBJECTAGG(
           moneda,
           JSON_OBJECT(
               'totalM', totalM,
               'totalT', totalT,
               'totalInstr', totalInstr,
               'totalTSinInstr', totalT - totalInstr,
               'saldoEf', saldoEf,
               'totalMEsp', totalM - totalInstr + totalT + saldoEf
           )
       ) AS TotalesPorMoneda
FROM (
    SELECT 
        c.CajaIEMoneda AS moneda,
        SUM(CASE WHEN c.CajaIEMT = 'M' AND c.CajaIEFecha = curdate() THEN c.CajaIEImporte   ELSE 0 END) AS totalM,
        SUM(CASE WHEN c.CajaIEMT = 'T' AND c.CajaIEFecha = curdate() THEN c.CajaIEImporte   ELSE 0 END) AS totalT,
        SUM(CASE WHEN c.CajaIEMT = 'T' AND c.CajaIEImpIP <> 0 AND c.CajaIEFecha = curdate() THEN c.CajaIEImporte ELSE 0 END) AS totalInstr,
        COALESCE(s.CajaSaldoEfImporte,0) AS saldoEf
    FROM BaseCaja.CajaIE c
    LEFT JOIN (
        SELECT x.CajaSaldoMoneda, x.CajaSaldoEfImporte
        FROM BaseCaja.CajaSaldoEf x
        INNER JOIN (
            SELECT CajaSaldoMoneda, MAX(idCajaSaldoEfFecha) AS ultFecha
            FROM BaseCaja.CajaSaldoEf
            GROUP BY CajaSaldoMoneda
        ) y
        ON x.CajaSaldoMoneda = y.CajaSaldoMoneda
       AND x.idCajaSaldoEfFecha = y.ultFecha
    ) s ON s.CajaSaldoMoneda = c.CajaIEMoneda
    GROUP BY c.CajaIEMoneda, s.CajaSaldoEfImporte
) t;

SELECT JSON_OBJECTAGG(
           moneda,
           JSON_OBJECT(
               'totalConPunto', totalConPunto,
               'totalSinPunto', totalSinPunto,
               'totalInstr', totalInstr,
               'totalConPuntoEsp', totalConPunto - totalInstr  + totalSinPunto         )
       ) AS TotalesPorMoneda
FROM (
    SELECT 
        CajaIEMoneda AS moneda,
        SUM(CASE WHEN CajaIEPunto = 'S' THEN CajaIEImporte ELSE 0 END) AS totalConPunto,
        SUM(CASE WHEN CajaIEPunto = 'N' THEN CajaIEImporte ELSE 0 END) AS totalSinPunto,
        SUM(CASE WHEN CajaIEPunto = 'N' AND CajaIEImpIP <> 0 THEN CajaIEImporte ELSE 0 END) AS totalInstr
    FROM BaseCaja.CajaIE
    GROUP BY CajaIEMoneda
) t;

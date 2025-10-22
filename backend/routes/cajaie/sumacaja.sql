SET SESSION group_concat_max_len = 1000000;
SET @sql = NULL;

SELECT 
  GROUP_CONCAT(
    DISTINCT CONCAT(
      'SUM(CASE WHEN CajaIE.CajaIEMT = ''S'' AND CajaIE.CajaIEMoneda = ''', CajaIEMoneda,
      ''' THEN CajaIE.CajaIEImporte ELSE 0 END) AS TotalM_', CajaIEMoneda,
      ', SUM(CASE WHEN CajaIE.CajaIEMT = ''N'' AND CajaIE.CajaIEMoneda = ''', CajaIEMoneda,
      ''' THEN CajaIE.CajaIEImporte ELSE 0 END) AS TotalT_', CajaIEMoneda,
      ', SUM(CASE WHEN CajaIE.CajaIEMT = ''N'' AND CajaIE.CajaIEMoneda = ''', CajaIEMoneda,
      ''' AND CajaIE.CajaIEImpIP <> 0 THEN CajaIE.CajaIEImporte ELSE 0 END) AS TotalInstr_', CajaIEMoneda
    )
    SEPARATOR ', '
  ) INTO @sql
FROM BaseCaja.CajaIE;

SET @sql = CONCAT('SELECT ', @sql, ' FROM BaseCaja.CajaIE');

-- Debug: ver la query armada
SELECT @sql;

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

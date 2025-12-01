SELECT
    CajaInternaMoneda,    
    SUM(CASE 
            WHEN CajaInternaES = 'E' AND CajaInternaMT = 'M' 
            THEN CajaInternaImporte 
            ELSE 0 
        END) AS TotalEntradaM,

    SUM(CASE 
            WHEN CajaInternaES = 'S' AND CajaInternaMT = 'M' 
            THEN CajaInternaImporte 
            ELSE 0 
        END) AS TotalSalidaM,

    SUM(CASE 
            WHEN CajaInternaES = 'E' AND CajaInternaMT = 'T' 
            THEN CajaInternaImporte 
            ELSE 0 
        END) AS TotalEntradaT,

    SUM(CASE 
            WHEN CajaInternaES = 'S' AND CajaInternaMT = 'T' 
            THEN CajaInternaImporte 
            ELSE 0 
        END) AS TotalSalidaT,
        sum(CajaInternaTotalInstr) as InstrumentosIngresados
        

FROM BaseCaja.CajaInterna

GROUP BY CajaInternaMoneda;


LOAD DATA INFILE '/var/lib/mysql-files/comprobantes_consulta.csv'
INTO TABLE BasePreBalance.DocRec
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY ';'
IGNORE 1 LINES
(@col1, @col2, @col3, @col4, @col5, @col6, @col7, @col8,
 @col9,
 @col10,    @col11,    @col12,    @col13,    @col14,
 @col15,    @col16,    @col17,    @col18,    @col19,
 @col20,    @col21,    @col22,    @col23,    @col24,
 @col25,    @col26,    @col27,    @col28,    @col29,
 @col30,    @col31,    @col32,    @col33,    @col34,
 @col35,    @col36,    @col37,    @col38,    @col39
 ) 
SET 
   FechadeEmision = @col1,      
  TipodeComprobante= @col2,     
    NroDesde = @col4,
  NroDocEmisor = @col8,
  Denominacion = @col9,
  IVA21 = REPLACE(@col15, ',', '.'), -- Asignamos la variable 10 y corregimos el decimal
  ImpIVA21 = REPLACE(@col16, ',', '.'), -- Asignamos la variable 11 y corregimos el decimal
  ImpNetoTotal = REPLACE(@col20, ',', '.'), -- Asignamos la variable 12 y corregimos el decimal
  ImpTotal = REPLACE(@col21, ',', '.'); -- Asignamos la variable 13 y corregimos el decimal


-- poner clave foránea en SktItems, como hay abreviaturas que están en items y no
-- en rubros primero tengo que limpiar eso 
--   había hecho esto, pero no me resultó
SET SQL_SAFE_UPDATES = 0;
DELETE si
FROM StkItems si
JOIN BaseStock.StkRubro sr
  ON si.StkItemsGrupo = sr.StkRubroCodGrp
 AND si.StkItemsRubro = sr.idStkRubro
WHERE si.StkItemsRubroAbr <> sr.StkRubroAbr;
-- entonces después hice esto
-- Encontrar valores huérfanos
SELECT StkItemsRubroAbr FROM BaseStock.StkItems
WHERE StkItemsRubroAbr NOT IN (SELECT StkRubroAbr FROM BaseStock.StkRubro);
-- borrar valores huérfanos
delete FROM BaseStock.StkItems
WHERE StkItemsRubroAbr NOT IN (SELECT StkRubroAbr FROM BaseStock.StkRubro);

-- poner clave foránea en SktItems
ALTER TABLE BaseStock.StkItems
ADD CONSTRAINT AbrevRubros
FOREIGN KEY (StkItemsRubroAbr)
REFERENCES BaseStock.StkRubro(StkRubroAbr)
ON DELETE NO ACTION;


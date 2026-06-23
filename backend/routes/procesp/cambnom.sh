for f in /home/sandra/SIOLSA/medclientes/medidas/medidas/?0148*.*; 
do     cp "$f" "/home/sandra/Descargas/medprue/${f/0148/0101}"; 
done


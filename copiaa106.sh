
#!/bin/bash

# ==========================================
# CONFIGURACIÓN DE RUTAS
# ==========================================
# Ruta de la carpeta en esta computadora (PC_B)
RUTA_ORIGEN="/home/sandra/Documentos/OLSAFrecuentes"

# Datos de la computadora de destino (PC_C)
USUARIO_C="usuario"
IP_PC_C="192.168.2.106"
RUTA_DESTINO="/home/usuario/backupserv11/OLSAFrecuentes"

# ==========================================
# PROCESO DE COPIA
# ==========================================

# Limpia la pantalla para que el mensaje se vea claro
clear

echo "=========================================="
echo "   Iniciando el sistema de respaldo...    "
echo "=========================================="
echo ""
echo "-> Voy a copiar los archivos nuevos de: $RUTA_ORIGEN"
echo "-> Hacia la PC de destino: $USUARIO_C@$IP_PC_C:$RUTA_DESTINO"
echo ""
echo "Por favor, espera..."
echo "------------------------------------------"
read
# Ejecuta el rsync progresivo
rsync -avz --update "$RUTA_ORIGEN" "$USUARIO_C@$IP_PC_C:$RUTA_DESTINO" || true

echo "------------------------------------------"
echo "¡Proceso terminado con éxito!"
echo "=========================================="

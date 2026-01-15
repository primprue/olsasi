#!/bin/bash

# Variables
USUARIO="root"
CLAVE="drasan141"
BASE="--all-databases"
FECHA=$(date +%Y-%m-%d)
DESTINO_LOCAL="/home/usuario/Resguardo"
DESTINO_REMOTO="/home/sandra/ResgDiario/BASES"
IP_REMOTA="192.168.2.11"
USUARIO_REMOTO="sandra"
# Crear directorio si no existe
mkdir -p "$DESTINO"

# Hacer el dump
mysqldump -u "$USUARIO" -p"$CLAVE" "$BASE" > "$DESTINO_LOCAL/backolsasi_${FECHA}.sql"

# Mensaje final
echo "backolsasi de $BASE creado en $DESTINO_LOCAL/backolsasi_${BASE}_${FECHA}.sql"


#ssh-keygen
#ssh-copy-id "$USUARIO_REMOTO@$IP_REMOTA"
# Copiar al servidor remoto
rsync -av "$DESTINO_LOCAL/backolsasi_${FECHA}.sql" "$USUARIO_REMOTO@$IP_REMOTA:$DESTINO_REMOTO"

# Mensaje final
echo "backolsasi creado y copiado a $IP_REMOTA:$DESTINO_REMOTO"

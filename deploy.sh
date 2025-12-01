#!/bin/bash
# Script de despliegue automático - Alexa Gemini Skill
# Para estudiante de ingeniería: ejecuta con ./deploy.sh

set -e

echo "==============================================="
echo "  DESPLIEGUE AUTOMÁTICO - ALEXA GEMINI SKILL"
echo "==============================================="

# 1. Clonar el repositorio
echo "[1/5] Clonando repositorio..."
if [ ! -d "alexa-gemini-skill" ]; then
  git clone https://github.com/Suikasama123/alexa-gemini-skill.git
fi
cd alexa-gemini-skill

# 2. Verificar que Docker está instalado
echo "[2/5] Verificando Docker..."
if ! command -v docker &> /dev/null; then
  echo "ERROR: Docker no está instalado. Instálalo con: sudo apt-get install docker.io"
  exit 1
fi

# 3. Construir imagen Docker
echo "[3/5] Construyendo imagen Docker..."
sudo docker build -t alexa-gemini-skill .

# 4. Ejecutar contenedor en background
echo "[4/5] Ejecutando contenedor (puerto 3000)..."
sudo docker run -d \
  -e GEMINI_API_KEY="AIzaSyD1pDSUfT9K5IDcxXTUse4sKe5Rl5_8xo" \
  -p 3000:3000 \
  --name alexa-gemini-container \
  alexa-gemini-skill

# 5. Esperar que el contenedor esté listo
echo "[5/5] Esperando a que el servicio esté listo..."
sleep 5

# Verificar que está corriendo
if sudo docker ps | grep -q alexa-gemini-container; then
  echo ""
  echo "✅ CONTENEDOR EJECUTÁNDOSE EN http://localhost:3000"
  echo ""
  echo "PRÓXIMOS PASOS:"
  echo "1. Instala ngrok (si no lo tienes):"
  echo "   curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null"
  echo "   echo \"deb https://ngrok-agent.s3.amazonaws.com buster main\" | sudo tee /etc/apt/sources.list.d/ngrok.list"
  echo "   sudo apt-get update && sudo apt-get install ngrok"
  echo ""
  echo "2. Expone el puerto con ngrok:"
  echo "   ngrok http 3000"
  echo ""
  echo "3. Copia la URL pública que genera ngrok (ej: https://xxxx-xx-xxx-xxx-xx.ngrok.io)"
  echo ""
  echo "4. Pega esa URL en Alexa Developer Console > Endpoint"
  echo ""
  echo "5. ¡Tu Alexa Skill con Gemini está lista!"
  echo ""
else
  echo "❌ Error: El contenedor no se ejecutó correctamente"
  exit 1
fi

echo "\nPara ver los logs: sudo docker logs -f alexa-gemini-container"
echo "Para detener: sudo docker stop alexa-gemini-container"

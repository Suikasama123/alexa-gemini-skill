# ⚡ Inicio Rápido - 3 Comandos

## Paso 1: Clona y ejecuta el script

```bash
cd ~
git clone https://github.com/Suikasama123/alexa-gemini-skill.git
cd alexa-gemini-skill
chmod +x deploy.sh
./deploy.sh
```

EsperaEsto construirá la imagen Docker y correrá el contenedor automáticamente.

**Espera: 2-3 minutos mientras se construye la imagen**

## Paso 2: Exponer con ngrok (en otra terminal)

```bash
# Si no tienes ngrok:
sudo apt-get install ngrok

# Exponer:
ngrok http 3000
```

CopiaEsta URL que ngrok te genera (ej: `https://xxxx-xx-xxx-xxx-xx.ngrok.io`)

## Paso 3: Actualizar Alexa Endpoint

1. Ve a: https://developer.amazon.com/alexa/console/ask
2. Abre "Inteligencia Artificial" skill
3. Build > Endpoint
4. Pega la URL de ngrok + `/` (ej: `https://xxxx-xx-xxx-xxx-xx.ngrok.io/`)
5. Click Save

**✅ LISTO!**

Ahora tu Alexa Skill está conectada con Gemini AI.

## Probar

En el Test tab de Alexa:
- Di: "Alexa, abre Inteligencia Artificial"
- Pregunta algo en español
- Alexa responderá usando Gemini AI

---

## Troubleshooting

**El contenedor no inicia?**
```bash
sudo docker logs alexa-gemini-container
```

**Necesito detenerlo?**
```bash
sudo docker stop alexa-gemini-container
```

**Reiniciar?**
```bash
sudo docker start alexa-gemini-container
```

## Información Técnica

- **Backend**: Node.js + Express
- **AI**: Google Gemini API
- **Contenedor**: Docker (Node 18-Alpine)
- **Tunel**: ngrok
- **Puerto**: 3000

Todo está automatizado. Solo 3 comandos.

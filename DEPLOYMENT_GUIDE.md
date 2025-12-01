# Deployment Guide - Alexa Gemini Skill

## Overview
This is a complete Alexa Skill that integrates Google Gemini AI, replacing Alexa's default AI with Google's Gemini API for Spanish language responses.

## What's Included
- **Alexa Skill**: Custom skill named "Inteligencia Artificial" (ID: amzn1.ask.skill.218329d1-ef32-4e0a-a3ee-33513895c098)
- **Backend**: Node.js Express server with Alexa SDK and Gemini AI integration
- **Docker Support**: Containerized for easy deployment
- **Deployment Config**: render.yaml for automatic deployment to Render.com

## Prerequisites
1. GitHub account (already have repository)
2. Render.com account (free tier available)
3. Gemini API key (AIzaSyD1pDSUfT9K5IDcxXTUse4sKe5Rl5_8xo)
4. Amazon Developer account (for Alexa testing)

## Deployment Steps

### Step 1: Deploy Backend to Render.com

1. Go to https://render.com
2. Click "Deploy a new project"
3. Choose "Deploy from GitHub"
4. Select repository: `alexa-gemini-skill`
5. Configure settings:
   - **Name**: alexa-gemini-skill
   - **Runtime**: Node
   - **Build Command**: npm install
   - **Start Command**: node index.js
6. Add Environment Variable:
   - **Key**: GEMINI_API_KEY
   - **Value**: AIzaSyD1pDSUfT9K5IDcxXTUse4sKe5Rl5_8xo
7. Click "Deploy"
8. Wait for deployment (2-3 minutes)
9. Copy the deployed URL (e.g., https://alexa-gemini-skill.onrender.com)

### Step 2: Update Alexa Endpoint

1. Go to Amazon Developer Console
2. Open "Inteligencia Artificial" skill
3. Navigate to Build > Endpoint
4. Select HTTPS
5. Enter endpoint URL: `https://[your-render-url]/`
6. Select SSL certificate type: "My development endpoint has a certificate from a trusted certificate authority"
7. Click Save

### Step 3: Test the Skill

1. Go to Test tab in Amazon Developer Console
2. Enable testing for this skill
3. Say: "Alexa, abre Inteligencia Artificial"
4. Ask a question in Spanish
5. Alexa will respond using Gemini AI

## Environment Variables

- **GEMINI_API_KEY**: Your Google Gemini API key (required)
- **PORT**: Server port (default: 3000)

## File Structure

```
allexa-gemini-skill/
├── .env                 # Environment variables (contains API key)
├── .env.example        # Example configuration
├── index.js            # Main Express server & Alexa handler
├── package.json        # Node dependencies
├── Dockerfile          # Docker configuration
├── render.yaml         # Render.com deployment config
└── README.md           # Main README
```

## Troubleshooting

### Endpoint not connecting
- Verify Render.com deployment is running
- Check that the URL is correct in Alexa console
- Ensure GEMINI_API_KEY environment variable is set

### Spanish responses not working
- Verify skill locale is set to Spanish (Mexico)
- Check that Gemini API key is valid
- Test with simple Spanish phrases first

### Port/Connection issues
- Ensure port 3000 is available
- Check Render.com logs for errors
- Verify all dependencies are installed

## Next Steps

- Monitor Render.com logs for any errors
- Test voice commands with your Alexa device
- Consider adding more intents for better NLP coverage
- Scale up to other locales if needed

## Support

For issues, check:
- Render.com deployment logs
- Amazon Alexa skill test console
- Gemini API documentation

Skill ID: amzn1.ask.skill.218329d1-ef32-4e0a-a3ee-33513895c098

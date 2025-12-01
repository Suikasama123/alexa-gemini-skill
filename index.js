const { Alexa } = require('ask-sdk-core');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-api-key-here';
const SKILL_ID = 'amzn1.ask.skill.218329d1-ef32-4e0a-a3ee-33513895c098';

let genAI = null;
if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your-api-key-here') {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const response = genAI
      ? (await genAI.getGenerativeModel({ model: 'gemini-pro' })
          .generateContent('Di hola en español de manera amigable y corta'))
      : null;
    
    const speechText = response
      ? response.response.text()
      : '¡Hola! Bienvenido a la skill de inteligencia artificial';
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt('¿Cuál es tu pregunta?')
      .withSimpleCard('Alexa Gemini', speechText)
      .getResponse();
  }
};

const IntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest';
  },
  async handle(handlerInput) {
    const slots = handlerInput.requestEnvelope.request.intent.slots;
    let userInput = 'Hola';
    
    if (slots && slots.query && slots.query.value) {
      userInput = slots.query.value;
    }
    
    let response;
    try {
      if (!genAI) {
        response = 'La clave API de Gemini no está configurada';
      } else {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(userInput);
        response = result.response.text();
      }
    } catch (error) {
      response = `Error: ${error.message}`;
    }
    
    return handlerInput.responseBuilder
      .speak(response)
      .withSimpleCard('Respuesta', response)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Puedes hacer preguntas y recibirás respuestas de inteligencia artificial';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
      || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak('¡Adiós!').getResponse();
  }
};

app.use(express.json());

app.post('/alexa', async (req, res) => {
  try {
    const skillRequest = req.body;
    
    const skillBuilder = Alexa.SkillBuilders.custom()
      .addRequestHandler(LaunchRequestHandler)
      .addRequestHandler(IntentHandler)
      .addRequestHandler(HelpIntentHandler)
      .addRequestHandler(CancelAndStopIntentHandler);
    
    const skill = skillBuilder.create();
    const response = await skill.invoke(skillRequest);
    
    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Alexa Skill server listening on port ${PORT}`);
});

module.exports = app;

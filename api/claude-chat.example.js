// Exemplo de API backend para Claude Chat
// Este arquivo deve ser implementado no seu servidor backend
// Exemplo usando Node.js/Express ou Vercel Serverless Functions

// Para Vercel: coloque este arquivo em /api/claude-chat.js
// Para Express: adicione esta rota ao seu servidor

import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY, // Configure esta variável de ambiente
    });

    const { messages } = req.body;

    // Adiciona contexto sobre o Lucas Lima Photography
    const systemMessage = `Você é um assistente virtual do Lucas Lima Photography, um fotógrafo de casamentos especializado em fotografia atemporal e elegante. 
    
Informações sobre o Lucas Lima:
- 15 anos de experiência em fotografia de casamentos
- Estilo: Fotografia Atemporal, elegante e documental
- Trabalha em casamentos no Brasil e internacionalmente (EUA, Marrocos, República Tcheca, Portugal, Itália, França, Uruguai, México)
- Especializado em capturar emoções autênticas e momentos verdadeiros
- Oferece álbuns impressos premium e galerias online
- Contato: contato@lucaslimafotografia.com | +55 11 98492-0048

Seja profissional, amigável e ajude os visitantes com informações sobre serviços, orçamentos, estilos de fotografia e disponibilidade.`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemMessage,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    });

    const content = response.content[0].text;

    return res.status(200).json({ content });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from Claude',
      details: error.message 
    });
  }
}

import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verificar se a API key está configurada
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'ANTHROPIC_API_KEY environment variable is missing. Please configure it in Vercel settings.'
      });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // System prompt personalizado para o Lucas Lima Photography
    const systemMessage = `Você é um assistente virtual do Lucas Lima Photography, um fotógrafo de casamentos especializado em fotografia atemporal e elegante. 
    
INFORMAÇÕES SOBRE O LUCAS LIMA:
- 15 anos de experiência em fotografia de casamentos
- Estilo: Fotografia Atemporal, elegante e documental
- Trabalha em casamentos no Brasil e internacionalmente (EUA, Marrocos, República Tcheca, Portugal, Itália, França, Uruguai, México)
- Especializado em capturar emoções autênticas e momentos verdadeiros
- Oferece álbuns impressos premium e galerias online
- Contato: contato@lucaslimafotografia.com | +55 11 98492-0048

SERVIÇOS OFERECIDOS:
- Cobertura completa de casamentos
- Ensaios pré-wedding
- Álbuns impressos premium
- Galerias online privadas
- Sessões de noivos e noivas

ESTILO DE FOTOGRAFIA:
- Elegante e atemporal
- Foco em emoções autênticas
- Composição artística
- Iluminação natural
- Documental e editorial

INSTRUÇÕES:
- Seja profissional, amigável e acolhedor
- Ajude visitantes com informações sobre serviços, orçamentos e disponibilidade
- Sempre ofereça mais informações se o visitante tiver dúvidas
- Se perguntarem sobre preços, mencione que o orçamento é personalizado e pode agendar uma conversa
- Responda sempre em português, a menos que o visitante fale em inglês
- Se não souber algo específico, direcione para o contato direto: contato@lucaslimafotografia.com`;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemMessage,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    });

    const content = response.content[0].text;

    return res.status(200).json({ content });
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    
    // Mensagens de erro mais amigáveis
    let errorMessage = 'Failed to get response from Claude';
    if (error.message?.includes('authentication')) {
      errorMessage = 'Authentication failed. Please check your API key in Vercel settings.';
    } else if (error.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
    }

    return res.status(500).json({ 
      error: errorMessage,
      details: error.message 
    });
  }
}

import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Verificar se a API key está configurada
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY not configured');
      return res.status(500).json({ 
        error: 'API key not configured',
        message: 'ANTHROPIC_API_KEY environment variable is missing. Please configure it in Vercel settings.',
        help: 'Go to Vercel Dashboard > Settings > Environment Variables > Add ANTHROPIC_API_KEY'
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
      model: 'claude-3-5-sonnet-20240620', // Modelo válido e disponível
      max_tokens: 1024,
      system: systemMessage,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    });

    const firstBlock = response.content[0];
    const content =
      firstBlock && 'text' in firstBlock && typeof (firstBlock as { text: string }).text === 'string'
        ? (firstBlock as { text: string }).text
        : '';

    return res.status(200).json({ content });
  } catch (error: any) {
    console.error('Error calling Claude API:', error);
    
    // Mensagens de erro mais amigáveis
    let errorMessage = 'Failed to get response from Claude';
    let details = error.message || 'Unknown error';
    
    if (error.message?.includes('authentication') || error.message?.includes('401')) {
      errorMessage = 'Authentication failed. Please check your API key in Vercel settings.';
    } else if (error.message?.includes('rate limit') || error.message?.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (error.message?.includes('API key')) {
      errorMessage = 'API key error. Please verify your ANTHROPIC_API_KEY in Vercel settings.';
    }

    return res.status(500).json({ 
      error: errorMessage,
      details: details,
      help: 'Check Vercel logs for more details: Dashboard > Deployments > Functions > api/claude-chat'
    });
  }
}

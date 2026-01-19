import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { images, token } = req.body;

    if (!images) {
      return res.status(400).json({ error: 'Images data is required' });
    }

    // Verificar token de autenticação (opcional, mas recomendado)
    const adminToken = process.env.ADMIN_TOKEN || 'lucaslima2024';
    if (token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Aqui você pode:
    // 1. Salvar no GitHub via API
    // 2. Salvar em um banco de dados
    // 3. Retornar o JSON para download

    // Por enquanto, vamos retornar o JSON formatado
    const imagesData = {
      gallery: images.gallery || [],
      hero: images.hero || []
    };

    return res.status(200).json({
      success: true,
      data: imagesData,
      message: 'Images data prepared. Use GitHub API or download to save.'
    });

  } catch (error: any) {
    console.error('Save error:', error);
    return res.status(500).json({ 
      error: 'Save failed', 
      message: error.message 
    });
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_API = 'https://api.github.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const adminToken = process.env.ADMIN_TOKEN || 'lucaslima2024';

  // GET: retorna status da configuração (para o painel mostrar se está tudo certo)
  if (req.method === 'GET') {
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    if (token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const githubToken = process.env.GITHUB_TOKEN;
    const owner =
      process.env.GITHUB_REPO_OWNER ||
      process.env.VERCEL_GIT_REPO_OWNER ||
      'lucaslimaphotografia-boop';
    const repo =
      process.env.GITHUB_REPO_NAME ||
      process.env.VERCEL_GIT_REPO_SLUG ||
      'lucaslimafotografia.com';
    return res.status(200).json({
      ok: true,
      tokenSet: !!githubToken,
      repo: `${owner}/${repo}`,
      message: githubToken
        ? `Configurado. Repositório: ${owner}/${repo}`
        : 'GITHUB_TOKEN não está definido no Vercel. Vá em Settings → Environment Variables e adicione GITHUB_TOKEN.',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { gallery, hero, photobook, testimonials, token } = req.body;

    if (!gallery || !Array.isArray(gallery)) {
      return res.status(400).json({ error: 'gallery (array) is required' });
    }

    if (token !== adminToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return res.status(500).json({
        error: 'Server not configured',
        message: 'GITHUB_TOKEN is not set in Vercel environment variables. Add it in Vercel → Project → Settings → Environment Variables.'
      });
    }

    // Usar o repositório conectado ao deploy (Vercel injeta VERCEL_GIT_*). Assim o push
    // vai para o mesmo repo que o site usa e o Vercel faz um novo deploy.
    const owner =
      process.env.GITHUB_REPO_OWNER ||
      process.env.VERCEL_GIT_REPO_OWNER ||
      'lucaslimaphotografia-boop';
    const repo =
      process.env.GITHUB_REPO_NAME ||
      process.env.VERCEL_GIT_REPO_SLUG ||
      'lucaslimafotografia.com';
    const path = 'images.json';

    const fileContent = JSON.stringify(
      {
        gallery,
        hero: hero || [],
        photobook: photobook && photobook.albums ? photobook : { albums: [] },
        testimonials: Array.isArray(testimonials) ? testimonials : []
      },
      null,
      2
    );
    const contentBase64 = Buffer.from(fileContent, 'utf-8').toString('base64');

    // 1. Get current file to obtain sha (required for update)
    const getRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );

    let sha: string | undefined;
    if (getRes.ok) {
      const file = await getRes.json();
      sha = file.sha;
    } else if (getRes.status !== 404) {
      const err = await getRes.text();
      console.error('GitHub GET error:', getRes.status, err);
      return res.status(getRes.status).json({
        error: 'GitHub API error',
        message: getRes.status === 401
          ? 'Invalid GITHUB_TOKEN. Check repo permissions.'
          : err
      });
    }

    // 2. Create or update file
    const putBody: { message: string; content: string; sha?: string } = {
      message: 'Update gallery from admin panel',
      content: contentBase64
    };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putBody)
      }
    );

    if (!putRes.ok) {
      const errData = await putRes.json().catch(() => ({}));
      const msg = errData.message || putRes.statusText;
      console.error('GitHub PUT error:', putRes.status, msg);
      return res.status(putRes.status).json({
        error: 'Failed to update repository',
        message: msg
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Galeria atualizada no repositório. O Vercel fará o deploy em 1–2 minutos.',
      repo: `${owner}/${repo}`
    });
  } catch (error: any) {
    console.error('Save error:', error);
    return res.status(500).json({
      error: 'Save failed',
      message: error?.message || 'Unknown error'
    });
  }
}

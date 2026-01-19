import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, folder, publicId } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Cloudinary credentials (configure no Vercel Environment Variables)
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'di6xabxne';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'ml_default';

    // Se a imagem já é uma URL, retornar ela mesma
    if (typeof image === 'string' && image.startsWith('http')) {
      return res.status(200).json({ 
        url: image,
        publicId: publicId || 'existing-image'
      });
    }

    // Upload para Cloudinary usando unsigned upload preset
    const formData = new FormData();
    
    // Se é base64, converter para blob
    if (typeof image === 'string' && image.startsWith('data:')) {
      const base64Data = image.split(',')[1];
      const mimeType = image.match(/data:([^;]+);/)?.[1] || 'image/jpeg';
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
      formData.append('file', blob);
    } else {
      formData.append('file', image);
    }

    formData.append('upload_preset', uploadPreset);
    if (folder) {
      formData.append('folder', folder);
    }
    if (publicId) {
      formData.append('public_id', publicId);
    }

    // Otimizações automáticas
    formData.append('transformation', JSON.stringify([
      { width: 1200, quality: 'auto', fetch_format: 'auto' }
    ]));

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.text();
      throw new Error(`Cloudinary upload failed: ${errorData}`);
    }

    const data = await uploadResponse.json();

    // Retornar URL otimizada
    const optimizedUrl = data.secure_url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');

    return res.status(200).json({
      url: optimizedUrl,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed', 
      message: error.message 
    });
  }
}

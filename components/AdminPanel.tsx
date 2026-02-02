import React, { useState, useEffect, useRef } from 'react';
import { ImageItem, Language, PhotobookAlbum, TestimonialItem } from '../types';
import imagesData from '../images.json';
import { translations } from '../translations';
import { 
  Save, Plus, Trash2, Edit2, Image as ImageIcon, 
  Settings, Eye, EyeOff, Upload, X, Check, Download, Loader2,
  FileText, PenTool, Palette, Bell, HelpCircle, User, ChevronRight,
  Home, ExternalLink, Globe, Search, Eye as EyeIcon, MoreVertical,
  ChevronDown, Menu
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
  lang: Language;
}

type AdminTab = 'pages' | 'content' | 'design' | 'settings';
type AdminSubTab = 'gallery' | 'hero' | 'portfolio' | 'translations' | 'seo' | 'social' | 'analytics';
type AdminSection = 'dashboard' | 'portfolio' | 'about' | 'services' | 'testimonials' | 'blog' | 'gallery' | 'videos' | 'photobook' | 'seo' | 'contact' | 'social' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, lang }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('pages');
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTab>('gallery');
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [gallery, setGallery] = useState<ImageItem[]>(imagesData.gallery);
  const [hero, setHero] = useState<string[]>(imagesData.hero);
  const [photobook, setPhotobook] = useState<{ albums: PhotobookAlbum[] }>(() => ({
    albums: (imagesData as { photobook?: { albums: PhotobookAlbum[] } }).photobook?.albums ?? []
  }));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() =>
    (imagesData as { testimonials?: TestimonialItem[] }).testimonials ?? []
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingItem, setEditingItem] = useState<ImageItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCategories, setNewImageCategories] = useState<string[]>(['Igreja']);
  const [newImageSubcategories, setNewImageSubcategories] = useState<string[]>([]);
  const [newAlbumUrls, setNewAlbumUrls] = useState<string[]>(['']);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadingAlbum, setUploadingAlbum] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<{ tokenSet?: boolean; repo?: string; error?: string } | null>(null);
  const [uploadingPhotobookAlbum, setUploadingPhotobookAlbum] = useState<number | null>(null);
  const [selectedPhotobookAlbumForUpload, setSelectedPhotobookAlbumForUpload] = useState<number | null>(null);
  const [uploadingTestimonialImage, setUploadingTestimonialImage] = useState<number | null>(null);
  const [selectedTestimonialForUpload, setSelectedTestimonialForUpload] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const albumFileInputRef = useRef<HTMLInputElement>(null);
  const photobookFileInputRef = useRef<HTMLInputElement>(null);
  const testimonialFileInputRef = useRef<HTMLInputElement>(null);

  // Senha padrão
  const ADMIN_PASSWORD = 'lucaslima2024';

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (activeSection === 'gallery') {
      setActiveTab('pages');
      setActiveSubTab('gallery');
    }
  }, [activeSection]);

  // Verificar status da publicação (só funciona no site em produção no Vercel)
  useEffect(() => {
    if (!isAuthenticated || activeSection !== 'gallery') return;
    const token = sessionStorage.getItem('admin_token') || ADMIN_PASSWORD;
    fetch(`/api/save-images?token=${encodeURIComponent(token)}`)
      .then((res) => res.json().catch(() => ({})))
      .then((data) => {
        if (data.ok) setPublishStatus({ tokenSet: data.tokenSet, repo: data.repo });
        else setPublishStatus({ error: data.message || data.error || 'API indisponível' });
      })
      .catch(() => setPublishStatus({ error: 'Use o painel no site em produção (Vercel), não em localhost.' }));
  }, [isAuthenticated, activeSection]);

  const openAddForm = () => {
    setEditingItem(null);
    setNewImageUrl('');
    setNewImageTitle('');
    setNewImageCategories(['Igreja']);
    setNewImageSubcategories([]);
    setNewAlbumUrls(['']);
    setShowAddForm(true);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_token', password);
      setPassword('');
    } else {
      const errorMsg = document.getElementById('errorMessage');
      if (errorMsg) {
        errorMsg.classList.remove('hidden');
        setTimeout(() => errorMsg.classList.add('hidden'), 3000);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_token');
  };

  const handleSave = async () => {
    try {
      const updatedData = { gallery, hero, photobook, testimonials };
      localStorage.setItem('admin_images_backup', JSON.stringify(updatedData));
      const blob = new Blob([JSON.stringify(updatedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.json';
      a.click();
      URL.revokeObjectURL(url);
      setHasChanges(false);
      alert(`✅ Dados salvos!\n\n📥 O arquivo images.json foi baixado.\n\n📋 Próximos passos:\n1. Substitua o arquivo images.json no projeto\n2. git add images.json\n3. git commit -m "Update images"\n4. git push origin main\n5. Aguarde o deploy no Vercel (~1-2 min)`);
    } catch (error) {
      alert('❌ Erro ao salvar: ' + error);
    }
  };

  const publishToSite = async (payload?: { gallery?: ImageItem[]; hero?: string[]; photobook?: { albums: PhotobookAlbum[] }; testimonials?: TestimonialItem[] }): Promise<boolean> => {
    setPublishing(true);
    try {
      const token = sessionStorage.getItem('admin_token') || ADMIN_PASSWORD;
      const g = payload?.gallery ?? gallery;
      const h = payload?.hero ?? hero;
      const pb = payload?.photobook ?? photobook;
      const tb = payload?.testimonials ?? testimonials;
      const res = await fetch('/api/save-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery: g, hero: h, photobook: pb, testimonials: tb, token })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const baseMsg = data.message || data.error || res.statusText;
        const extra = res.status === 404
          ? '\n\n💡 A publicação automática só funciona no site em produção (Vercel). Está testando localmente? Acesse o painel pelo seu domínio (ex: seu-site.vercel.app) ou use "Baixar JSON" e faça git push manual.'
          : '\n\nSe o servidor pedir GITHUB_TOKEN, configure em Vercel → Project → Settings → Environment Variables.';
        alert(`❌ Erro ao publicar\n\n${baseMsg}${extra}`);
        return false;
      }
      if (payload) {
        if (payload.gallery) setGallery(payload.gallery);
        if (payload.photobook) setPhotobook(payload.photobook);
        if (payload.testimonials) setTestimonials(payload.testimonials);
        setEditingItem(null);
        setShowAddForm(false);
      }
      setHasChanges(false);
      alert(`✅ ${data.message || 'Site atualizado!'}\n\n${data.repo ? `Repositório atualizado: ${data.repo}\n\n` : ''}O deploy no Vercel deve levar 1–2 minutos.`);
      return true;
    } finally {
      setPublishing(false);
    }
  };

  const handlePublish = async () => {
    if (editingItem && showAddForm) {
      if (!newImageUrl.trim() || newImageCategories.length === 0) {
        alert('Preencha a URL e pelo menos uma categoria.');
        return;
      }
      const updatedGallery = gallery.map(img =>
        img.id === editingItem.id
          ? {
              ...img,
              url: newImageUrl,
              title: newImageTitle || undefined,
              category: newImageCategories.length === 1 ? newImageCategories[0] : newImageCategories,
              subcategory: newImageSubcategories.length > 0
                ? (newImageSubcategories.length === 1 ? newImageSubcategories[0] : newImageSubcategories)
                : undefined,
              album: newAlbumUrls.filter(u => u.trim()).length > 0 ? newAlbumUrls.filter(u => u.trim()) : undefined
            }
          : img
      );
      const ok = await publishToSite({ gallery: updatedGallery, hero });
      if (!ok) {
        handleUpdateImage();
        handleSave();
      }
      return;
    }
    if (hasChanges) {
      const ok = await publishToSite();
      if (!ok) handleSave();
    } else {
      alert('💡 Nenhuma alteração pendente.\n\nEdite uma foto e clique em "Atualizar", ou adicione uma nova e clique em "Adicionar". Depois clique em "Publicar".');
    }
  };

  const handlePreview = () => {
    window.open(window.location.origin, '_blank');
  };

  const handleAddImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!newImageUrl.trim()) {
      alert('Por favor, adicione uma URL da foto principal.');
      return;
    }
    if (newImageCategories.length === 0) {
      alert('Por favor, selecione pelo menos uma categoria.');
      return;
    }

    const ids = gallery.map(img => img.id);
    const newId = ids.length > 0 ? Math.max(...ids, 0) + 1 : 1;
    const newImage: ImageItem = {
      id: newId,
      url: newImageUrl.trim(),
      category: newImageCategories.length === 1 ? newImageCategories[0] : newImageCategories,
      subcategory: newImageSubcategories.length > 0 
        ? (newImageSubcategories.length === 1 ? newImageSubcategories[0] : newImageSubcategories)
        : undefined,
      title: newImageTitle?.trim() || undefined,
      album: newAlbumUrls.filter(url => url.trim()).length > 0 
        ? newAlbumUrls.filter(url => url.trim())
        : undefined
    };

    setGallery(prev => [...prev, newImage]);
    setNewImageUrl('');
    setNewImageTitle('');
    setNewImageCategories(['Igreja']);
    setNewImageSubcategories([]);
    setNewAlbumUrls(['']);
    setShowAddForm(false);
    setHasChanges(true);
    alert('✅ Álbum adicionado à lista!\n\nClique em "Publicar" (botão verde no rodapé) para atualizar o site.');
  };

  const handleDeleteImage = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta imagem?')) {
      setGallery(gallery.filter(img => img.id !== id));
      setHasChanges(true);
    }
  };

  const handleEditImage = (item: ImageItem) => {
    setEditingItem(item);
    setNewImageUrl(item.url);
    setNewImageTitle(item.title || '');
    setNewImageCategories(Array.isArray(item.category) ? item.category : [item.category]);
    setNewImageSubcategories(
      item.subcategory 
        ? (Array.isArray(item.subcategory) ? item.subcategory : [item.subcategory])
        : []
    );
    setNewAlbumUrls(item.album && item.album.length > 0 ? item.album : ['']);
    setShowAddForm(true);
  };

  const handleUpdateImage = () => {
    if (!editingItem || !newImageUrl.trim()) return;
    if (newImageCategories.length === 0) {
      alert('Por favor, selecione pelo menos uma categoria');
      return;
    }

    const updated = gallery.map(img => 
      img.id === editingItem.id 
        ? {
            ...img,
            url: newImageUrl,
            title: newImageTitle || undefined,
            category: newImageCategories.length === 1 ? newImageCategories[0] : newImageCategories,
            subcategory: newImageSubcategories.length > 0 
              ? (newImageSubcategories.length === 1 ? newImageSubcategories[0] : newImageSubcategories)
              : undefined,
            album: newAlbumUrls.filter(url => url.trim()).length > 0 
              ? newAlbumUrls.filter(url => url.trim())
              : undefined
          }
        : img
    );

    setGallery(updated);
    setEditingItem(null);
    setShowAddForm(false);
    setHasChanges(true);
  };

  const addAlbumUrl = () => {
    setNewAlbumUrls([...newAlbumUrls, '']);
  };

  const updateAlbumUrl = (index: number, value: string) => {
    const updated = [...newAlbumUrls];
    updated[index] = value;
    setNewAlbumUrls(updated);
  };

  const removeAlbumUrl = (index: number) => {
    setNewAlbumUrls(newAlbumUrls.filter((_, i) => i !== index));
  };

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Falha ao ler o arquivo'));
      reader.readAsDataURL(file);
    });

  const uploadToCloudinary = async (file: File, folder?: string): Promise<string> => {
    // Enviar pela API do Vercel (mesma origem) para evitar CORS e "Failed to fetch"
    const imageDataUrl = await fileToDataUrl(file);
    const res = await fetch('/api/upload-cloudinary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageDataUrl, folder: folder || 'portfolio' }),
    });
    // Ler o body só uma vez (evita "body stream already read")
    const text = await res.text();
    let data: { url?: string; secure_url?: string; message?: string; error?: string } = {};
    try {
      data = JSON.parse(text);
    } catch {
      // resposta não é JSON
    }
    if (res.ok) {
      return data.url || data.secure_url || '';
    }
    const msg = data.message || data.error || text || `Upload falhou: ${res.status}`;
    throw new Error(msg);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Arquivo muito grande. Máximo: 10MB');
      return;
    }

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, 'portfolio');
      setNewImageUrl(url);
      alert('✅ Foto principal enviada com sucesso!');
    } catch (error: any) {
      alert('❌ Erro ao fazer upload: ' + error.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAlbumUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingAlbum(true);
    try {
      // Upload em sequência para evitar "Failed to fetch" (muitas requisições em paralelo)
      const urls: string[] = [];
      const fileList = files as File[];
      for (const file of fileList) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 10 * 1024 * 1024) {
          alert(`Arquivo "${file.name}" ignorado: máximo 10MB.`);
          continue;
        }
        const url = await uploadToCloudinary(file, 'portfolio/albums');
        urls.push(url);
      }
      const currentUrls = newAlbumUrls.filter(url => url.trim());
      setNewAlbumUrls([...currentUrls, ...urls]);
      if (urls.length > 0) {
        alert(`✅ ${urls.length} foto(s) enviada(s) com sucesso!`);
      } else {
        alert('Nenhuma imagem válida foi enviada. Use arquivos de imagem (máx. 10MB cada).');
      }
    } catch (error: any) {
      const msg = error?.message || 'Erro desconhecido';
      const dica = msg.includes('fetch') || msg.includes('Network')
        ? '\n\nDica: tente enviar menos fotos de uma vez (ex.: 5) ou verifique sua conexão.'
        : '';
      alert('❌ Erro ao fazer upload: ' + msg + dica);
    } finally {
      setUploadingAlbum(false);
      if (albumFileInputRef.current) {
        albumFileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = async (e: React.DragEvent, isAlbum: boolean = false) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    
    if (isAlbum) {
      const input = albumFileInputRef.current;
      if (input) {
        const dt = new DataTransfer();
        files.forEach(file => dt.items.add(file));
        input.files = dt.files;
        handleAlbumUpload({ target: input } as any);
      }
    } else {
      const file = files[0];
      if (file) {
        const input = fileInputRef.current;
        if (input) {
          const dt = new DataTransfer();
          dt.items.add(file);
          input.files = dt.files;
          handleFileUpload({ target: input } as any);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const addHeroImage = () => {
    const url = prompt('Cole a URL da imagem:');
    if (url) {
      setHero([...hero, url]);
      setHasChanges(true);
    }
  };

  const removeHeroImage = (index: number) => {
    setHero(hero.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const updatePhotobookAlbumImages = (albumIndex: number, images: string[]) => {
    setPhotobook(prev => ({
      albums: prev.albums.map((a, i) => i === albumIndex ? { ...a, images } : a)
    }));
    setHasChanges(true);
  };

  const handlePhotobookAlbumUpload = async (albumIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;
    setUploadingPhotobookAlbum(albumIndex);
    try {
      const urls: string[] = [];
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 10 * 1024 * 1024) continue;
        const url = await uploadToCloudinary(file, 'portfolio/photobook');
        urls.push(url);
      }
      const album = photobook.albums[albumIndex];
      if (album && urls.length > 0) {
        updatePhotobookAlbumImages(albumIndex, [...album.images, ...urls]);
        alert(`✅ ${urls.length} foto(s) adicionada(s) ao álbum ${album.title}`);
      }
    } catch (err: any) {
      alert('❌ Erro ao fazer upload: ' + (err?.message || err));
    } finally {
      setUploadingPhotobookAlbum(null);
      if (photobookFileInputRef.current) photobookFileInputRef.current.value = '';
    }
  };

  const updateTestimonial = (index: number, next: TestimonialItem) => {
    setTestimonials(prev => prev.map((t, i) => i === index ? next : t));
    setHasChanges(true);
  };

  const addTestimonial = () => {
    setTestimonials(prev => [...prev, {
      names_pt: '', names_en: '', location_pt: '', location_en: '',
      quote_pt: '', quote_en: '', image: ''
    }]);
    setHasChanges(true);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(prev => prev.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const handleTestimonialImageUpload = async (testimonialIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setUploadingTestimonialImage(testimonialIndex);
    try {
      const url = await uploadToCloudinary(file, 'portfolio/testimonials');
      updateTestimonial(testimonialIndex, { ...testimonials[testimonialIndex], image: url });
      alert('✅ Foto do depoimento enviada com sucesso!');
    } catch (err: any) {
      alert('❌ Erro ao fazer upload: ' + (err?.message || err));
    } finally {
      setUploadingTestimonialImage(null);
      if (testimonialFileInputRef.current) testimonialFileInputRef.current.value = '';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full mx-4 animate-[slideUp_0.5s_ease]">
          <div className="text-center text-white py-10 px-8" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <h1 className="text-2xl font-semibold mb-2">Painel Administrativo</h1>
            <p className="opacity-90 text-sm">Lucas Lima Fotografia</p>
          </div>
          <div className="p-8">
            <div id="errorMessage" className="hidden bg-red-50 text-red-700 p-3 rounded-lg mb-5 text-sm">
              Usuário ou senha incorretos
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  autoFocus
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                />
              </div>
              <div className="flex items-center justify-between mb-6 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                  <span className="text-gray-600">Lembrar-me</span>
                </label>
                <a href="#" className="text-purple-600 font-medium hover:underline">Esqueceu a senha?</a>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                Entrar no Painel
              </button>
            </form>
          </div>
        </div>
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  const renderGalleryContent = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Galeria</h2>
        <button
          type="button"
          onClick={openAddForm}
          className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Novo álbum
        </button>
      </div>

      {showAddForm && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{editingItem ? 'Editar Foto' : 'Novo álbum'}</h3>
                  <button type="button" onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {!editingItem && (
                  <p className="text-sm text-gray-500 mb-4">Preencha a foto principal, título, categorias e (opcional) as URLs do álbum. Depois clique em &quot;Adicionar álbum&quot; e em &quot;Publicar&quot; para atualizar o site.</p>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Foto Principal *</label>
                    <div
                      onDrop={(e) => handleDrop(e, false)}
                      onDragOver={handleDragOver}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        uploading ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                          <span className="text-sm text-gray-600">Enviando...</span>
                        </div>
                      ) : newImageUrl ? (
                        <div className="flex flex-col items-center gap-2">
                          <img src={newImageUrl} alt="Preview" className="max-h-32 rounded" />
                          <span className="text-sm text-green-600">✓ Foto carregada</span>
                          <button type="button" onClick={() => setNewImageUrl('')} className="text-xs text-red-600 hover:text-red-800">
                            Remover
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 mb-2">Arraste uma foto aqui ou clique para selecionar</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="main-image-upload"
                          />
                          <label
                            htmlFor="main-image-upload"
                            className="inline-block bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition-colors"
                          >
                            Selecionar Arquivo
                          </label>
                        </>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">Ou cole uma URL:</p>
                      <input
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://exemplo.com/foto.jpg"
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Título</label>
                      <input
                        type="text"
                        value={newImageTitle}
                        onChange={(e) => setNewImageTitle(e.target.value)}
                        placeholder="Ex: Carol & Ricardo"
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Categorias (pode selecionar múltiplas)</label>
                      <div className="border border-gray-300 rounded p-3 space-y-2 max-h-40 overflow-y-auto">
                        {['Igreja', 'Campo', 'Praia', 'Hoteis', 'Cidades', 'Espaços de eventos'].map(cat => (
                          <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newImageCategories.includes(cat)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewImageCategories([...newImageCategories, cat]);
                                } else {
                                  setNewImageCategories(newImageCategories.filter(c => c !== cat));
                                  // Remove subcategorias da categoria removida
                                  const subcategories: { [key: string]: string[] } = {
                                    'Igreja': [],
                                    'Campo': ['Hotel Ort', 'Terras de Clara'],
                                    'Praia': ['Trancoso', 'Itacaré', 'Ilha Bela'],
                                    'Hoteis': ['Rosewood', 'Tangará', 'Txai'],
                                    'Cidades': ['São Paulo', 'Évora - Portugal'],
                                    'Espaços de eventos': ['Clube Monte Líbano', 'Hípica Paulista', 'Fundação Luisa Oscar Americano']
                                  };
                                  const subcatsToRemove = subcategories[cat] || [];
                                  setNewImageSubcategories(
                                    newImageSubcategories.filter(sub => !subcatsToRemove.includes(sub))
                                  );
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="text-sm">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subcategory Field */}
                  {(() => {
                    const subcategories: { [key: string]: string[] } = {
                      'Igreja': [],
                      'Campo': ['Hotel Ort', 'Terras de Clara'],
                      'Praia': ['Trancoso', 'Itacaré', 'Ilha Bela'],
                      'Hoteis': ['Rosewood', 'Tangará', 'Txai'],
                      'Cidades': ['São Paulo', 'Évora - Portugal'],
                      'Espaços de eventos': ['Clube Monte Líbano', 'Hípica Paulista', 'Fundação Luisa Oscar Americano']
                    };
                    
                    // Coletar todas as subcategorias das categorias selecionadas
                    const availableSubcategories: string[] = [];
                    newImageCategories.forEach(cat => {
                      const subcats = subcategories[cat] || [];
                      subcats.forEach(sub => {
                        if (!availableSubcategories.includes(sub)) {
                          availableSubcategories.push(sub);
                        }
                      });
                    });
                    
                    if (availableSubcategories.length > 0) {
                      return (
                        <div>
                          <label className="block text-sm font-medium mb-2">Subcategorias (pode selecionar múltiplas)</label>
                          <div className="border border-gray-300 rounded p-3 space-y-2 max-h-40 overflow-y-auto">
                            {availableSubcategories.map(subcat => (
                              <label key={subcat} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={newImageSubcategories.includes(subcat)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setNewImageSubcategories([...newImageSubcategories, subcat]);
                                    } else {
                                      setNewImageSubcategories(newImageSubcategories.filter(s => s !== subcat));
                                    }
                                  }}
                                  className="rounded border-gray-300"
                                />
                                <span className="text-sm">{subcat}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">Fotos do Álbum (opcional)</label>
                      <div className="flex gap-2">
                        <input
                          ref={albumFileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleAlbumUpload}
                          className="hidden"
                          id="album-images-upload"
                        />
                        <label
                          htmlFor="album-images-upload"
                          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                        >
                          <Upload className="w-4 h-4" />
                          {uploadingAlbum ? 'Enviando...' : 'Upload Múltiplo'}
                        </label>
                      </div>
                    </div>
                    {newAlbumUrls.map((url, index) => (
                      <div key={index} className="flex gap-2 mb-2 items-center">
                        {url && url.startsWith('http') && (
                          <img src={url} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded" />
                        )}
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => updateAlbumUrl(index, e.target.value)}
                          placeholder={`URL da foto ${index + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                        />
                        {newAlbumUrls.length > 1 && (
                          <button type="button" onClick={() => removeAlbumUrl(index)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addAlbumUrl} className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                      + Adicionar URL
                    </button>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={(e) => (editingItem ? handleUpdateImage() : handleAddImage(e))}
                      className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      {editingItem ? 'Atualizar' : 'Adicionar álbum'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Todas as Fotos</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {gallery.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-[3/4] bg-gray-100">
                      <img src={item.url} alt={item.title || 'Foto'} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => handleEditImage(item)}
                          className="bg-white p-2 rounded shadow-sm hover:bg-gray-50"
                        >
                          <Edit2 className="w-4 h-4 text-gray-700" />
                        </button>
                        <button
                          onClick={() => handleDeleteImage(item.id)}
                          className="bg-white p-2 rounded shadow-sm hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">{item.title || 'Sem título'}</h4>
                      <p className="text-sm text-gray-500">
                        {Array.isArray(item.category) ? item.category.join(', ') : item.category}
                        {item.subcategory && (
                          <span className="ml-2 text-gray-400">
                            ({Array.isArray(item.subcategory) ? item.subcategory.join(', ') : item.subcategory})
                          </span>
                        )}
                      </p>
                      {item.album && (
                        <p className="text-xs text-gray-400 mt-1">{item.album.length} foto(s) no álbum</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

  // Navegação entre seções do painel
  const showSection = (section: AdminSection) => {
    setActiveSection(section);
  };

  const getPageTitle = () => {
    const titles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'portfolio': 'Gerenciar Portfólio',
      'about': 'Página Sobre',
      'services': 'Serviços',
      'testimonials': 'Depoimentos',
      'blog': 'Blog',
      'gallery': 'Galeria de Fotos',
      'videos': 'Vídeos',
      'photobook': 'Álbuns/Livros',
      'seo': 'Configurações de SEO',
      'contact': 'Mensagens de Contato',
      'social': 'Redes Sociais',
      'settings': 'Configurações Gerais'
    };
    return titles[activeSection] || 'Dashboard';
  };

  return (
    <div className="fixed inset-0 z-[100] flex" style={{ background: '#f9fafb' }}>
      {/* Sidebar Navigation */}
      <aside className={`w-70 bg-gray-900 text-white fixed h-full overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} style={{ width: '280px' }}>
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold mb-1">Admin Panel</h2>
          <p className="text-sm opacity-70">Lucas Lima Fotografia</p>
        </div>
        <nav className="p-5">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider opacity-50 font-semibold mb-3 px-5">Principal</div>
            <button
              onClick={() => showSection('dashboard')}
              className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg transition-all ${
                activeSection === 'dashboard' 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xl">📊</span>
              <span>Dashboard</span>
            </button>
          </div>
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider opacity-50 font-semibold mb-3 px-5">Conteúdo</div>
            {['portfolio', 'about', 'services', 'testimonials', 'blog'].map((section) => {
              const icons: { [key: string]: string } = {
                'portfolio': '🖼️',
                'about': '👤',
                'services': '⚙️',
                'testimonials': '💬',
                'blog': '📝'
              };
              const labels: { [key: string]: string } = {
                'portfolio': 'Portfólio',
                'about': 'Sobre',
                'services': 'Serviços',
                'testimonials': 'Depoimentos',
                'blog': 'Blog'
              };
              return (
                <button
                  key={section}
                  onClick={() => showSection(section as AdminSection)}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg transition-all mb-1 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{icons[section]}</span>
                  <span>{labels[section]}</span>
                </button>
              );
            })}
          </div>
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider opacity-50 font-semibold mb-3 px-5">Mídia</div>
            {['gallery', 'photobook', 'videos'].map((section) => {
              const icons: { [key: string]: string } = {
                'gallery': '📷',
                'photobook': '📚',
                'videos': '🎥'
              };
              const labels: { [key: string]: string } = {
                'gallery': 'Galeria de Fotos',
                'photobook': 'Álbuns/Livros',
                'videos': 'Vídeos'
              };
              return (
                <button
                  key={section}
                  onClick={() => showSection(section as AdminSection)}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg transition-all mb-1 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{icons[section]}</span>
                  <span>{labels[section]}</span>
                </button>
              );
            })}
          </div>
          <div className="mb-8">
            <div className="text-xs uppercase tracking-wider opacity-50 font-semibold mb-3 px-5">Configurações</div>
            {['seo', 'contact', 'social', 'settings'].map((section) => {
              const icons: { [key: string]: string } = {
                'seo': '🔍',
                'contact': '✉️',
                'social': '🌐',
                'settings': '⚙️'
              };
              const labels: { [key: string]: string } = {
                'seo': 'SEO',
                'contact': 'Contatos',
                'social': 'Redes Sociais',
                'settings': 'Configurações'
              };
              return (
                <button
                  key={section}
                  onClick={() => showSection(section as AdminSection)}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg transition-all mb-1 ${
                    activeSection === section 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{icons[section]}</span>
                  <span>{labels[section]}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-70" style={{ marginLeft: sidebarOpen ? '280px' : '0' }}>
        {/* Top Bar */}
        <div className="bg-white px-8 py-5 flex justify-between items-center shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                AL
              </div>
              <div>
                <div className="font-semibold text-sm">Admin</div>
                <div className="text-xs text-gray-500">Administrador</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          {activeSection === 'dashboard' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { title: 'Total de Fotos', value: gallery.length, change: '+12% este mês', icon: '📷', color: 'bg-blue-100 text-blue-600' },
                  { title: 'Projetos', value: gallery.filter(img => img.album).length, change: '+8% este mês', icon: '🎯', color: 'bg-green-100 text-green-600' },
                  { title: 'Visualizações', value: '12.5K', change: '+23% este mês', icon: '👁️', color: 'bg-yellow-100 text-yellow-600' },
                  { title: 'Contatos', value: '28', change: '+5% este mês', icon: '✉️', color: 'bg-purple-100 text-purple-600' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500 font-medium">{stat.title}</span>
                      <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl ${stat.color}`}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-green-600">{stat.change}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-lg font-semibold mb-6 text-gray-800">Últimas Atividades</h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Descrição</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Data</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">📷 Foto</td>
                      <td className="py-4 px-4">Nova foto adicionada ao portfólio</td>
                      <td className="py-4 px-4 text-gray-600">22/01/2026</td>
                      <td className="py-4 px-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Publicado</span></td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">📝 Blog</td>
                      <td className="py-4 px-4">Novo artigo publicado</td>
                      <td className="py-4 px-4 text-gray-600">21/01/2026</td>
                      <td className="py-4 px-4"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Publicado</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-4 px-4">✉️ Contato</td>
                      <td className="py-4 px-4">Nova solicitação de orçamento</td>
                      <td className="py-4 px-4 text-gray-600">20/01/2026</td>
                      <td className="py-4 px-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">Pendente</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'gallery' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Galeria</h2>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setNewImageUrl('');
                    setNewImageTitle('');
                    setNewImageCategories(['Igreja']);
                    setNewImageSubcategories([]);
                    setNewAlbumUrls(['']);
                    setShowAddForm(true);
                    setActiveTab('pages');
                    setActiveSubTab('gallery');
                  }}
                  className="px-5 py-2.5 rounded-lg text-white font-medium transition-all hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  + Adicionar Foto
                </button>
              </div>
              {publishStatus && (
                <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${publishStatus.error ? 'bg-red-50 border-red-200 text-red-800' : publishStatus.tokenSet ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                  {publishStatus.error ? (
                    <p><strong>Publicação automática:</strong> {publishStatus.error}</p>
                  ) : publishStatus.tokenSet ? (
                    <p><strong>✓ Configurado.</strong> Repositório: <code className="bg-white/70 px-1 rounded">{publishStatus.repo}</code> — ao clicar em Publicar, o Vercel fará o deploy em 1–2 min.</p>
                  ) : (
                    <p><strong>⚠ Token não configurado.</strong> As alterações não vão para o Vercel. No Vercel → Project → Settings → Environment Variables, adicione <code className="bg-white/70 px-1 rounded">GITHUB_TOKEN</code> (token do GitHub com permissão <strong>repo</strong>). Depois faça um Redeploy.</p>
                  )}
                </div>
              )}
              {renderGalleryContent()}
            </div>
          )}

          {activeSection === 'photobook' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Álbuns/Livros</h2>
              <p className="text-sm text-gray-500 mb-6">Edite as fotos de cada formato de álbum (30×30, 30×40, etc.). Adicione URLs ou faça upload — depois clique em Publicar.</p>
              <input
                ref={photobookFileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  const idx = selectedPhotobookAlbumForUpload;
                  if (idx !== null) handlePhotobookAlbumUpload(idx, e);
                  setSelectedPhotobookAlbumForUpload(null);
                }}
              />
              {photobook.albums.length === 0 ? (
                <p className="text-gray-500 py-8">Nenhum álbum na página Álbuns/Livros. Adicione em <code>images.json</code> com <code>photobook.albums</code>.</p>
              ) : (
                photobook.albums.map((album, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{album.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{album.subtitle}</p>
                    <div className="space-y-2 mb-4">
                      {album.images.map((url, imgIdx) => (
                        <div key={imgIdx} className="flex gap-2 items-center">
                          {url && url.startsWith('http') && (
                            <img src={url} alt="" className="w-16 h-16 object-cover rounded flex-shrink-0" />
                          )}
                          <input
                            value={url}
                            onChange={(e) => {
                              const next = [...album.images];
                              next[imgIdx] = e.target.value;
                              updatePhotobookAlbumImages(idx, next);
                            }}
                            placeholder={`URL da foto ${imgIdx + 1}`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => updatePhotobookAlbumImages(idx, album.images.filter((_, i) => i !== imgIdx))}
                            className="text-red-600 hover:text-red-800 p-2"
                            aria-label="Remover"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => updatePhotobookAlbumImages(idx, [...album.images, ''])}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Adicionar URL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPhotobookAlbumForUpload(idx);
                          photobookFileInputRef.current?.click();
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Upload className="w-4 h-4" />
                        {uploadingPhotobookAlbum === idx ? 'Enviando...' : 'Upload múltiplo'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSection === 'testimonials' && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Depoimentos</h2>
              <p className="text-sm text-gray-500 mb-6">Edite os depoimentos da página Depoimentos. Campos em PT e EN. Depois clique em Publicar.</p>
              <input
                ref={testimonialFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const idx = selectedTestimonialForUpload;
                  if (idx !== null) handleTestimonialImageUpload(idx, e);
                  setSelectedTestimonialForUpload(null);
                }}
              />
              <div className="mb-4">
                <button
                  type="button"
                  onClick={addTestimonial}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar depoimento
                </button>
              </div>
              {testimonials.length === 0 ? (
                <p className="text-gray-500 py-8">Nenhum depoimento. Clique em &quot;Adicionar depoimento&quot;.</p>
              ) : (
                testimonials.map((t, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-gray-800">Depoimento {idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                        aria-label="Remover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Nomes (PT)</label>
                        <input
                          value={t.names_pt}
                          onChange={(e) => updateTestimonial(idx, { ...t, names_pt: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="Ex: Mariana & Felipe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Nomes (EN)</label>
                        <input
                          value={t.names_en}
                          onChange={(e) => updateTestimonial(idx, { ...t, names_en: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="Mariana & Felipe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Local (PT)</label>
                        <input
                          value={t.location_pt}
                          onChange={(e) => updateTestimonial(idx, { ...t, location_pt: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="Ex: Toscana, Itália"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Local (EN)</label>
                        <input
                          value={t.location_en}
                          onChange={(e) => updateTestimonial(idx, { ...t, location_en: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                          placeholder="Tuscany, Italy"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Depoimento (PT)</label>
                      <textarea
                        value={t.quote_pt}
                        onChange={(e) => updateTestimonial(idx, { ...t, quote_pt: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm min-h-[80px]"
                        placeholder="Texto do depoimento em português"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Depoimento (EN)</label>
                      <textarea
                        value={t.quote_en}
                        onChange={(e) => updateTestimonial(idx, { ...t, quote_en: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm min-h-[80px]"
                        placeholder="Testimonial text in English"
                      />
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      {t.image && t.image.startsWith('http') && (
                        <img src={t.image} alt="" className="w-20 h-20 object-cover rounded flex-shrink-0" />
                      )}
                      <input
                        value={t.image}
                        onChange={(e) => updateTestimonial(idx, { ...t, image: e.target.value })}
                        placeholder="URL da foto do casal"
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTestimonialForUpload(idx);
                          testimonialFileInputRef.current?.click();
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 whitespace-nowrap"
                      >
                        <Upload className="w-4 h-4" />
                        {uploadingTestimonialImage === idx ? 'Enviando...' : 'Upload'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {(activeSection === 'portfolio' || activeSection === 'about' || activeSection === 'services' || 
            activeSection === 'blog' || activeSection === 'videos' || 
            activeSection === 'seo' || activeSection === 'contact' || activeSection === 'social' || 
            activeSection === 'settings') && (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="text-gray-500 text-center py-12">Seção {getPageTitle()} em desenvolvimento</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between sticky bottom-0">
          <button
            onClick={handlePreview}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            Preview
          </button>
          <div className="flex items-center gap-4">
            {hasChanges && (
              <span className="text-sm text-yellow-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Alterações não salvas
              </span>
            )}
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 relative disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {publishing ? 'Publicando...' : 'Publicar'}
              {hasChanges && !publishing && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>}
            </button>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <a href={window.location.origin} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {window.location.hostname}
            </a>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </main>
    </div>
  );
};

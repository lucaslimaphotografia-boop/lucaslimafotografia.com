import React, { useState, useEffect, useRef } from 'react';
import { ImageItem, Language } from '../types';
import imagesData from '../images.json';
import { translations } from '../translations';
import { 
  Save, Plus, Trash2, Edit2, Image as ImageIcon, 
  Settings, Eye, EyeOff, Upload, X, Check, Download, Loader2,
  FileText, PenTool, Palette, Bell, HelpCircle, User, ChevronRight,
  Home, ExternalLink, Globe, Search, Eye as EyeIcon, MoreVertical,
  ChevronDown
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
  lang: Language;
}

type AdminTab = 'pages' | 'content' | 'design' | 'settings';
type AdminSubTab = 'gallery' | 'hero' | 'portfolio' | 'translations' | 'seo' | 'social' | 'analytics';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, lang }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('pages');
  const [activeSubTab, setActiveSubTab] = useState<AdminSubTab>('gallery');
  const [gallery, setGallery] = useState<ImageItem[]>(imagesData.gallery);
  const [hero, setHero] = useState<string[]>(imagesData.hero);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingItem, setEditingItem] = useState<ImageItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [newImageCategory, setNewImageCategory] = useState('Festa');
  const [newAlbumUrls, setNewAlbumUrls] = useState<string[]>(['']);
  const [hasChanges, setHasChanges] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadingAlbum, setUploadingAlbum] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const albumFileInputRef = useRef<HTMLInputElement>(null);

  // Senha padrão
  const ADMIN_PASSWORD = 'lucaslima2024';

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      setPassword('');
    } else {
      alert('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        gallery,
        hero
      };

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

  const handlePublish = () => {
    if (hasChanges) {
      handleSave();
    }
    alert('🚀 Publicando alterações...\n\nAs alterações serão aplicadas após o deploy automático.');
  };

  const handlePreview = () => {
    window.open(window.location.origin, '_blank');
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) {
      alert('Por favor, adicione uma URL de imagem');
      return;
    }

    const newId = Math.max(...gallery.map(img => img.id), 0) + 1;
    const newImage: ImageItem = {
      id: newId,
      url: newImageUrl,
      category: newImageCategory,
      title: newImageTitle || undefined,
      album: newAlbumUrls.filter(url => url.trim()).length > 0 
        ? newAlbumUrls.filter(url => url.trim())
        : undefined
    };

    setGallery([...gallery, newImage]);
    setNewImageUrl('');
    setNewImageTitle('');
    setNewAlbumUrls(['']);
    setShowAddForm(false);
    setHasChanges(true);
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
    setNewImageCategory(item.category);
    setNewAlbumUrls(item.album && item.album.length > 0 ? item.album : ['']);
    setShowAddForm(true);
  };

  const handleUpdateImage = () => {
    if (!editingItem || !newImageUrl.trim()) return;

    const updated = gallery.map(img => 
      img.id === editingItem.id 
        ? {
            ...img,
            url: newImageUrl,
            title: newImageTitle || undefined,
            category: newImageCategory,
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

  const uploadToCloudinary = async (file: File, folder?: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const uploadPreset = 'ml_default';
    formData.append('upload_preset', uploadPreset);
    
    if (folder) {
      formData.append('folder', folder);
    }

    const cloudName = 'di6xabxne';

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Upload failed: ${errorText}`;
      
      if (errorText.includes('whitelisted')) {
        errorMessage = `❌ Erro de Configuração!\n\nO preset "${uploadPreset}" precisa estar configurado como "Unsigned" no Cloudinary.\n\n🔧 Como corrigir:\n1. Acesse: https://cloudinary.com/console\n2. Vá em Settings → Upload → Upload presets\n3. Encontre o preset "${uploadPreset}"\n4. Edite e configure "Signing mode" como "Unsigned"\n5. Salve e tente novamente`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.secure_url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');
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
      const uploadPromises = files.map(file => uploadToCloudinary(file, 'portfolio/albums'));
      const urls = await Promise.all(uploadPromises);
      const currentUrls = newAlbumUrls.filter(url => url.trim());
      setNewAlbumUrls([...currentUrls, ...urls]);
      alert(`✅ ${urls.length} foto(s) enviada(s) com sucesso!`);
    } catch (error: any) {
      alert('❌ Erro ao fazer upload: ' + error.message);
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

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-gray-50 z-[100] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="inline-block bg-black text-white text-2xl font-black px-4 py-2 mb-4">L</div>
            <h2 className="text-2xl font-bold">Painel de Administração</h2>
            <p className="text-gray-600 mt-2">Digite a senha para acessar</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Senha"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === 'pages') {
      if (activeSubTab === 'gallery') {
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Galeria</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewImageUrl('');
                  setNewImageTitle('');
                  setNewImageCategory('Festa');
                  setNewAlbumUrls(['']);
                  setShowAddForm(true);
                }}
                className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                Adicionar Foto
              </button>
            </div>

            {showAddForm && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">{editingItem ? 'Editar Foto' : 'Nova Foto'}</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

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
                          <button onClick={() => setNewImageUrl('')} className="text-xs text-red-600 hover:text-red-800">
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
                      <label className="block text-sm font-medium mb-2">Categoria</label>
                      <select
                        value={newImageCategory}
                        onChange={(e) => setNewImageCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      >
                        <option>Festa</option>
                        <option>Noiva</option>
                        <option>Noivo</option>
                        <option>Detalhes</option>
                        <option>Editorial</option>
                        <option>Preto & Branco</option>
                        <option>Imprensa</option>
                      </select>
                    </div>
                  </div>

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
                          <button onClick={() => removeAlbumUrl(index)} className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button onClick={addAlbumUrl} className="text-sm text-blue-600 hover:text-blue-800 mt-2">
                      + Adicionar URL
                    </button>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={editingItem ? handleUpdateImage : handleAddImage}
                      className="bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      {editingItem ? 'Atualizar' : 'Adicionar'}
                    </button>
                    <button
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
                      <p className="text-sm text-gray-500">{item.category}</p>
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
      }
    }

    if (activeTab === 'settings') {
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6">Configurações</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Site Settings</h3>
              <div className="space-y-3">
                {['Domain', 'SEO Manager', 'Blog', 'Social', 'Tracking & Analytics', 'Advanced'].map((item) => (
                  <button
                    key={item}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="font-medium">{item}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Tools</h3>
              <div className="space-y-3">
                {['Form Submissions', 'Draft Sites', 'Trash'].map((item) => (
                  <button
                    key={item}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <span className="font-medium">{item}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Conteúdo em desenvolvimento</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-[100] flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white text-xl font-black px-3 py-2 rounded">L</div>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded transition-colors">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Website</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">LL</span>
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setActiveTab('pages'); setActiveSubTab('gallery'); }}
            className={`px-4 py-3 flex items-center gap-2 transition-colors relative ${
              activeTab === 'pages' ? 'text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Páginas</span>
            {activeTab === 'pages' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />}
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-3 flex items-center gap-2 transition-colors relative ${
              activeTab === 'content' ? 'text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <PenTool className="w-5 h-5" />
            <span className="font-medium">Conteúdo</span>
            {activeTab === 'content' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />}
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`px-4 py-3 flex items-center gap-2 transition-colors relative ${
              activeTab === 'design' ? 'text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span className="font-medium">Design</span>
            {activeTab === 'design' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />}
          </button>
          <button
            onClick={() => { setActiveTab('settings'); setActiveSubTab('seo'); }}
            className={`px-4 py-3 flex items-center gap-2 transition-colors relative ${
              activeTab === 'settings' ? 'text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
            {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'pages' && (
          <div className="mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveSubTab('gallery')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSubTab === 'gallery' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Galeria
              </button>
              <button
                onClick={() => setActiveSubTab('portfolio')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSubTab === 'portfolio' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Portfólio
              </button>
            </div>
          </div>
        )}
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between">
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
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2 relative"
          >
            Publicar
            {hasChanges && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>}
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
    </div>
  );
};

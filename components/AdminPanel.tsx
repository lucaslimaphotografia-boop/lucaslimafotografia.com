import React, { useState, useEffect, useRef } from 'react';
import { ImageItem, Language } from '../types';
import imagesData from '../images.json';
import { translations } from '../translations';
import { 
  Save, Plus, Trash2, Edit2, Image as ImageIcon, 
  Settings, Eye, EyeOff, Upload, X, Check, Download, Loader2
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
  lang: Language;
}

type AdminTab = 'gallery' | 'hero' | 'translations' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack, lang }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('gallery');
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const albumFileInputRef = useRef<HTMLInputElement>(null);

  // Senha padrão (em produção, use autenticação adequada)
  const ADMIN_PASSWORD = 'lucaslima2024';

  useEffect(() => {
    // Verificar se já está autenticado
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

      // Salvar backup no localStorage
      localStorage.setItem('admin_images_backup', JSON.stringify(updatedData));
      
      // Criar arquivo para download
      const blob = new Blob([JSON.stringify(updatedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.json';
      a.click();
      URL.revokeObjectURL(url);

      setHasChanges(false);
      
      // Mostrar instruções completas
      const message = `✅ Dados salvos!\n\n` +
        `📥 O arquivo images.json foi baixado.\n\n` +
        `📋 Próximos passos:\n` +
        `1. Substitua o arquivo images.json no projeto\n` +
        `2. Execute: git add images.json\n` +
        `3. Execute: git commit -m "Update images"\n` +
        `4. Execute: git push origin main\n` +
        `5. Aguarde o deploy no Vercel (~1-2 min)\n\n` +
        `💡 Dica: As fotos já estão no Cloudinary e prontas para uso!`;
      
      alert(message);
    } catch (error) {
      alert('❌ Erro ao salvar: ' + error);
    }
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

  // Upload de imagem para Cloudinary
  const uploadToCloudinary = async (file: File, folder?: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    // CRÍTICO: Upload preset é obrigatório para uploads unsigned
    const uploadPreset = 'ml_default'; // Nome do preset configurado no Cloudinary
    formData.append('upload_preset', uploadPreset);
    
    if (folder) {
      formData.append('folder', folder);
    }

    // Usar upload preset do Cloudinary (unsigned)
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
      
      // Mensagens de erro mais amigáveis
      if (errorText.includes('whitelisted')) {
        errorMessage = `❌ Erro de Configuração!\n\n` +
          `O preset "${uploadPreset}" precisa estar configurado como "Unsigned" no Cloudinary.\n\n` +
          `🔧 Como corrigir:\n` +
          `1. Acesse: https://cloudinary.com/console\n` +
          `2. Vá em Settings → Upload → Upload presets\n` +
          `3. Encontre o preset "${uploadPreset}"\n` +
          `4. Edite e configure "Signing mode" como "Unsigned"\n` +
          `5. Salve e tente novamente\n\n` +
          `📖 Veja o guia: GUIA_UPLOAD_CLOUDINARY.md`;
      } else if (errorText.includes('preset')) {
        errorMessage = `❌ Preset não encontrado!\n\n` +
          `O preset "${uploadPreset}" não existe no Cloudinary.\n\n` +
          `🔧 Crie o preset:\n` +
          `1. Acesse: https://cloudinary.com/console\n` +
          `2. Vá em Settings → Upload → Upload presets\n` +
          `3. Clique em "Add upload preset"\n` +
          `4. Nome: "${uploadPreset}"\n` +
          `5. Signing mode: "Unsigned"\n` +
          `6. Salve e tente novamente`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Retornar URL otimizada
    return data.secure_url.replace('/upload/', '/upload/w_1200,q_auto,f_auto/');
  };

  // Handler para upload de foto principal
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    // Validar tamanho (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Arquivo muito grande. Máximo: 10MB');
      return;
    }

    setUploading(true);
    setUploadProgress({ main: 0 });

    try {
      const url = await uploadToCloudinary(file, 'portfolio');
      setNewImageUrl(url);
      setUploadProgress({ main: 100 });
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

  // Handler para upload múltiplo de álbum
  const handleAlbumUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validar arquivos
    const invalidFiles = files.filter(f => !f.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      alert('Por favor, selecione apenas arquivos de imagem');
      return;
    }

    const oversizedFiles = files.filter(f => f.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      alert('Alguns arquivos são muito grandes. Máximo: 10MB por arquivo');
      return;
    }

    setUploadingAlbum(true);
    setUploadProgress({});

    try {
      const uploadPromises = files.map(async (file, index) => {
        setUploadProgress(prev => ({ ...prev, [index]: 0 }));
        const url = await uploadToCloudinary(file, 'portfolio/albums');
        setUploadProgress(prev => ({ ...prev, [index]: 100 }));
        return url;
      });

      const urls = await Promise.all(uploadPromises);
      
      // Adicionar URLs ao array de álbum
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

  // Drag and drop handlers
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
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Painel de Administração</h2>
          <p className="text-gray-600 mb-6">Digite a senha para acessar</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Senha"
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            autoFocus
          />
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={onBack}
            className="w-full mt-2 text-gray-600 py-2"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 z-[100] overflow-y-auto">
      {/* Header */}
      <div className="bg-black text-white p-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold">Painel de Administração</h1>
          <p className="text-sm text-gray-400">Gerencie o conteúdo do site</p>
        </div>
        <div className="flex items-center gap-4">
          {hasChanges && (
            <span className="text-yellow-400 text-sm">● Alterações não salvas</span>
          )}
          <button
            onClick={handleSave}
            className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Save className="w-4 h-4" />
            Salvar
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Sair
          </button>
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-[73px] z-10">
        <div className="flex gap-1 px-4">
          {(['gallery', 'hero', 'translations', 'settings'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab === 'gallery' && 'Galeria'}
              {tab === 'hero' && 'Página Inicial'}
              {tab === 'translations' && 'Traduções'}
              {tab === 'settings' && 'Configurações'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gerenciar Galeria</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setNewImageUrl('');
                  setNewImageTitle('');
                  setNewImageCategory('Festa');
                  setNewAlbumUrls(['']);
                  setShowAddForm(true);
                }}
                className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Foto
              </button>
            </div>

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    {editingItem ? 'Editar Foto' : 'Nova Foto'}
                  </h3>
                  <button onClick={() => setShowAddForm(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Upload de Foto Principal */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Foto Principal *</label>
                    
                    {/* Área de Drag & Drop */}
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
                          <button
                            onClick={() => setNewImageUrl('')}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            Remover
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 mb-2">
                            Arraste uma foto aqui ou clique para selecionar
                          </p>
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

                    {/* Ou colar URL */}
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
                        <button
                          onClick={addAlbumUrl}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          + Adicionar URL
                        </button>
                      </div>
                    </div>

                    {/* Área de Drag & Drop para Álbum */}
                    {!uploadingAlbum && newAlbumUrls.filter(url => url.trim()).length === 0 && (
                      <div
                        onDrop={(e) => handleDrop(e, true)}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors mb-4"
                      >
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Arraste múltiplas fotos aqui ou use o botão "Upload Múltiplo"
                        </p>
                      </div>
                    )}

                    {uploadingAlbum && (
                      <div className="border border-blue-300 rounded-lg p-4 mb-4 bg-blue-50">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                          <span className="text-sm text-gray-600">Enviando fotos...</span>
                        </div>
                      </div>
                    )}

                    {/* Lista de URLs do Álbum */}
                    {newAlbumUrls.map((url, index) => (
                      <div key={index} className="flex gap-2 mb-2 items-center">
                        {url && url.startsWith('http') && (
                          <img src={url} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded" />
                        )}
                        <input
                          type="text"
                          value={url}
                          onChange={(e) => updateAlbumUrl(index, e.target.value)}
                          placeholder={`URL da foto ${index + 1} do álbum`}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                        />
                        {newAlbumUrls.length > 1 && (
                          <button
                            onClick={() => removeAlbumUrl(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={editingItem ? handleUpdateImage : handleAddImage}
                      className="bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      {editingItem ? 'Atualizar' : 'Adicionar'}
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Gallery List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-100 relative">
                    <img
                      src={item.url}
                      alt={item.title || 'Foto'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="600"%3E%3Crect fill="%23ddd" width="400" height="600"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagem não encontrada%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        onClick={() => handleEditImage(item)}
                        className="bg-white/90 hover:bg-white p-2 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteImage(item.id)}
                        className="bg-red-500/90 hover:bg-red-600 text-white p-2 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{item.title || 'Sem título'}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                    {item.album && item.album.length > 0 && (
                      <p className="text-xs text-gray-500">
                        {item.album.length} foto{item.album.length > 1 ? 's' : ''} no álbum
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Tab */}
        {activeTab === 'hero' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Fotos da Página Inicial</h2>
              <button
                onClick={addHeroImage}
                className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Adicionar Foto
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {hero.map((url, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-100 relative">
                    <img
                      src={url}
                      alt={`Hero ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeHeroImage(index)}
                      className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white p-2 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-2 text-xs text-center text-gray-600">
                    Foto {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Translations Tab */}
        {activeTab === 'translations' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Traduções</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Atenção:</strong> As traduções estão em código TypeScript. 
                Para editar, modifique o arquivo <code>translations.ts</code> diretamente.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold mb-4">Estrutura de Traduções</h3>
              <pre className="bg-gray-50 p-4 rounded text-xs overflow-x-auto">
                {JSON.stringify(translations, null, 2).substring(0, 500)}...
              </pre>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Configurações</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-bold mb-4">Como Usar o Painel</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>Edite as fotos na aba <strong>Galeria</strong></li>
                  <li>Adicione ou remova fotos da <strong>Página Inicial</strong></li>
                  <li>Clique em <strong>Salvar</strong> para baixar o arquivo atualizado</li>
                  <li>Substitua o arquivo <code>images.json</code> no projeto</li>
                  <li>Faça commit e push para atualizar o site</li>
                </ol>
              </div>

              <div>
                <h3 className="font-bold mb-4">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-2xl font-bold">{gallery.length}</div>
                    <div className="text-sm text-gray-600">Fotos na Galeria</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-2xl font-bold">{hero.length}</div>
                    <div className="text-sm text-gray-600">Fotos na Página Inicial</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Exportar Dados</h3>
                <button
                  onClick={handleSave}
                  className="bg-black text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Baixar images.json
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

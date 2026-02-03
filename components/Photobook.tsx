import React, { useState } from 'react';
import { ArrowRight, Phone, Mail, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import imagesData from '../images.json';

interface PhotobookProps {
  lang: Language;
}

const OUR_BOOK_VIDEO = {
  mp4: 'https://res.cloudinary.com/di6xabxne/video/upload/c_fill,w_900,h_1200,q_auto:good,vc_h264,f_mp4/v1770134964/LL_-_Logo_hq8w6i.mp4',
  poster: 'https://res.cloudinary.com/di6xabxne/video/upload/c_fill,w_900,h_1200,q_auto,f_jpg,so_0/v1770134964/LL_-_Logo_hq8w6i.jpg'
};

const DEFAULT_ALBUMS = [
  { title: '30×30', subtitle: 'Formato Quadrado Clássico', description: '100 fotos em 60 páginas', details: 'O equilíbrio perfeito entre formato e conteúdo. Ideal para quem busca harmonia visual em cada spread.', images: [] as string[] },
  { title: '30×40', subtitle: 'Panorâmico', description: '100 fotos em 60 páginas', details: 'Formato horizontal que valoriza paisagens e momentos amplos. Perfeito para casamentos ao ar livre.', images: [] as string[] },
  { title: '40×30', subtitle: 'Vertical', description: '100 fotos em 60 páginas', details: 'O formato vertical exclusivo que destaca retratos e momentos especiais com elegância.', images: [] as string[] },
  { title: '35×35', subtitle: 'Grande Formato', description: '100 fotos em 60 páginas', details: 'Nosso maior quadrado. Presença marcante para histórias que merecem destaque.', images: [] as string[] },
  { title: '15×15', subtitle: 'Mini Álbum', description: '100 fotos em 60 páginas', details: 'Compacto, charmoso e perfeito para presentear. Memórias íntimas em formato delicado.', images: [] as string[] }
];

export const Photobook: React.FC<PhotobookProps> = ({ lang }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  const albums = (imagesData as { photobook?: { albums?: Array<{ title: string; subtitle: string; description: string; details: string; images: string[] }> } }).photobook?.albums?.length
    ? (imagesData as { photobook: { albums: Array<{ title: string; subtitle: string; description: string; details: string; images: string[] }> } }).photobook.albums
    : DEFAULT_ALBUMS;

  const nextImage = (albumIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [albumIndex]: ((prev[albumIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (albumIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [albumIndex]: ((prev[albumIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const getCurrentImage = (albumIndex: number) => {
    return currentImageIndex[albumIndex] || 0;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Minimalista */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-sm uppercase tracking-[0.3em] text-neutral-500">
              Lucas Lima Studio
            </span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight text-neutral-900">
            Álbuns
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-16 max-w-2xl mx-auto font-light">
            Preservando memórias através<br/>de design atemporal
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="#produtos"
              className="text-neutral-900 border border-neutral-900 px-8 py-4 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
            >
              Explorar Produtos
            </a>
            <a 
              href="#contato"
              className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm uppercase tracking-wider inline-flex items-center gap-2"
            >
              Entre em Contato
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-neutral-400" />
        </div>
      </section>

      {/* Our Book - Seção Editorial */}
      <section className="py-32 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-8 block">
                Lançamento 2026
              </span>
              
              <h2 className="text-6xl md:text-7xl font-light mb-8 text-neutral-900">
                Our<br/>Book
              </h2>
              
              <div className="space-y-6 text-lg text-neutral-600 leading-relaxed font-light mb-12">
                <p>
                  Mais que um álbum de fotos. Um verdadeiro livro que narra a história completa 
                  do seu casamento em palavras e imagens.
                </p>
                
                <p>
                  De 200 a 300 fotografias cuidadosamente editadas em até 400 páginas. 
                  Cada capítulo conta um momento: a preparação, os detalhes, a cerimônia, a festa.
                </p>
                
                <p className="text-neutral-900 font-normal">
                  25 × 32 cm • Até 400 páginas
                </p>
              </div>

              <a 
                href="#contato"
                className="inline-block text-neutral-900 border border-neutral-900 px-8 py-4 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
              >
                Solicitar Orçamento
              </a>
            </div>

            <div className="aspect-[3/4] bg-neutral-200 relative group overflow-hidden">
              <video
                className="absolute inset-0 block h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={OUR_BOOK_VIDEO.poster}
                aria-label="Vídeo do Our Book"
              >
                <source src={OUR_BOOK_VIDEO.mp4} type="video/mp4" />
                <source
                  src="https://res.cloudinary.com/di6xabxne/video/upload/v1770134964/LL_-_Logo_hq8w6i.mp4"
                  type="video/mp4; codecs=hvc1"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Álbuns - Grid Minimalista */}
      <section id="produtos" className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
              Coleção
            </span>
            <h2 className="text-5xl md:text-6xl font-light text-neutral-900">
              Álbuns Tradicionais
            </h2>
          </div>

          <div className="space-y-0">
            {albums.map((album, index) => (
              <div 
                key={index}
                className="border-t border-neutral-200 py-12 group hover:bg-neutral-50 transition-colors duration-300"
                onMouseEnter={() => setActiveSection(index)}
              >
                <div className="grid lg:grid-cols-12 gap-8 items-center px-8">
                  {/* Galeria de Imagens */}
                  <div className="lg:col-span-5 relative">
                    <div className="aspect-[4/3] bg-neutral-200 relative overflow-hidden">
                      {/* Imagem atual */}
                      <img 
                        src={album.images[getCurrentImage(index)] || 'https://res.cloudinary.com/di6xabxne/image/upload/v1769107313/placeholder.jpg'}
                        alt={`${album.title} - Imagem ${getCurrentImage(index) + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Controles de navegação */}
                    {album.images.length > 0 && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                      <button
                        onClick={() => prevImage(index, album.images.length)}
                        className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white border border-neutral-200 transition-colors"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="w-5 h-5 text-neutral-900" />
                      </button>
                      
                      <button
                        onClick={() => nextImage(index, album.images.length)}
                        className="w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-white border border-neutral-200 transition-colors"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="w-5 h-5 text-neutral-900" />
                      </button>
                    </div>
                    )}

                    {/* Indicadores de paginação */}
                    {album.images.length > 0 && (
                    <div className="flex gap-2 justify-center mt-4">
                      {album.images.map((_, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() => setCurrentImageIndex(prev => ({
                            ...prev,
                            [index]: imgIndex
                          }))}
                          className={`h-1 transition-all ${
                            getCurrentImage(index) === imgIndex 
                              ? 'w-8 bg-neutral-900' 
                              : 'w-4 bg-neutral-300 hover:bg-neutral-400'
                          }`}
                          aria-label={`Ir para imagem ${imgIndex + 1}`}
                        />
                      ))}
                    </div>
                    )}
                  </div>

                  {/* Informações do Álbum */}
                  <div className="lg:col-span-7 grid md:grid-cols-12 gap-6">
                    <div className="md:col-span-3">
                      <h3 className="text-4xl font-light text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {album.title}
                      </h3>
                    </div>
                    
                    <div className="md:col-span-6">
                      <h4 className="text-xl font-light mb-2 text-neutral-900">{album.subtitle}</h4>
                      <p className="text-neutral-500 text-sm uppercase tracking-wider mb-4">{album.description}</p>
                      <p className="text-neutral-600 font-light leading-relaxed">{album.details}</p>
                    </div>

                    <div className="md:col-span-3 flex items-start justify-end">
                      <a 
                        href="#contato"
                        className="text-neutral-600 group-hover:text-neutral-900 transition-colors inline-flex items-center gap-2 text-sm uppercase tracking-wider"
                      >
                        Consultar
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-neutral-200"></div>
          </div>
        </div>
      </section>

      {/* Personalização */}
      <section className="py-32 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-8 block">
            Sob Consulta
          </span>
          
          <h2 className="text-5xl md:text-6xl font-light mb-8 text-neutral-900">
            Personalização
          </h2>
          
          <p className="text-xl text-neutral-600 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            Tecidos especiais, bordados exclusivos e acabamentos personalizados 
            para tornar seu álbum verdadeiramente único.
          </p>

          <a 
            href="#contato"
            className="inline-block text-neutral-900 border border-neutral-900 px-8 py-4 hover:bg-neutral-900 hover:text-white transition-all duration-300 text-sm uppercase tracking-wider"
          >
            Solicitar Personalização
          </a>
        </div>
      </section>

      {/* Detalhes e Processo */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-12 text-neutral-900">
                Processo
              </h2>
              
              <div className="space-y-12">
                <div>
                  <div className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-3">01</div>
                  <h3 className="text-2xl font-light mb-3 text-neutral-900">Consulta Inicial</h3>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Conversamos sobre sua história, estilo e expectativas para criar um projeto único.
                  </p>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-3">02</div>
                  <h3 className="text-2xl font-light mb-3 text-neutral-900">Seleção e Edição</h3>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Curamos suas fotografias e criamos um layout editorial que conta sua história.
                  </p>
                </div>

                <div>
                  <div className="text-sm uppercase tracking-[0.3em] text-neutral-500 mb-3">03</div>
                  <h3 className="text-2xl font-light mb-3 text-neutral-900">Produção Artesanal</h3>
                  <p className="text-neutral-600 font-light leading-relaxed">
                    Cada álbum é produzido manualmente com atenção a cada detalhe, de 30 a 60 dias.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-12 text-neutral-900">
                Características
              </h2>
              
              <div className="space-y-8 text-neutral-600 font-light leading-relaxed">
                <div className="border-b border-neutral-200 pb-6">
                  <h4 className="text-neutral-900 mb-2">Encadernação</h4>
                  <p>Costura artesanal que garante durabilidade por gerações</p>
                </div>

                <div className="border-b border-neutral-200 pb-6">
                  <h4 className="text-neutral-900 mb-2">Impressão</h4>
                  <p>Tecnologia 6 cores para reprodução fiel de cada nuance</p>
                </div>

                <div className="border-b border-neutral-200 pb-6">
                  <h4 className="text-neutral-900 mb-2">Papel</h4>
                  <p>Papel premium de qualidade arquival, livre de ácidos</p>
                </div>

                <div className="border-b border-neutral-200 pb-6">
                  <h4 className="text-neutral-900 mb-2">Acabamento</h4>
                  <p>Tecidos europeus e couros selecionados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato Minimalista */}
      <section id="contato" className="py-32 px-4 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-8 block">
            Entre em Contato
          </span>
          
          <h2 className="text-5xl md:text-6xl font-light mb-12">
            Vamos criar juntos
          </h2>
          
          <p className="text-xl text-neutral-400 mb-16 font-light max-w-2xl mx-auto">
            Cada projeto é único. Entre em contato para discutir seu álbum 
            e receber uma proposta personalizada.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
            <a 
              href="https://wa.me/5511984920048"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 p-8 hover:bg-white/5 transition-all group"
            >
              <Phone className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">WhatsApp</div>
              <div className="text-lg">(11) 98492-0048</div>
            </a>
            
            <a 
              href="mailto:contato@lucaslimafotografia.com"
              className="border border-white/20 p-8 hover:bg-white/5 transition-all group"
            >
              <Mail className="w-8 h-8 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">E-mail</div>
              <div className="text-lg">contato@lucaslimafotografia.com</div>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
            <div>
              <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Qualidade</div>
              <div className="font-light">Premium</div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Produção</div>
              <div className="font-light">30-60 dias</div>
            </div>
            <div>
              <div className="text-sm uppercase tracking-wider text-neutral-400 mb-2">Garantia</div>
              <div className="font-light">Vitalícia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="py-12 px-4 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-neutral-500">
              © 2026 Lucas Lima Studio
            </div>
            <div className="flex gap-8 text-sm text-neutral-500">
              <a 
                href="https://www.instagram.com/lucaslimafotografia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-900 transition-colors"
              >
                Instagram
              </a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Facebook</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Pinterest</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

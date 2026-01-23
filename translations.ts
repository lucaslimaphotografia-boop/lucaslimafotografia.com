import { ViewState } from './types';

export const translations = {
  pt: {
    menu: {
      portfolio: 'Portfólio',
      about: 'Sobre Nós',
      testimonials: 'Depoimentos',
      contact: 'Contato',
      albums: 'Álbuns/Livros',
      search: 'Busca',
      faq: 'Perguntas Frequentes',
      close: 'Fechar',
      privacy: 'Política de Privacidade',
      rights: 'Direitos Comerciais',
      projects: 'Projetos Criativos',
      instagram: 'Instagram'
    },
    nav: {
      menu: 'Menu',
      home: 'Início'
    },
    gallery: {
      searchTitle: 'Busque por',
      searchPlaceholder: 'Digite para buscar (ex: Hotel Rosewood, Trancoso, Marrakech...)',
      rotatingWords: ["Momentos", "Lugares", "Pessoas", "Histórias", "Emoções", "Detalhes"],
      categories: {
        "Todos": "Todos",
        "Igreja": "Igreja",
        "Campo": "Campo",
        "Praia": "Praia",
        "Hoteis": "Hoteis",
        "Cidades": "Cidades"
      },
      subcategories: {
        "Igreja": [],
        "Campo": ["Hotel Ort", "Terras de Clara"],
        "Praia": ["Trancoso", "Itacaré", "Ilha Bela"],
        "Hoteis": ["Rosewood", "Tangará", "Txai"],
        "Cidades": ["São Paulo", "Évora - Portugal"]
      },
      noResults: "Nenhum momento encontrado.",
      clearFilters: "Limpar Filtros"
    },
    about: {
      title: "Sobre\nNós",
      heroImage: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115299/20251002_Juliana_Lucas_Lima_000015_websize_vegwnf.jpg",
      philosophyImage: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115299/20251002_Juliana_Lucas_Lima_000015_websize_vegwnf.jpg",
      typographyText: ['FOTOGRAFIA', 'É UMA ARTE,', 'UMA EMOÇÃO', 'ETERNIZADA'],
      typographySubtitle: 'CADA CASAMENTO É UMA HISTÓRIA ÚNICA. CADA MOMENTO É UMA OBRA DE ARTE. CADA FOTOGRAFIA É UMA MEMÓRIA PARA SEMPRE.',
      intro: {
        text: "O amor é uma troca intencional e compartilhada",
        subtext: "A essência do Lucas Lima Studio está fundamentada em algo igualmente profundo: o que recebemos, como fotógrafos de casamento, das pessoas apaixonadas, suas famílias, seus amigos — seus mundos inteiros."
      },
      people: [
        {
          name: "Lucas Lima",
          role: "Fotógrafo",
          image: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115300/20251002_Lucas_Lima_000020_websize_rko65v.jpg",
          bio: [
            "Tive o privilégio de contar histórias de amor em lugares como Estados Unidos, Marrocos, República Tcheca, Portugal, Itália, França, Uruguai e México. Cada destino trouxe novos olhares, culturas e inspirações, contribuindo para a lapidação do meu estilo — uma assinatura que hoje reconheço e valorizo: a Fotografia Atemporal.",
            "Meu trabalho é guiado por uma busca constante por emoções autênticas. Acredito na força das imagens que resistem ao tempo, que não seguem modismos passageiros, mas que permanecem belas, sensíveis e verdadeiras ao longo dos anos. É isso que me move: capturar o que é eterno no efêmero."
          ],
          by: "Juliana Lima"
        },
        {
          name: "Juliana Lima",
          role: "Fotógrafa & Diretora de Arte",
          image: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115301/20251002_Juliana_Lima_000014_websize_m0zbly.jpg",
          bio: [
            "Com uma visão única e sensível, trabalho lado a lado para criar imagens que transcendem o momento e se tornam memórias eternas. Minha abordagem combina técnica refinada com uma atenção especial aos detalhes e às emoções genuínas de cada casal.",
            "Acredito que cada casamento tem sua própria narrativa, e meu papel é capturar essa história de forma autêntica e artística, criando um legado visual que será valorizado por gerações."
          ],
          by: "Lucas Lima"
        }
      ],
      closing: {
        text: [
          "Documentar sua história vibrante e inestimável revela não apenas os valores e memórias de sua jornada compartilhada, mas também as raízes e heranças que os unem. Essas camadas de conexão brilham com a riqueza da fotografia natural, capturando a profundidade e a beleza de suas emoções de uma forma verdadeiramente sublime.",
          "Criamos imagens de casamento banhadas em luz para preservar a essência deste dia momentoso — uma celebração do amor, da confiança e da crença inabalável nos melhores dias da vida, que formam a base de todos os seus amanhãs.",
          "Em meio ao turbilhão de grandes momentos, seu gosto impecável merece simplicidade, não excesso. Como o diamante em seu dedo, nossas imagens são cuidadosamente elaboradas para fazer seu amor brilhar de forma brilhante.",
          "Simplesmente nos deleitamos com a possibilidade de vocês. É por isso que transformamos nosso amor pela beleza em uma vida requintada, a de seus fotógrafos de casamento."
        ]
      },
      years: "Anos de História",
      countries: "Países Fotografados"
    },
    contact: {
      title: "Fale\nConosco",
      direct: "Contato Direto",
      whatsapp: "Iniciar conversa no WhatsApp",
      infoText: "Para entrar em contato com LUCASLIMA ou solicitar um orçamento detalhado dos nossos serviços de fotografia de casamento, por favor preencha suas informações e entraremos em contato em até 24 horas.",
      form: {
        name: "Nome Completo",
        email: "Email",
        type: "Tipo de Evento",
        date: "Data",
        found: "Como nos encontrou?",
        message: "Mensagem",
        consent: "Concordo que as informações enviadas acima sejam gravadas e usadas para comunicação comigo.",
        submit: "Enviar Solicitação",
        types: ["Casamento", "Noivado", "Editorial"]
      }
    },
    testimonials: {
      title: "Depoimentos"
    },
    faq: {
      title: "Perguntas Frequentes",
      items: [
        {
          question: "Qual é o seu estilo de fotografia?",
          answer: "Meu estilo é atemporal, elegante e profundamente conectado à história de cada casal.\n\nBusco uma fotografia que vá além da estética bonita: quero registrar sentimentos reais, gestos espontâneos e a atmosfera do dia exatamente como ela aconteceu — sem poses engessadas ou interferências excessivas.\n\nTrabalho de forma documental e artística, criando imagens que continuem emocionando daqui a 10, 20 ou 30 anos.\nCada casamento é único, e minhas fotos refletem isso: narrativa, luz natural, composição refinada e muita sensibilidade."
        },
        {
          question: "Você viaja para casamentos internacionais?",
          answer: "Sim, com muito prazer.\nFotografo casamentos no Brasil e no exterior, acompanhando casais que escolhem celebrar sua história em destinos especiais pelo mundo.\n\nJá realizo casamentos internacionais e destination weddings, cuidando de toda a logística para que a experiência seja tranquila e segura para vocês — desde o planejamento até a entrega final das imagens.\n\nBasta me contar onde será o seu grande dia. 🌍"
        },
        {
          question: "Como funciona a entrega das fotos?",
          answer: "Após o casamento, faço uma curadoria cuidadosa de todas as imagens para contar a história completa do dia.\nVocês recebem:\n• Galeria online exclusiva, elegante e fácil de usar\n• Fotos em alta resolução, prontas para download\n• Backup seguro por longo prazo, para total tranquilidade\n\nO prazo médio de entrega é de até 30 dias, e cada galeria é pensada para que vocês revivam cada momento com a mesma emoção do dia do casamento."
        },
        {
          question: "Vocês oferecem álbuns impressos?",
          answer: "Sim — e eles são uma parte essencial da experiência.\n\nMeus álbuns são produzidos com os melhores materiais do mundo, totalmente personalizados, com design autoral e acabamento premium.\nEles transformam a história do casamento em um objeto físico atemporal, que atravessa gerações.\n\nAlém do álbum principal, também ofereço mini-álbuns para os pais e opções de caixas, capas especiais e formatos exclusivos."
        },
        {
          question: "Quantos fotógrafos estarão no meu casamento?",
          answer: "Isso depende do tamanho, da dinâmica e da proposta do seu evento.\nNormalmente trabalho com 2 a 3 fotógrafos, garantindo que todos os momentos importantes sejam registrados com profundidade, sensibilidade e segurança.\n\nCada equipe é pensada sob medida para o seu casamento — nada é padrão, tudo é personalizado."
        },
        {
          question: "Como reservamos a data?",
          answer: "A reserva é simples e segura:\n\n1. Conversamos para entender a história e o projeto do seu casamento\n2. Definimos o pacote ideal para vocês\n3. Enviamos o contrato\n4. A data é garantida mediante assinatura do contrato e pagamento do sinal\n\nA partir daí, vocês passam a contar com meu acompanhamento completo até o grande dia."
        }
      ]
    },
    photobook: {
      title: "Fine Art\nBooks",
      quote: "\"Uma fotografia não tirada é uma memória que não existe. Uma fotografia não impressa é uma memória que não se pode tocar.\"",
      collection: "The Signature Collection",
      features: [
        { title: "Papel Algodão", desc: "Textura suave de museu, garantindo durabilidade de 100 anos." },
        { title: "Linho Italiano", desc: "Capas feitas à mão com os melhores tecidos da Toscana." },
        { title: "Design Editorial", desc: "Layouts limpos e minimalistas que contam a história sem distrações." }
      ],
      magazine: {
        title: "A Revista",
        desc: "Para casais que desejam algo mais contemporâneo, oferecemos a Revista Editorial. Impressa em papel fosco de alta gramatura, é perfeita para deixar na mesa de centro e compartilhar com amigos de uma forma descontraída e chique.",
        cta: "Solicitar Orçamento"
      }
    },
    details: {
      back: "Voltar",
      menu: "Menu",
      credits: "Créditos",
      intro: {
        location: "Villa Balbiano\nLake Como"
      },
      immersive: "Celebração",
      portrait: "Elegância Eterna"
    },
    chat: {
      title: "Assistente Virtual",
      open: "Abrir chat",
      close: "Fechar chat",
      placeholder: "Digite sua mensagem...",
      send: "Enviar",
      error: "Desculpe, ocorreu um erro. Por favor, tente novamente.",
      disclaimer: "Respostas geradas por IA. Podem conter imprecisões."
    }
  },
  en: {
    menu: {
      portfolio: 'Portfolio',
      about: 'About Us',
      testimonials: 'Testimonials',
      contact: 'Contact',
      albums: 'Albums/Books',
      search: 'Search',
      faq: 'FAQ',
      close: 'Close',
      privacy: 'Privacy Policy',
      rights: 'Commercial Rights',
      projects: 'Creative Projects',
      instagram: 'Instagram'
    },
    nav: {
      menu: 'Menu',
      home: 'Home'
    },
    gallery: {
      searchTitle: 'Search by',
      searchPlaceholder: 'Type to search (e.g. Hotel Rosewood, Trancoso, Marrakech...)',
      rotatingWords: ["Moments", "Places", "People", "Stories", "Emotions", "Details"],
      categories: {
        "Todos": "All",
        "Igreja": "Church",
        "Campo": "Field",
        "Praia": "Beach",
        "Hoteis": "Hotels",
        "Cidades": "Cities"
      },
      subcategories: {
        "Igreja": [],
        "Campo": ["Hotel Ort", "Terras de Clara"],
        "Praia": ["Trancoso", "Itacaré", "Ilha Bela"],
        "Hoteis": ["Rosewood", "Tangará", "Txai"],
        "Cidades": ["São Paulo", "Évora - Portugal"]
      },
      noResults: "No moments found.",
      clearFilters: "Clear Filters"
    },
    about: {
      title: "About\nUs",
      heroImage: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115299/20251002_Juliana_Lucas_Lima_000015_websize_vegwnf.jpg",
      philosophyImage: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115299/20251002_Juliana_Lucas_Lima_000015_websize_vegwnf.jpg",
      typographyText: ['PHOTOGRAPHY', 'IS AN ART,', 'AN EMOTION', 'ETERNALIZED'],
      typographySubtitle: 'EACH WEDDING IS A UNIQUE STORY. EACH MOMENT IS A WORK OF ART. EACH PHOTOGRAPH IS A MEMORY FOREVER.',
      intro: {
        text: "Love is a purposeful, shared exchange",
        subtext: "The Lucas Lima Studio essence is grounded on something just as profound: what we, as wedding photographers, receive from people in love, their families, their friends—their entire worlds."
      },
      people: [
        {
          name: "Lucas Lima",
          role: "Photographer",
          image: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115300/20251002_Lucas_Lima_000020_websize_rko65v.jpg",
          bio: [
            "I have had the privilege of telling love stories in places like the United States, Morocco, the Czech Republic, Portugal, Italy, France, Uruguay, and Mexico. Each destination brought new perspectives, cultures, and inspirations, contributing to the refinement of my style—a signature I recognize and value today: Timeless Photography.",
            "My work is guided by a constant search for authentic emotions. I believe in the power of images that withstand time, that do not follow fleeting trends, but remain beautiful, sensitive, and true over the years. This is what moves me: capturing what is eternal in the ephemeral."
          ],
          by: "Juliana Lima"
        },
        {
          name: "Juliana Lima",
          role: "Photographer & Art Director",
          image: "https://res.cloudinary.com/di6xabxne/image/upload/v1769115301/20251002_Juliana_Lima_000014_websize_m0zbly.jpg",
          bio: [
            "With a unique and sensitive vision, I work side by side to create images that transcend the moment and become eternal memories. My approach combines refined technique with special attention to details and the genuine emotions of each couple.",
            "I believe that each wedding has its own narrative, and my role is to capture this story authentically and artistically, creating a visual legacy that will be valued for generations."
          ],
          by: "Lucas Lima"
        }
      ],
      closing: {
        text: [
          "Documenting your vibrant and invaluable story reveals not only the values and memories of your shared journey but also the roots and heritage that bind you. These layers of connection shine with the richness of natural photography, capturing the depth and beauty of your emotions in a truly sublime way.",
          "We create wedding images bathed in light to preserve the essence of this momentous day—a celebration of love, trust, and the unwavering belief in life's best days, which form the foundation of all your tomorrows.",
          "Amid the whirlwind of grand moments, your impeccable taste deserves simplicity, over excess. Like the diamond on your finger, our imagery is carefully crafted to make your love shine brilliantly.",
          "We simply delight in the possibility of you. That is why we've turned our love of beauty into an exquisite life, that of your wedding photographers."
        ]
      },
      years: "Years of History",
      countries: "Countries Photographed"
    },
    contact: {
      title: "Contact\nUs",
      direct: "Direct Contact",
      whatsapp: "Start WhatsApp Chat",
      infoText: "To contact LUCASLIMA or request a detailed quote for our wedding photography services, please fill out your information and we will get back to you within 24 hours.",
      form: {
        name: "Full Name",
        email: "Email",
        type: "Event Type",
        date: "Date",
        found: "How did you find us?",
        message: "Message",
        consent: "I agree that the information submitted above will be stored and used to communicate with me.",
        submit: "Send Request",
        types: ["Wedding", "Engagement", "Editorial"]
      }
    },
    testimonials: {
      title: "Testimonials"
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What is your photography style?",
          answer: "My style is timeless, elegant, and deeply connected to each couple's story.\n\nI seek photography that goes beyond beautiful aesthetics: I want to record real feelings, spontaneous gestures, and the atmosphere of the day exactly as it happened—without stiff poses or excessive interference.\n\nI work in a documentary and artistic way, creating images that will continue to move you 10, 20, or 30 years from now.\nEach wedding is unique, and my photos reflect that: narrative, natural light, refined composition, and great sensitivity."
        },
        {
          question: "Do you travel for international weddings?",
          answer: "Yes, with pleasure.\nI photograph weddings in Brazil and abroad, accompanying couples who choose to celebrate their story in special destinations around the world.\n\nI already perform international weddings and destination weddings, taking care of all logistics so the experience is smooth and safe for you—from planning to the final delivery of images.\n\nJust tell me where your big day will be. 🌍"
        },
        {
          question: "How does photo delivery work?",
          answer: "After the wedding, I carefully curate all images to tell the full story of the day.\nYou receive:\n• Exclusive, elegant, and easy-to-use online gallery\n• High-resolution photos, ready for download\n• Secure long-term backup for total peace of mind\n\nThe average delivery time is up to 30 days, and each gallery is designed so you can relive every moment with the same emotion as the wedding day."
        },
        {
          question: "Do you offer printed albums?",
          answer: "Yes—and they are an essential part of the experience.\n\nMy albums are produced with the world's best materials, fully customized, with original design and premium finish.\nThey transform the wedding story into a timeless physical object that spans generations.\n\nIn addition to the main album, I also offer mini-albums for parents and options for boxes, special covers, and exclusive formats."
        },
        {
          question: "How many photographers will be at my wedding?",
          answer: "This depends on the size, dynamics, and proposal of your event.\nI normally work with 2 to 3 photographers, ensuring that all important moments are recorded with depth, sensitivity, and security.\n\nEach team is tailored to your wedding—nothing is standard, everything is personalized."
        },
        {
          question: "How do we reserve the date?",
          answer: "Booking is simple and secure:\n\n1. We talk to understand the history and project of your wedding\n2. We define the ideal package for you\n3. We send the contract\n4. The date is guaranteed upon signing the contract and paying the deposit\n\nFrom then on, you can count on my complete support until the big day."
        }
      ]
    },
    photobook: {
      title: "Fine Art\nBooks",
      quote: "\"A photograph not taken is a memory that does not exist. A photograph not printed is a memory that cannot be touched.\"",
      collection: "The Signature Collection",
      features: [
        { title: "Cotton Paper", desc: "Museum-grade smooth texture, ensuring 100-year durability." },
        { title: "Italian Linen", desc: "Handmade covers with the finest fabrics from Tuscany." },
        { title: "Editorial Design", desc: "Clean and minimalist layouts that tell the story without distractions." }
      ],
      magazine: {
        title: "The Magazine",
        desc: "For couples who want something more contemporary, we offer the Editorial Magazine. Printed on heavy matte paper, it is perfect for leaving on the coffee table and sharing with friends in a relaxed and chic way.",
        cta: "Request Quote"
      }
    },
    details: {
      back: "Back",
      menu: "Menu",
      credits: "Credits",
      intro: {
        location: "Villa Balbiano\nLake Como"
      },
      immersive: "Celebration",
      portrait: "Timeless Elegance"
    },
    chat: {
      title: "Virtual Assistant",
      open: "Open chat",
      close: "Close chat",
      placeholder: "Type your message...",
      send: "Send",
      error: "Sorry, an error occurred. Please try again.",
      disclaimer: "AI-generated responses. May contain inaccuracies."
    }
  }
};
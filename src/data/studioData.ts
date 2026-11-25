export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  objectPosition?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  practice: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PracticePillar {
  index: string;
  title: string;
  subtitle: string;
  description: string;
}

export const STUDIO_INFO = {
  name: 'Jardim Vinyasa',
  fullName: 'Jardim Vinyasa - yoga pilates e spa',
  descriptor: 'Yoga, Pilates e Spa',
  slogan: 'Equilíbrio entre mente e corpo',
  address: 'Av. C-231, Qd500 L09 - Jardim América, Goiânia - GO, 74290-030',
  neighborhood: 'Jardim América, Goiânia - GO',
  phoneDisplay: '(62) 99971-0486',
  whatsappDigits: '5562999710486',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+C-231,+Qd500+L09+-+Jardim+América,+Goiânia+-+GO,+74290-030',
} as const;

export const STUDIO_PILLARS: PracticePillar[] = [
  {
    index: '01',
    title: 'Práticas de Yoga',
    subtitle: 'Respiração, fluxo e presença',
    description:
      'Aulas conduzidas com atenção ao ritmo respiratório e ao alinhamento postural, respeitando cada nível de experiência.',
  },
  {
    index: '02',
    title: 'Estúdio de Pilates',
    subtitle: 'Força, mobilidade e controle',
    description:
      'Fortalecimento do centro de força, consciência corporal e ganho gradual de estabilidade articular em turmas acolhedoras.',
  },
  {
    index: '03',
    title: 'Spa & Bem-Estar',
    subtitle: 'Pausa, cuidado e recuperação',
    description:
      'Experiências sensoriais pensadas para aliviar tensões acumuladas da rotina e restaurar o descanso físico e mental.',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'espaco-principal',
    src: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfntgvPHNMG7_7cQJiUy_Ed-L0djJ4wXPX6ovBDvu3UmHpAjwopHQFpgxC05jCJP66tpI8kQ-rd3G1k5_BrE2I3Nmflj-aBpe2Aj8-QYb2QprQ7s3P6kZM4YBg7UrdxfGXq54gq=s4800-w1024',
    alt: 'Prática de flexão e amplitude corporal no estúdio Jardim Vinyasa',
    title: 'Prática e Consciência Corporal',
    description:
      'Ambiente iluminado e sereno no Jardim América para desenvolver flexibilidade, escuta e presença no tapete.',
    objectPosition: 'object-center',
  },
  {
    id: 'area-yoga-pilates',
    src: 'https://lh3.googleusercontent.com/grass-cs/AABkmLdYnvvt4pfcAwYQ-YUWS6kHKch8foK4Gr5EWfWTtK8tP-w_o6HEbol_2V_ozpjW7iPpIapS1ZoQh66drjxQpzx23JN0sX2W9CEue9RzIuu7AXM2iZCFt7X2rDojYrFFxaHZbhZL=s4800-w1024',
    alt: 'Prática de inversão com foco em força e equilíbrio no Jardim Vinyasa',
    title: 'Força, Estabilidade e Fluidez',
    description:
      'Evolução gradual em posturas que integram controle do centro de força, respiração e confiança.',
    objectPosition: 'object-center',
  },
  {
    id: 'turma-acolhedora',
    src: 'https://lh3.googleusercontent.com/grass-cs/AABkmLePYTUweqIWpuU7R6exNu4g6b8clH8PrgXXir9l0hPSBR3Q4_aSWArBuHnNDnbOQuB9Udgeqa-aD-15adL5y340_T1w4PunIVOj8qHzir6uyIutBz5ZY1jlSZdpCvXmFnigGpe5=s4800-w1024',
    alt: 'Turma reunida na sala clara do estúdio Jardim Vinyasa em Goiânia',
    title: 'Comunidade e Acolhimento',
    description:
      'Nossa sala ampla e ventilada na Av. C-231 recebe turmas acolhedoras para celebrar o bem-estar em grupo.',
    objectPosition: 'object-center',
  },
  {
    id: 'vivencia-equilibrio',
    src: 'https://lh3.googleusercontent.com/grass-cs/AABkmLewCbkO1WboP_jfsXQlJnuDYjzYPZwc2XQUFFfDVjKC_68LLsldNvKx7YhAEjTxE4VBmer6Fii-22O1-LCadr1B4ZTC24IPJt5WHtrUPVw7z99l-aLVlfOxx8ZCMF7DtWwc5Q=s4800-w1024',
    alt: 'Momento de abertura e respiração profunda no Jardim Vinyasa',
    title: 'Equilíbrio entre Mente e Corpo',
    description:
      'Pausas restauradoras que unem respiração consciente e cuidados de spa para desacelerar a rotina.',
    objectPosition: 'object-[center_15%]',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'mariana-almeida',
    name: 'Mariana Almeida',
    practice: 'Aluna de Vinyasa Yoga · 1 ano de prática',
    rating: 5,
    text: 'Cheguei ao Jardim Vinyasa com muitas dores na lombar por trabalhar horas sentada e sem conseguir desligar a mente. Em poucos meses de acompanhamento atento, ganhei mobilidade, melhorei meu sono e a aula se tornou o momento mais aguardado da minha semana.',
  },
  {
    id: 'rafael-mendes',
    name: 'Rafael Mendes',
    practice: 'Aluno de Pilates · Jardim América',
    rating: 5,
    text: 'Sempre achei que Pilates ou Yoga não fossem para mim por ter pouca flexibilidade. A equipe adapta cada postura com muita paciência e técnica. Hoje sinto minha postura mais firme no dia a dia e zero desconforto nos ombros.',
  },
  {
    id: 'camila-ferreira',
    name: 'Camila Ferreira',
    practice: 'Praticante de Yoga e Spa',
    rating: 5,
    text: 'O ambiente transmite paz logo ao cruzar a porta. Unir a prática de yoga no início da manhã com os cuidados do spa mudou completamente minha disposição. Tudo é limpo, silencioso e conduzido com carinho genuíno.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'iniciantes',
    question: 'Preciso ter experiência ou flexibilidade para começar no Yoga ou Pilates?',
    answer:
      'Não. A flexibilidade e a consciência corporal são conquistas da prática contínua, nunca um pré-requisito. Nossas aulas acolhem iniciantes desde o primeiro dia, com adaptações seguras e acompanhamento próximo para que você evolua no seu próprio ritmo.',
  },
  {
    id: 'aula-experimental',
    question: 'Como faço para agendar uma aula experimental ou conhecer o espaço?',
    answer:
      'Você pode preencher o formulário abaixo ou clicar diretamente no botão de WhatsApp para falar conosco pelo número (62) 99971-0486. Combinamos o melhor horário de acordo com o seu objetivo — seja Yoga, Pilates ou um momento no Spa.',
  },
  {
    id: 'o-que-levar',
    question: 'O que devo vestir e levar para minha primeira sessão?',
    answer:
      'Recomendamos roupas leves e confortáveis que permitam liberdade de movimento, além de uma garrafa de água para hidratação. O estúdio disponibiliza tapetes e acessórios de apoio higienizados para uso durante as práticas.',
  },
  {
    id: 'diferenca-yoga-pilates',
    question: 'Posso combinar as aulas de Yoga, Pilates e os cuidados de Spa?',
    answer:
      'Sim. Yoga, Pilates e Spa se complementam perfeitamente: o Pilates desenvolve estabilidade e força muscular profunda, o Yoga amplia a respiração, fluidez e calma mental, e o Spa potencializa a recuperação física.',
  },
  {
    id: 'localizacao',
    question: 'Onde o Jardim Vinyasa está localizado em Goiânia?',
    answer:
      'Estamos na Av. C-231, Qd500 L09 - Jardim América, Goiânia - GO, CEP 74290-030, em uma região de fácil acesso para quem mora ou trabalha na zona sul e oeste da cidade.',
  },
];

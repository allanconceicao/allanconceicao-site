import { Pattern, Reflection, Benefit, SocialLink } from './types';
import portraitImg from './assets/images/allan_portrait_1784294160923.png';
import bookCoverImg from './assets/images/book_cover_1783150653654.jpeg';

export const HERO_DATA = {
  authorName: "Allan Conceição",
  tagline: "Escritor e Ensaísta",
  impactPhrase: "Como percebemos o tempo, a memória e as nossas próprias escolhas? Em meus ensaios, convido você a olhar para o que costuma passar sem que a gente note e a descobrir o que de fato preenche os nossos dias.",
  portraitPath: portraitImg
};

export const QUESTION_DATA = {
  question: "Como entender o que nos cerca se raramente paramos para notar a forma como enxergamos o mundo?",
  context: "Passamos a maior parte do tempo apenas reagindo ao que acontece ao nosso redor, confundindo a agitação dos pensamentos com a própria vida. Escrever e ler sobre essas coisas não é buscar respostas prontas, mas abrir um espaço para olhar com calma para a nossa rotina e para a forma como habitamos os nossos dias."
};

export const PATTERNS_DATA: Pattern[] = [
  {
    id: "rest-guilt",
    title: "A Culpa do Descanso",
    subtitle: "A dificuldade de simplesmente parar.",
    description: "A sensação incômoda de que parar por alguns instantes ou não fazer nada produtivo é um erro ou um desperdício de tempo.",
    reflection: "O descanso virou apenas um intervalo estratégico, uma pausa para recarregar as energias e voltar a produzir. Sentir culpa por parar revela o quanto fomos condicionados a medir nosso valor pessoal apenas pelo que somos capazes de entregar."
  },
  {
    id: "future-filter",
    title: "A Espera Inventada",
    subtitle: "O hábito de viver no passo seguinte.",
    description: "A crença de que a vida de verdade só vai começar quando alcançarmos a próxima etapa, o próximo projeto ou o fim de semana.",
    reflection: "Acabamos tratando o agora como um obstáculo, um corredor que precisamos atravessar para chegar a um lugar melhor. Ao projetar nossa atenção sempre para frente, transformamos a rotina em um ensaio geral para uma vida que nunca parece começar de verdade."
  },
  {
    id: "invisible-haste",
    title: "A Pressa Sem Destino",
    subtitle: "O hábito de correr por inércia.",
    description: "Fazer as tarefas do dia a dia com uma urgência inexplicável, mesmo quando não há prazos ou motivos reais para correr.",
    reflection: "Caminhamos, comemos e respondemos mensagens como se estivéssemos sempre atrasados para um compromisso invisível. Mas se pararmos para perguntar para onde estamos correndo, raramente encontramos uma resposta clara."
  },
  {
    id: "others-noise",
    title: "O Peso das Expectativas",
    subtitle: "A preocupação constante em ser aceito.",
    description: "Ajustar gestos, escolhas e opiniões para corresponder ao que os outros esperam, deixando de lado o nosso próprio ritmo.",
    reflection: "Tentar corresponder à imagem que os outros fazem de nós é um caminho exaustivo. Quando a opinião alheia vira a nossa única referência, passamos a viver uma vida que, no fundo, não nos pertence."
  }
];

export const BOOK_DATA = {
  title: "Pensar Demais Está Te Impedindo de Viver",
  subtitle: "Ensaios sobre o ruído do pensamento, a pressa do tempo e o resgate da presença",
  description: "Este não é um manual de desenvolvimento pessoal ou um livro de respostas fáceis. Trata-se de uma coletânea de ensaios breves sobre as nossas pequenas distrações diárias, as tentativas de controlar o amanhã e a dificuldade de habitarmos o presente.",
  extendedDescription: "A cada página, o autor propõe uma conversa simples e honesta, convidando o leitor a olhar de perto para os próprios hábitos e a redescobrir a clareza que muitas vezes fica encoberta pelo cansaço do dia a dia.",
  coverPath: bookCoverImg,
  benefits: [
    {
      title: "Por que descansar parece um erro?",
      description: "Uma reflexão sobre a cobrança constante por produtividade e a dificuldade de simplesmente parar sem sentir culpa."
    },
    {
      title: "Por que corremos sem destino?",
      description: "Um olhar sobre o hábito automático de apressar o passo na rotina, mesmo quando não há um motivo real."
    },
    {
      title: "O que a pressa está nos fazendo perder?",
      description: "Uma conversa honesta sobre o que deixamos de notar quando nossa atenção está sempre voltada para a próxima tarefa."
    },
    {
      title: "Como perceber a vida enquanto ela acontece?",
      description: "Um convite para resgatar a atenção e enxergar o valor que existe nos momentos comuns do dia a dia."
    }
  ] as Benefit[],
  amazonUrl: "https://a.co/d/03ZLCSUk",
  uiclapUrl: "https://loja.uiclap.com/titulo/ua180053"
};

export const ABOUT_DATA = {
  heading: "Escrever não é oferecer respostas. É encontrar palavras para perguntas que quase todo mundo já sentiu, mas nem sempre conseguiu explicar.",
  paragraphs: [
    "Allan Conceição escreve sobre aquilo que normalmente passa despercebido. Seus ensaios partem de situações cotidianas para explorar perguntas que muitos carregam há anos, mas raramente conseguem colocar em palavras.",
    "Sem recorrer a promessas de mudança rápida ou respostas prontas, sua escrita prefere a honestidade às certezas. Em vez de dizer ao leitor como viver, Allan compartilha reflexões que convidam cada pessoa a olhar para a própria vida com mais atenção e menos julgamento.",
    "Para ele, um livro é uma conversa que continua mesmo depois da última página. Ao escrever sobre as próprias dúvidas, descobriu que elas quase nunca eram apenas suas. É nesse reconhecimento silencioso entre autor e leitor que seus textos encontram sentido."
  ]
};

export const REFLECTIONS_DATA: Reflection[] = [
  {
    id: "ref-1",
    category: "Julgamentos",
    title: "A necessidade de concluir",
    excerpt: "Explicar tudo antes da hora é uma forma silenciosa de parar de observar.",
    content: "Antes mesmo de entendermos o que está acontecendo, já estamos prontos para concordar ou discordar. Criamos o hábito de rotular cada situação para não termos que lidar com a dúvida. Mas quando tudo já tem uma resposta pronta, paramos de olhar de verdade para as coisas. O mundo deixa de ser algo a ser compreendido e passa a ser apenas um cenário que confirma o que nós já achávamos antes.",
    date: "Junho, 2026"
  },
  {
    id: "ref-2",
    category: "Tempo",
    title: "O que fica dos nossos dias",
    excerpt: "A sensação de que os anos correm rápido demais talvez seja apenas falta de memória.",
    content: "Sempre que o ano termina, repetimos que os meses voaram. Mas o tempo físico é o mesmo de sempre. O que muda é que dividimos nossa atenção em tantas frentes que quase nada do que vivemos deixa um rastro real. Quando passamos o dia pensando no próximo compromisso enquanto respondemos a alguém no celular, não guardamos o agora. Sem memória, não há registro de vida. A impressão de que os dias estão mais curtos talvez venha do fato de que estamos habitando cada vez menos o lugar onde estamos.",
    date: "Maio, 2026"
  },
  {
    id: "ref-3",
    category: "Distração",
    title: "O hábito de evitar o vazio",
    excerpt: "Procuramos qualquer som de fundo para não ter que lidar com o que aparece quando o barulho acaba.",
    content: "Ligamos o rádio assim que entramos no carro, colocamos fones para caminhar até a esquina e pegamos o telefone no primeiro segundo livre. Evitamos o vazio não porque ele seja ruim, mas porque ele nos obriga a ouvir nossos próprios pensamentos sem filtro. Quando não há nenhum estímulo por perto, a poeira das nossas pendências internas começa a baixar, e somos forçados a encarar o que estamos sentindo. No fim, preencher cada instante com som é apenas uma forma de adiar conversas que precisamos ter conosco.",
    date: "Abril, 2026"
  },
  {
    id: "ref-4",
    category: "Relações",
    title: "A insistência em pedir licença",
    excerpt: "Pedimos desculpas por atrasar um e-mail ou fazer uma pergunta, como se estivéssemos sempre incomodando.",
    content: "Costumamos pedir desculpas por quase tudo: por fazer uma pergunta óbvia, por demorar um pouco para responder uma mensagem ou por discordar de alguém em uma reunião. Há uma preocupação constante em não ser um peso para os outros, como se precisássemos de autorização para ter nossas próprias necessidades e limites. A gentileza é importante, mas quando nos desculpamos por simplesmente ocupar espaço ou por não sermos perfeitos, estamos apenas alimentando o receio de sermos vistos como realmente somos.",
    date: "Março, 2026"
  },
  {
    id: "ref-5",
    category: "Planos",
    title: "A segurança dos imprevistos",
    excerpt: "Acreditamos que planejar cada detalhe nos protege, mas os planos costumam falhar onde a vida de fato acontece.",
    content: "Passamos horas organizando roteiros, definindo metas e tentando antecipar os cenários de cada decisão. Fazemos isso porque o inesperado nos assusta. Mas, quando olhamos para trás, percebemos que as lembranças mais bonitas e os caminhos mais importantes surgiram justamente quando algo deu errado. Tentar prever tudo nos dá uma falsa sensação de segurança, mas nos custa caro: o preço de estarmos fechados para o que não estava programado.",
    date: "Fevereiro, 2026"
  },
  {
    id: "ref-6",
    category: "Olhar",
    title: "O valor das coisas sem importância",
    excerpt: "Esperamos por grandes marcos para nos sentirmos vivos, ignorando o que nos cerca no intervalo.",
    content: "Guardamos nossa expectativa para as férias, para as grandes conquistas ou para os momentos que parecem dignos de um registro. Enquanto isso, o intervalo entre esses eventos — que é onde a maior parte da nossa vida acontece — é tratado apenas como tempo de espera. Uma manhã comum, o som de um carro passando na rua, o café esfriando na mesa. Essas coisas não são pequenos milagres, são apenas a realidade. Mas quando aprendemos a olhar para elas sem a urgência de passar para a próxima tarefa, descobrimos que elas são suficientes.",
    date: "Janeiro, 2026"
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Instagram", url: "https://www.instagram.com/sopercebidepois", iconName: "Instagram", handle: "@sopercebidepois" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/allan-conceição-b92322238", iconName: "Linkedin", handle: "Allan Conceição" },
  { platform: "Facebook", url: "https://www.facebook.com/profile.php?id=61590717812760", iconName: "Facebook", handle: "Allan Conceição" },
  { platform: "YouTube", url: "", iconName: "Youtube", handle: "Em breve" }
];

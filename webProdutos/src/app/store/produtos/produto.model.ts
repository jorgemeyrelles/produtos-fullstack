export interface Produto {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  categoria: {
    id: number;
    nome: string;
  };
  descricao?: string;
  // imagemUrl?: string;
  // dataCriacao?: string;
  // dataAtualizacao?: string;
  // ativo?: boolean;
  // quantidadeMinima?: number;
  // quantidadeMaxima?: number;
  // unidadeMedida?: string;
  // fornecedor?: {
  //   id: number;
  //   nome: string;
  //   contato: string;
  //   email: string;
  //   telefone: string;
  //   endereco: string;
  //   dataCadastro: string;
  //   ativo: boolean;
  // };
  // tags?: string[];
  // peso?: number; // Peso do produto em gramas
  // dimensoes?: {
  //   altura: number; // Altura em centímetros
  //   largura: number; // Largura em centímetros
  //   profundidade: number; // Profundidade em centímetros
  // };
  // estoque?: {
  //   localizacao: string; // Localização do estoque
  //   quantidadeDisponivel: number; // Quantidade disponível no estoque
  //   quantidadeReservada?: number; // Quantidade reservada
  //   dataUltimaAtualizacao?: string; // Data da última atualização do estoque
  // };
  // promocao?: {
  //   ativo: boolean; // Indica se o produto está em promoção
  //   precoPromocional?: number; // Preço promocional do produto
  //   dataInicio?: string; // Data de início da promoção
  //   dataFim?: string; // Data de término da promoção
  // };
  // classificacao?: {
  //   mediaAvaliacoes?: number; // Média das avaliações do produto
  //   numeroAvaliacoes?: number; // Número total de avaliações
  //   comentarios?: {
  //     usuario: string; // Nome do usuário que comentou
  //     comentario: string; // Texto do comentário
  //     data: string; // Data do comentário
  //   }[]; // Lista de comentários dos usuários
  //   estrelas?: number; // Número de estrelas da avaliação
  // };
  // historicoPrecos?: {
  //   precoAnterior: number; // Preço anterior do produto
  //   dataAlteracao: string; // Data da alteração do preço
  // }[]; // Lista de histórico de preços
  // atributosPersonalizados?: {
  //   [key: string]: any; // Atributos personalizados adicionais
  // }; // Permite adicionar atributos personalizados flexíveis
  // garantia?: {
  //   periodo: string; // Período de garantia (ex: "6 meses", "1 ano")
  //   termos: string; // Termos da garantia
  // };
  // imagens?: {
  //   url: string; // URL da imagem
  //   descricao?: string; // Descrição da imagem
  // }[]; // Lista de imagens do produto
  // linksRelacionados?: {
  //   nome: string; // Nome do link relacionado
  //   url: string; // URL do link relacionado
  // }[]; // Lista de links relacionados ao produto
  // informacoesAdicionais?: string; // Informações adicionais sobre o produto
  // codigoBarras?: string; // Código de barras do produto
  // sku?: string; // Stock Keeping Unit (SKU) do produto
  // fabricante?: {
  //   nome: string; // Nome do fabricante
  //   contato: string; // Contato do fabricante
  //   endereco: string; // Endereço do fabricante
  //   telefone: string; // Telefone do fabricante
  //   email: string; // Email do fabricante
  //   site?: string; // Site do fabricante
  //   dataCadastro?: string; // Data de cadastro do fabricante
  //   ativo?: boolean; // Indica se o fabricante está ativo
  // };
  // localizacaoArmazenamento?: {
  //   corredor: string; // Corredor do armazém
  //   prateleira: string; // Prateleira do armazém
  //   posicao: string; // Posição específica na prateleira
  // }; // Localização específica do produto no armazém
  // requisitosEspecificos?: string; // Requisitos específicos do produto
  // compatibilidade?: {
  //   produtosCompatíveis: string[]; // Lista de produtos compatíveis
  //   sistemasCompatíveis?: string[]; // Lista de sistemas compatíveis
  // }; // Informações de compatibilidade do produto
  // statusDisponibilidade?: 'disponível' | 'indisponível' | 'sob encomenda'; // Status de disponibilidade do produto
  // dataLancamento?: string; // Data de lançamento do produto
  // dataDescontinuacao?: string; // Data de descontinuação do produto
  // observacoes?: string; // Observações adicionais sobre o produto
  // requisitosLegais?: {
  //   regulamentacoes: string[]; // Lista de regulamentações legais aplicáveis
  //   certificacoes?: string[]; // Lista de certificações necessárias
  // }; // Requisitos legais e certificações do produto
  // informacoesAmbientais?: {
  //   reciclavel: boolean; // Indica se o produto é reciclável
  //   compostavel?: boolean; // Indica se o produto é compostável
  //   informacoesAdicionais?: string; // Informações adicionais sobre o impacto ambiental
  // }; // Informações sobre o impacto ambiental do produto
  // informacoesDeSeguranca?: {
  //   precaucoes: string; // Precauções de segurança
  //   primeirosSocorros?: string; // Instruções de primeiros socorros
  //   armazenamento?: string; // Instruções de armazenamento seguro
  //   manuseio?: string; // Instruções de manuseio seguro
  //   descarte?: string; // Instruções de descarte seguro
  // }; // Informações de segurança do produto
  // informacoesDeTransporte?: {
  //   modoTransporte: string; // Modo de transporte recomendado
  //   precaucoesTransporte?: string; // Precauções durante o transporte
  //   requisitosEmbalagem?: string; // Requisitos de embalagem para transporte
  // }; // Informações de transporte do produto
  // informacoesDeImportacaoExportacao?: {
  //   requisitosImportacao?: string; // Requisitos de importação
  //   requisitosExportacao?: string; // Requisitos de exportação
  //   tarifas?: string; // Tarifas aplicáveis
  //   regulamentacoes?: string; // Regulamentações de importação/exportação
  // }; // Informações de importação/exportação do produto
  // informacoesDeGarantia?: {
  //   periodo: string; // Período de garantia
  //   termos: string; // Termos da garantia
  //   procedimentosReclamacao?: string; // Procedimentos para reclamação de garantia
  // }; // Informações de garantia do produto
  // informacoesDeSuporte?: {
  //   contatoSuporte: string; // Contato do suporte técnico
  //   horarioAtendimento?: string; // Horário de atendimento do suporte
  //   siteSuporte?: string; // Site de suporte
  //   emailSuporte?: string; // Email de suporte
  //   telefoneSuporte?: string; // Telefone de suporte
  // }; // Informações de suporte do produto
  // informacoesDeTreinamento?: {
  //   disponibilidadeTreinamento: boolean; // Indica se o treinamento está disponível
  //   tipoTreinamento?: string; // Tipo de treinamento oferecido
  //   contatoTreinamento?: string; // Contato para agendar treinamento
  //   materiaisTreinamento?: string[]; // Materiais de treinamento disponíveis
  // }; // Informações de treinamento do produto
  // informacoesDeAtualizacao?: {
  //   disponivelAtualizacao: boolean; // Indica se atualizações estão disponíveis
  //   tipoAtualizacao?: string; // Tipo de atualização (software, firmware, etc.)
  //   procedimentosAtualizacao?: string; // Procedimentos para atualização
  //   contatoAtualizacao?: string; // Contato para suporte de atualização
  // }; // Informações de atualização do produto
}

export interface ProdutoState {
  produtos: Produto[];
  produtoSelecionado: Produto | null;
  isLoading: boolean;
  error: string | null;
}

export const initialProdutoState: ProdutoState = {
  produtos: [],
  produtoSelecionado: null,
  isLoading: false,
  error: null,
};

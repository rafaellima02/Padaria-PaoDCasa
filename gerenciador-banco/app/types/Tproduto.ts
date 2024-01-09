export default interface TiposProduto {
    id: string;
    nome: string;
    descricao?: string | undefined;
    preco: string;
    imagem?: {
      url: string | undefined
    }
    disponibilidade: boolean;
    categoria_id: {
      nome: string;
    }
    crud: "CRT" | "UPD";
    onclikCancela: any;
  }
  
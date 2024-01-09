export default interface TiposType {
    id: string;
    nome: string;
    crud: string;
    imagem?: {
      url: string | undefined
    }
    onclikCancela: any;
  }
    
export default interface TiposMetodoPagamento {
    id: string;
    tipo: string;
    nomeTitular: string;
    numero: string;
    data_expiracao?: string | undefined;
    cliente_id: string;
    crud: "CRT" | "UPD";
    onclikCancela: any;

  }
  
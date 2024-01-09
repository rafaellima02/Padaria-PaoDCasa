export default interface TiposPedido {
    id: string;
    dataPedido: string;
    total: string;
    status: string;
    confirmado: boolean;
    cliente_id: string;
    crud: "CRT" | "UPD";
    onclikCancela: any;
  };
  

  
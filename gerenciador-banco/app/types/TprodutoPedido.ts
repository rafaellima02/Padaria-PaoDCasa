export default interface TiposProdutoPedido {
    id: string;
    quantidade: string;
    pedido_id: string ;
    produto_id: string;
    crud: "CRT" | "UPD";
    onclikCancela: any;
    endereco_id: string;
    metodoPagamento_id: string;
  }
  
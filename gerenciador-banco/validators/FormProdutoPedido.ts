import * as z from 'zod';

export const ProdutoPedidoSchema = z.object({
  id: z.string().optional(),
  quantidade: z.string(),
  pedido_id: z.string().optional(),
  produto_id: z.string(),
  endereco_id: z.string().optional(),
  metodoPagamento_id: z.string().optional()
});

import * as z from "zod";

const PedidoSchema = z.object({
  id: z.string(),
  dataPedido: z.string().optional(),
  total: z.string(),
  status: z.string(),
  confirmado: z.boolean(),
  cliente_id: z.string()
});

export default PedidoSchema;

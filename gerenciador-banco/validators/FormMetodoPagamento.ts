import * as z from 'zod';

export const MetodoPagamentoSchema = z.object({
  id: z.string().optional(),
  tipo: z.string(),
  nomeTitular: z.string(),
  numero: z.string(),
  data_expiracao: z.string().optional(),
  cliente_id: z.string(),
});

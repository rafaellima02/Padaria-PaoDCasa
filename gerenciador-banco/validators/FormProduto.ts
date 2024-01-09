import * as z from 'zod';

export const ProdutoSchema = z.object({
  id: z.string().optional(),
  nome: z.string(),
  descricao: z.string().optional(),
  preco: z.string(),
  imagem: z.unknown().optional(),
  disponibilidade: z.boolean(),
  categoria_id: z.string(),
});

import * as z from 'zod';

export const ClienteSchema = z.object({
  id: z.string().optional(), 
  nome: z.string(),
  email: z.string().email(),
  telefone: z.string().optional(), 
  senha: z.string(),
  data_Nasc: z.string().optional(),
  genero: z.string().optional(), 
  imagem: z.unknown().optional(), 
});



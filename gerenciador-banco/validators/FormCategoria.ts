import {z} from 'zod';

export const CategoriaSchema = z.object({
    id: z.string(),
    imagem: z.unknown().optional(),
    nome: z.string()
})


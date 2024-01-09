import * as z from 'zod';

export const EnderecoSchema = z.object({
    id: z.string(),
    rua: z.string(),
    cidade: z.string(),
    estado: z.string(),
    cep: z.string(),
    cliente_id: z.string()
});



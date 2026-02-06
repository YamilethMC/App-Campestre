import { z } from 'zod';

export const loginSchema = z.object({
  memberCode: z
    .string()
    .min(1, 'El número de acción es obligatorio'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

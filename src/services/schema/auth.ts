import { z } from "zod";

export const emailLoginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "O email é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const phoneLoginSchema = z.object({
  phone: z.string().regex(/^\+?\d{9,15}$/, "Número de telemóvel inválido").min(1, "O número de telemóvel é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type AuthSchema = z.infer<typeof emailLoginSchema> | z.infer<typeof phoneLoginSchema>;
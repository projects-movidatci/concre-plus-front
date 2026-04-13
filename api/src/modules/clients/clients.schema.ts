import { z } from 'zod'

export const listClientsQuerySchema = z.object({
    search: z.string().optional(),
    status: z.string().optional(),
})

export const createClientSchema = z.object({
    name: z.string().min(1),
    contactName: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    creditType: z.enum(['cash', '15_days']).default('cash'),
    balancePending: z.number().nonnegative().default(0),
    status: z.enum(['active', 'inactive']).default('active'),
})

export const updateClientSchema = createClientSchema.partial()

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>

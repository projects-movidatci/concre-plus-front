import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().default(4000),
    DB_HOST: z.string().default(''),
    DB_PORT: z.coerce.number().default(5432),
    DB_NAME: z.string().default(''),
    DB_USER: z.string().default(''),
    DB_PASSWORD: z.string().default(''),
    DB_SSL: z
        .string()
        .optional()
        .transform((v) => v === 'true'),
    JWT_SECRET: z.string().default('dev-secret-change-me'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`)
}

export const env = parsed.data

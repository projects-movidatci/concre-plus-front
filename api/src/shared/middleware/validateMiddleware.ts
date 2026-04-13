import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'
import { AppError } from '../errors/AppError'

export const validateBody =
    <T>(schema: ZodSchema<T>) =>
    (req: Request, _res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body)
        if (!parsed.success) {
            return next(new AppError(parsed.error.message, 400, 'VALIDATION_ERROR'))
        }

        req.body = parsed.data
        next()
    }

import type { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError'

export interface TenantRequest extends Request {
    tenantId?: number
}

export const tenantMiddleware = (
    req: TenantRequest,
    _res: Response,
    next: NextFunction
) => {
    const tenantHeader = req.header('x-tenant-id')
    const tenantId = tenantHeader ? Number(tenantHeader) : NaN

    if (!Number.isInteger(tenantId) || tenantId <= 0) {
        return next(
            new AppError(
                'Missing or invalid x-tenant-id header',
                400,
                'INVALID_TENANT'
            )
        )
    }

    req.tenantId = tenantId
    next()
}

import type { Request, Response } from 'express'
import { clientsService } from './clients.service'
import {
    createClientSchema,
    listClientsQuerySchema,
    updateClientSchema,
} from './clients.schema'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

const getTenantId = (req: TenantRequest) => req.tenantId as number

export const clientsController = {
    async list(req: Request, res: Response) {
        const tenantId = getTenantId(req as TenantRequest)
        const query = listClientsQuerySchema.parse(req.query)

        const data = await clientsService.list(tenantId, query.search, query.status)
        return res.json({ data })
    },

    async getById(req: Request, res: Response) {
        const tenantId = getTenantId(req as TenantRequest)
        const id = Number(req.params.id)
        const data = await clientsService.getById(tenantId, id)
        return res.json({ data })
    },

    async create(req: Request, res: Response) {
        const tenantId = getTenantId(req as TenantRequest)
        const payload = createClientSchema.parse(req.body)
        const data = await clientsService.create(tenantId, payload)
        return res.status(201).json({ data })
    },

    async update(req: Request, res: Response) {
        const tenantId = getTenantId(req as TenantRequest)
        const id = Number(req.params.id)
        const payload = updateClientSchema.parse(req.body)
        const data = await clientsService.update(tenantId, id, payload)
        return res.json({ data })
    },
}

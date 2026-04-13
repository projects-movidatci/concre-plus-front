import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const quotationsRouter = Router()

quotationsRouter.get('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    res.json({ data: dbMem.quotations.filter((q) => q.tenantId === tenantId) })
})

quotationsRouter.post('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const item = {
        id: nextId(dbMem.quotations),
        tenantId,
        clientId: Number(req.body.clientId),
        workId: Number(req.body.workId),
        code: req.body.code ?? `COT-${Date.now()}`,
        concreteType: req.body.concreteType ?? '',
        cubicMeters: Number(req.body.cubicMeters ?? 0),
        totalAmount: Number(req.body.totalAmount ?? 0),
        status: req.body.status ?? 'draft',
    } as const
    dbMem.quotations.push(item)
    res.status(201).json({ data: item })
})

quotationsRouter.patch('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const idx = dbMem.quotations.findIndex(
        (q) => q.tenantId === tenantId && q.id === id
    )
    if (idx === -1) return res.status(404).json({ error: { message: 'Quote not found' } })
    dbMem.quotations[idx] = { ...dbMem.quotations[idx], ...req.body }
    res.json({ data: dbMem.quotations[idx] })
})

quotationsRouter.delete('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const idx = dbMem.quotations.findIndex(
        (q) => q.tenantId === tenantId && q.id === id
    )
    if (idx === -1) return res.status(404).json({ error: { message: 'Quote not found' } })
    const [removed] = dbMem.quotations.splice(idx, 1)
    res.json({ data: removed })
})

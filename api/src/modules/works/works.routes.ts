import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const worksRouter = Router()

worksRouter.get('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    res.json({ data: dbMem.works.filter((w) => w.tenantId === tenantId) })
})

worksRouter.post('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const item = {
        id: nextId(dbMem.works),
        tenantId,
        clientId: Number(req.body.clientId),
        name: req.body.name ?? 'Nueva Obra',
        address: req.body.address ?? '',
        status: req.body.status ?? 'active',
        progress: Number(req.body.progress ?? 0),
    }
    dbMem.works.push(item)
    res.status(201).json({ data: item })
})

worksRouter.patch('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const idx = dbMem.works.findIndex((w) => w.tenantId === tenantId && w.id === id)
    if (idx === -1) return res.status(404).json({ error: { message: 'Work not found' } })
    dbMem.works[idx] = { ...dbMem.works[idx], ...req.body }
    res.json({ data: dbMem.works[idx] })
})

worksRouter.delete('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const idx = dbMem.works.findIndex((w) => w.tenantId === tenantId && w.id === id)
    if (idx === -1) return res.status(404).json({ error: { message: 'Work not found' } })
    const [removed] = dbMem.works.splice(idx, 1)
    res.json({ data: removed })
})

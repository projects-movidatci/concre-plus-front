import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const clientsMemoryRouter = Router()

clientsMemoryRouter.get('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    res.json({ data: dbMem.clients.filter((c) => c.tenantId === tenantId) })
})

clientsMemoryRouter.get('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const data = dbMem.clients.find((c) => c.tenantId === tenantId && c.id === id)
    if (!data) return res.status(404).json({ error: { message: 'Client not found' } })
    return res.json({ data })
})

clientsMemoryRouter.post('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const item = {
        id: nextId(dbMem.clients),
        tenantId,
        name: req.body.name ?? 'Nuevo Cliente',
        contactName: req.body.contactName ?? '',
        phone: req.body.phone ?? '',
        email: req.body.email ?? '',
        creditType: req.body.creditType ?? 'cash',
        balancePending: Number(req.body.balancePending ?? 0),
        status: req.body.status ?? 'active',
    } as const
    dbMem.clients.push(item)
    res.status(201).json({ data: item })
})

clientsMemoryRouter.patch('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const index = dbMem.clients.findIndex(
        (c) => c.tenantId === tenantId && c.id === id
    )
    if (index === -1) return res.status(404).json({ error: { message: 'Client not found' } })
    dbMem.clients[index] = { ...dbMem.clients[index], ...req.body }
    return res.json({ data: dbMem.clients[index] })
})

clientsMemoryRouter.delete('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const index = dbMem.clients.findIndex(
        (c) => c.tenantId === tenantId && c.id === id
    )
    if (index === -1) return res.status(404).json({ error: { message: 'Client not found' } })
    const [removed] = dbMem.clients.splice(index, 1)
    return res.json({ data: removed })
})

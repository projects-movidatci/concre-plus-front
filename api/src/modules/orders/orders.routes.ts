import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const ordersRouter = Router()

ordersRouter.get('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    res.json({ data: dbMem.orders.filter((o) => o.tenantId === tenantId) })
})

ordersRouter.post('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const item = {
        id: nextId(dbMem.orders),
        tenantId,
        clientId: Number(req.body.clientId),
        workId: Number(req.body.workId),
        code: req.body.code ?? `PED-${Date.now()}`,
        concreteType: req.body.concreteType ?? '',
        cubicMeters: Number(req.body.cubicMeters ?? 0),
        totalAmount: Number(req.body.totalAmount ?? 0),
        deliveryAt: req.body.deliveryAt ?? new Date().toISOString(),
        status: req.body.status ?? 'pending',
        mixerLabel: req.body.mixerLabel,
        driverName: req.body.driverName,
    } as const
    dbMem.orders.push(item)
    res.status(201).json({ data: item })
})

ordersRouter.patch('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const idx = dbMem.orders.findIndex((o) => o.tenantId === tenantId && o.id === id)
    if (idx === -1) return res.status(404).json({ error: { message: 'Order not found' } })
    dbMem.orders[idx] = { ...dbMem.orders[idx], ...req.body }
    res.json({ data: dbMem.orders[idx] })
})

ordersRouter.delete('/:id', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const idx = dbMem.orders.findIndex((o) => o.tenantId === tenantId && o.id === id)
    if (idx === -1) return res.status(404).json({ error: { message: 'Order not found' } })
    const [removed] = dbMem.orders.splice(idx, 1)
    res.json({ data: removed })
})

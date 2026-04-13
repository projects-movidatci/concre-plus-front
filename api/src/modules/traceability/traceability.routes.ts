import { Router } from 'express'
import { dbMem } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const traceabilityRouter = Router()

traceabilityRouter.get('/orders/:orderId', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const orderId = Number(req.params.orderId)
    const order = dbMem.orders.find((o) => o.tenantId === tenantId && o.id === orderId)
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } })

    const steps = ['created', 'scheduled', 'dispatched', 'delivered'].map((s) => ({
        type: s,
        status:
            (s === 'created' && 'completed') ||
            (s === 'scheduled' && ['scheduled', 'dispatched', 'delivered'].includes(order.status) && 'completed') ||
            (s === 'dispatched' && ['dispatched', 'delivered'].includes(order.status) && 'completed') ||
            (s === 'delivered' && order.status === 'delivered' && 'completed') ||
            'pending',
    }))

    return res.json({ data: steps })
})

import { Router } from 'express'
import { dbMem } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const dispatchRouter = Router()

dispatchRouter.post('/on-route/:orderId', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const order = dbMem.orders.find(
        (o) => o.tenantId === tenantId && o.id === Number(req.params.orderId)
    )
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } })
    order.status = 'dispatched'
    return res.json({ data: order })
})

dispatchRouter.post('/delivered/:orderId', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const order = dbMem.orders.find(
        (o) => o.tenantId === tenantId && o.id === Number(req.params.orderId)
    )
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } })
    order.status = 'delivered'
    return res.json({ data: order })
})

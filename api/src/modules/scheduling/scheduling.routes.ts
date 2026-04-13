import { Router } from 'express'
import { dbMem } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const schedulingRouter = Router()

schedulingRouter.post('/assign/:orderId', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const orderId = Number(req.params.orderId)
    const order = dbMem.orders.find((o) => o.tenantId === tenantId && o.id === orderId)
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } })
    order.mixerLabel = req.body.mixerLabel ?? order.mixerLabel
    order.driverName = req.body.driverName ?? order.driverName
    order.status = 'scheduled'
    return res.json({ data: order })
})

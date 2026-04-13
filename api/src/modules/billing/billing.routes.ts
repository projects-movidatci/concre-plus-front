import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const billingRouter = Router()

billingRouter.get('/ready-orders', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const delivered = dbMem.orders.filter(
        (o) => o.tenantId === tenantId && o.status === 'delivered'
    )
    res.json({ data: delivered })
})

billingRouter.post('/generate-xml/:orderId', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const order = dbMem.orders.find(
        (o) => o.tenantId === tenantId && o.id === Number(req.params.orderId)
    )
    if (!order) return res.status(404).json({ error: { message: 'Order not found' } })

    const invoice = {
        id: nextId(dbMem.invoices),
        tenantId,
        orderId: order.id,
        clientId: order.clientId,
        code: `FACT-${Date.now()}`,
        amount: order.totalAmount,
        issueDate: new Date().toISOString().slice(0, 10),
        dueDate: new Date().toISOString().slice(0, 10),
        status: 'pending',
    } as const
    dbMem.invoices.push(invoice)

    res.json({
        data: {
            xmlId: `XML-${Date.now()}`,
            invoice,
        },
    })
})

import { Router } from 'express'
import { dbMem } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const dashboardRouter = Router()

dashboardRouter.get('/summary', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const orders = dbMem.orders.filter((o) => o.tenantId === tenantId)
    const invoices = dbMem.invoices.filter((i) => i.tenantId === tenantId)
    const notifications = dbMem.notifications.filter((n) => n.tenantId === tenantId)

    res.json({
        data: {
            ordersToday: orders.length,
            tripsInProgress: orders.filter((o) => o.status === 'dispatched').length,
            deliveriesCompleted: orders.filter((o) => o.status === 'delivered').length,
            toCollectAmount: invoices
                .filter((i) => i.status !== 'paid')
                .reduce((acc, i) => acc + i.amount, 0),
            toCollectInvoices: invoices.filter((i) => i.status !== 'paid').length,
            unreadNotifications: notifications.filter((n) => !n.isRead).length,
        },
    })
})

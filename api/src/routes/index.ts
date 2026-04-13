import { Router } from 'express'
import { healthRouter } from '../modules/health/health.routes'
import { clientsMemoryRouter } from '../modules/clients/clients.memory.routes'
import { tenantMiddleware } from '../shared/middleware/tenantMiddleware'
import { worksRouter } from '../modules/works/works.routes'
import { quotationsRouter } from '../modules/quotations/quotations.routes'
import { ordersRouter } from '../modules/orders/orders.routes'
import { schedulingRouter } from '../modules/scheduling/scheduling.routes'
import { dispatchRouter } from '../modules/dispatch/dispatch.routes'
import { traceabilityRouter } from '../modules/traceability/traceability.routes'
import { collectionsRouter } from '../modules/collections/collections.routes'
import { billingRouter } from '../modules/billing/billing.routes'
import { notificationsRouter } from '../modules/notifications/notifications.routes'
import { dashboardRouter } from '../modules/dashboard/dashboard.routes'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use(tenantMiddleware)
apiRouter.use('/clients', clientsMemoryRouter)
apiRouter.use('/works', worksRouter)
apiRouter.use('/quotations', quotationsRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/scheduling', schedulingRouter)
apiRouter.use('/dispatch', dispatchRouter)
apiRouter.use('/traceability', traceabilityRouter)
apiRouter.use('/collections', collectionsRouter)
apiRouter.use('/billing', billingRouter)
apiRouter.use('/notifications', notificationsRouter)
apiRouter.use('/dashboard', dashboardRouter)

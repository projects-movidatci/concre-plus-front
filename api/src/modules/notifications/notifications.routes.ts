import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const notificationsRouter = Router()

notificationsRouter.get('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const userId = Number(req.header('x-user-id') ?? 1)
    const data = dbMem.notifications.filter(
        (n) => n.tenantId === tenantId && n.userId === userId
    )
    res.json({ data, meta: { unread: data.filter((n) => !n.isRead).length } })
})

notificationsRouter.post('/', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const userId = Number(req.body.userId ?? 1)
    const item = {
        id: nextId(dbMem.notifications),
        tenantId,
        userId,
        title: req.body.title ?? 'Nueva notificación',
        message: req.body.message ?? '',
        severity: req.body.severity ?? 'info',
        isRead: false,
        createdAt: new Date().toISOString(),
    } as const
    dbMem.notifications.push(item)
    res.status(201).json({ data: item })
})

notificationsRouter.post('/:id/read', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const id = Number(req.params.id)
    const item = dbMem.notifications.find((n) => n.tenantId === tenantId && n.id === id)
    if (!item) return res.status(404).json({ error: { message: 'Notification not found' } })
    item.isRead = true
    res.json({ data: item })
})

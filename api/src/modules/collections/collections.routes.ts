import { Router } from 'express'
import { dbMem, nextId } from '../../shared/store/inMemoryData'
import type { TenantRequest } from '../../shared/middleware/tenantMiddleware'

export const collectionsRouter = Router()

collectionsRouter.get('/invoices', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    res.json({ data: dbMem.invoices.filter((i) => i.tenantId === tenantId) })
})

collectionsRouter.post('/invoices', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const item = {
        id: nextId(dbMem.invoices),
        tenantId,
        orderId: Number(req.body.orderId),
        clientId: Number(req.body.clientId),
        code: req.body.code ?? `FACT-${Date.now()}`,
        amount: Number(req.body.amount ?? 0),
        issueDate: req.body.issueDate ?? new Date().toISOString().slice(0, 10),
        dueDate: req.body.dueDate ?? new Date().toISOString().slice(0, 10),
        status: req.body.status ?? 'pending',
    } as const
    dbMem.invoices.push(item)
    res.status(201).json({ data: item })
})

collectionsRouter.post('/register-payment/:invoiceId', (req, res) => {
    const tenantId = (req as TenantRequest).tenantId as number
    const invoice = dbMem.invoices.find(
        (i) => i.tenantId === tenantId && i.id === Number(req.params.invoiceId)
    )
    if (!invoice) return res.status(404).json({ error: { message: 'Invoice not found' } })
    invoice.status = 'paid'
    return res.json({ data: invoice })
})

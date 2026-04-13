export type GenericStatus = 'active' | 'inactive'

export interface ClientItem {
    id: number
    tenantId: number
    name: string
    contactName?: string
    phone?: string
    email?: string
    creditType: 'cash' | '15_days'
    balancePending: number
    status: GenericStatus
}

export interface WorkItem {
    id: number
    tenantId: number
    clientId: number
    name: string
    address?: string
    status: GenericStatus
    progress: number
}

export interface QuoteItem {
    id: number
    tenantId: number
    clientId: number
    workId: number
    code: string
    concreteType: string
    cubicMeters: number
    totalAmount: number
    status: 'draft' | 'sent' | 'approved'
}

export interface OrderItem {
    id: number
    tenantId: number
    clientId: number
    workId: number
    code: string
    concreteType: string
    cubicMeters: number
    totalAmount: number
    deliveryAt: string
    status: 'pending' | 'scheduled' | 'dispatched' | 'delivered'
    mixerLabel?: string
    driverName?: string
}

export interface InvoiceItem {
    id: number
    tenantId: number
    orderId: number
    clientId: number
    code: string
    amount: number
    issueDate: string
    dueDate: string
    status: 'pending' | 'paid' | 'overdue'
}

export interface NotificationItem {
    id: number
    tenantId: number
    userId: number
    title: string
    message: string
    severity: 'info' | 'warning' | 'success' | 'error'
    isRead: boolean
    createdAt: string
}

export const dbMem = {
    clients: [
        {
            id: 1,
            tenantId: 1,
            name: 'Constructora Azteca S.A.',
            contactName: 'Carlos Hernández',
            phone: '555-0101',
            email: 'carlos@azteca.com',
            creditType: '15_days',
            balancePending: 45000,
            status: 'active',
        },
    ] as ClientItem[],
    works: [
        {
            id: 1,
            tenantId: 1,
            clientId: 1,
            name: 'Plaza Comercial Norte',
            address: 'Blvd. Norte 567',
            status: 'active',
            progress: 30,
        },
    ] as WorkItem[],
    quotations: [] as QuoteItem[],
    orders: [
        {
            id: 1,
            tenantId: 1,
            clientId: 1,
            workId: 1,
            code: 'PED-2025-048',
            concreteType: "Concreto f'c=250 kg/cm²",
            cubicMeters: 10,
            totalAmount: 18500,
            deliveryAt: '2025-01-27 09:00',
            status: 'delivered',
            mixerLabel: 'T-003',
            driverName: 'Luis Martínez Cruz',
        },
    ] as OrderItem[],
    invoices: [] as InvoiceItem[],
    notifications: [
        {
            id: 1,
            tenantId: 1,
            userId: 1,
            title: 'Factura vencida',
            message: 'Tienes una factura vencida por cobrar.',
            severity: 'warning',
            isRead: false,
            createdAt: new Date().toISOString(),
        },
    ] as NotificationItem[],
}

export const nextId = <T extends { id: number }>(items: T[]) =>
    items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1

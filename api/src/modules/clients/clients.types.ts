export interface ClientRow {
    id: number
    tenant_id: number
    name: string
    contact_name: string | null
    phone: string | null
    email: string | null
    credit_type: string
    balance_pending: string
    status: string
    created_at: string
    updated_at: string
}

export interface ClientDto {
    id: number
    name: string
    contactName: string | null
    phone: string | null
    email: string | null
    creditType: string
    balancePending: number
    status: string
}

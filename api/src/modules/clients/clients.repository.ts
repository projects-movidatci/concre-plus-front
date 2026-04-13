import { pool } from '../../db/pool'
import type { CreateClientInput, UpdateClientInput } from './clients.schema'
import type { ClientRow } from './clients.types'

const baseSelect = `
SELECT
    id,
    tenant_id,
    name,
    contact_name,
    phone,
    email,
    credit_type,
    balance_pending,
    status,
    created_at,
    updated_at
FROM clients
`

export const clientsRepository = {
    async list(tenantId: number, search?: string, status?: string) {
        const values: Array<number | string> = [tenantId]
        const filters = ['tenant_id = $1']

        if (search) {
            values.push(`%${search}%`)
            filters.push(`name ILIKE $${values.length}`)
        }

        if (status) {
            values.push(status)
            filters.push(`status = $${values.length}`)
        }

        const query = `
            ${baseSelect}
            WHERE ${filters.join(' AND ')}
            ORDER BY id DESC
        `

        const result = await pool.query<ClientRow>(query, values)
        return result.rows
    },

    async getById(tenantId: number, id: number) {
        const result = await pool.query<ClientRow>(
            `${baseSelect} WHERE tenant_id = $1 AND id = $2`,
            [tenantId, id]
        )
        return result.rows[0] ?? null
    },

    async create(tenantId: number, input: CreateClientInput) {
        const result = await pool.query<ClientRow>(
            `
            INSERT INTO clients (
                tenant_id,
                name,
                contact_name,
                phone,
                email,
                credit_type,
                balance_pending,
                status
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
            `,
            [
                tenantId,
                input.name,
                input.contactName ?? null,
                input.phone ?? null,
                input.email ?? null,
                input.creditType,
                input.balancePending,
                input.status,
            ]
        )
        return result.rows[0]
    },

    async update(tenantId: number, id: number, input: UpdateClientInput) {
        const current = await this.getById(tenantId, id)
        if (!current) return null

        const result = await pool.query<ClientRow>(
            `
            UPDATE clients
            SET
                name = $3,
                contact_name = $4,
                phone = $5,
                email = $6,
                credit_type = $7,
                balance_pending = $8,
                status = $9,
                updated_at = NOW()
            WHERE tenant_id = $1 AND id = $2
            RETURNING *
            `,
            [
                tenantId,
                id,
                input.name ?? current.name,
                input.contactName ?? current.contact_name,
                input.phone ?? current.phone,
                input.email ?? current.email,
                input.creditType ?? current.credit_type,
                input.balancePending ?? Number(current.balance_pending),
                input.status ?? current.status,
            ]
        )
        return result.rows[0]
    },
}

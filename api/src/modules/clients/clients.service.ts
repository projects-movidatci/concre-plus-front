import { AppError } from '../../shared/errors/AppError'
import type { CreateClientInput, UpdateClientInput } from './clients.schema'
import { clientsRepository } from './clients.repository'
import type { ClientDto, ClientRow } from './clients.types'

const toDto = (row: ClientRow): ClientDto => ({
    id: row.id,
    name: row.name,
    contactName: row.contact_name,
    phone: row.phone,
    email: row.email,
    creditType: row.credit_type,
    balancePending: Number(row.balance_pending),
    status: row.status,
})

export const clientsService = {
    async list(tenantId: number, search?: string, status?: string) {
        const rows = await clientsRepository.list(tenantId, search, status)
        return rows.map(toDto)
    },

    async getById(tenantId: number, id: number) {
        const row = await clientsRepository.getById(tenantId, id)
        if (!row) {
            throw new AppError('Client not found', 404, 'CLIENT_NOT_FOUND')
        }
        return toDto(row)
    },

    async create(tenantId: number, input: CreateClientInput) {
        const row = await clientsRepository.create(tenantId, input)
        return toDto(row)
    },

    async update(tenantId: number, id: number, input: UpdateClientInput) {
        const row = await clientsRepository.update(tenantId, id, input)
        if (!row) {
            throw new AppError('Client not found', 404, 'CLIENT_NOT_FOUND')
        }
        return toDto(row)
    },
}

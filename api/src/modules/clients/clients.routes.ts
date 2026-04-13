import { Router } from 'express'
import { clientsController } from './clients.controller'

export const clientsRouter = Router()

clientsRouter.get('/', clientsController.list)
clientsRouter.get('/:id', clientsController.getById)
clientsRouter.post('/', clientsController.create)
clientsRouter.patch('/:id', clientsController.update)

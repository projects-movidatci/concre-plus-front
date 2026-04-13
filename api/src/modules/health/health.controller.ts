import type { Request, Response } from 'express'
import { pool } from '../../db/pool'
import { env } from '../../config/env'

export const getHealth = async (_req: Request, res: Response) => {
    if (!env.DB_HOST || !env.DB_NAME || !env.DB_USER) {
        return res.json({
            status: 'ok',
            mode: 'in-memory',
            db: 'not-configured',
        })
    }

    const db = await pool.query('SELECT NOW() AS now')

    return res.json({
        status: 'ok',
        dbTime: db.rows[0]?.now,
    })
}

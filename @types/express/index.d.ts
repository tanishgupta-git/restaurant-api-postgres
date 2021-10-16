import Express from 'express'

declare global{
    namespace Express {
        interface Request {
            isAdmin : boolean
        }
    }
}
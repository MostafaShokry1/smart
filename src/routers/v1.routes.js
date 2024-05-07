import { Router } from 'express'


import usersRouter from '../modules/user/routers/user.routes.js'
import childRouter from '../modules/user/routers/child.routes.js'

import authRouter from '../modules/auth/auth.routes.js'

const router = Router()


router.use('/users', usersRouter)
router.use('/child', childRouter)
router.use('/auth', authRouter)

export default router

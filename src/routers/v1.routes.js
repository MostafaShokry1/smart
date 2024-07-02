import { Router } from 'express'


import usersRouter from '../modules/user/routers/user.routes.js'
import childRouter from '../modules/user/routers/child.routes.js'

import authRouter from '../modules/auth/auth.routes.js'
import { addchildMac, getChildMac } from '../modules/user/controllers/Child.mac.controller.js'

const router = Router()


router.use('/users', usersRouter)
router.use('/child', childRouter)
router.use('/auth', authRouter)
router.route('/bledata').post(addchildMac).get(getChildMac)

export default router

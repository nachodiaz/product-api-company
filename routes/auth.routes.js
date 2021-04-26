import { Router } from 'express'
const router = Router()

import * as authCtrl from './../controllers/auth.controller'
import {verifyUserExists} from "../middlewares/verifySignup";


router.post('/signup' , verifyUserExists , authCtrl.signUp)
router.post('/signin', authCtrl.signIn)

export default router

import exp from 'constants'
import express from 'express'
import { DepartmentController } from './department.controller'
import { isAuth } from '../../../middlewares/Auth'
import { AuthUser } from '../../../../enums'


const router = express.Router()

router.post('/' , isAuth(AuthUser.ADMIN), DepartmentController.addDeparment )
router.get('/' , DepartmentController.getAllDepartments)

export  const DepartmentRouter = router
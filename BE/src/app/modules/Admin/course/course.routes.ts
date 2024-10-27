import exp from 'constants'
import express from 'express'
import { isAuth } from '../../../middlewares/Auth'
import { AuthUser } from '../../../../enums'
import { CourseController } from './course.controller'


const router = express.Router()

router.post('/' , isAuth(AuthUser.ADMIN), CourseController.addCourse )
router.get('/' , CourseController.getAllCourses)

export  const CourseRouter = router
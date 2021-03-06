import { Router } from 'express'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { SendMailController } from './controllers/SendMailController'
import { SurveyController } from './controllers/SurveyController'
import { UserController } from './controllers/UserController'
const router = Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()

router
  .post('/users', userController.create)
  
  .post('/surveys', surveyController.create)
  .get('/surveys', surveyController.show)
  
  .post('/sendMail', sendMailController.execute)
  
  .get('/answers/:value', answerController.execute)

  .get('/nps/:survey_id', npsController.execute)

export { router }


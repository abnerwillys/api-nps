import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as Yup from 'yup'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/UsersRepository'

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { name, email } = request.body

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório!'),
        email: Yup.string().required('Email é obrigatório!')
      })
      await schema.validate(request.body, { abortEarly: false })

      const usersRepository = getCustomRepository(UsersRepository)
      const userAlreadyExists = await usersRepository.findOne({ email })
      if (userAlreadyExists) {
        throw new AppError("User already exists!")
      }
      
      const user = usersRepository.create({
        name, 
        email
      })
      await usersRepository.save(user)

      return response.status(201).json(user)
    } catch (err) {
      console.error(err)
      throw new AppError(err)
    }
  }
}

export { UserController }


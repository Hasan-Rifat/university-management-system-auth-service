import config from '../../../config'
import { User } from './user.model'
import { IUser } from './user.interface'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null | undefined> => {
  try {
    // auto generated incrementing id
    const id = await generateUserId()
    user.id = id
    // default password
    if (!user.password) {
      user.password = config.default_user_password as string
    }

    const createdUser = await User.create(user)

    if (!createdUser) {
      throw new Error('User could not be created')
    }

    return createdUser
  } catch (error) {
    throw error as Error
  }
}

export const UsersService = {
  createUser,
}

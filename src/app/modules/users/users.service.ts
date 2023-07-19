import config from '../../../config'
import { User } from './users.model'
import { IUser } from './users.interface'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null | undefined> => {
  try {
    // auto generated incrementing id
    const id = await generateUserId()
    user.id = id
    // default password
    if (!user.password) {
      user.password = config.default_user_password as string
    }

    console.log('user', user)

    const createdUser = await User.create(user)

    if (!createdUser) {
      throw new Error('User could not be created')
    }

    return createdUser
  } catch (error) {
    console.log(error)
  }
}

export default {
  createUser,
}

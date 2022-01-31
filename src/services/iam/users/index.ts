import useBaseResponse from '../../baseResponse'
import config from '../config'
import { User, Response } from 'services/types'
import { RequestEditProfile } from './type'

export const useUsersService = () => {
  const baseResponse = useBaseResponse()

  const showProfile = () => {
    const url = 'v1/user-profile'

    return baseResponse<Response<User>>({
      baseUrl: config.baseURL,
      method: 'GET',
      url
    })
  }

  const editProfile = (request: RequestEditProfile) => {
    const url = 'v1/user-profile'

    return baseResponse({
      baseUrl: config.baseURL,
      method: 'PATCH',
      url,
      data: request
    })
  }

  const updateProfilePhoto = (request: FormData) => {
    const url = 'v1/user-profile-photo'
    return baseResponse({
      baseUrl: config.baseURL,
      method: 'POST',
      url,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: request
    })
  }

  return {
    showProfile,
    editProfile,
    updateProfilePhoto
  }
}

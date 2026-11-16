import type {RegisterRequestDto} from '@/features/auth/types'
import type {RegisterFormValues} from '@/features/auth/schemas'
import { authApi } from '@/features/auth/auth.api'

export const registerService = async (values: RegisterFormValues) => {
    const payload: RegisterRequestDto = {
        full_name: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password,
    }

    const {data} = await authApi.register(payload)

    return data
}
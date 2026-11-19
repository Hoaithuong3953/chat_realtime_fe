import { useMutation } from '@tanstack/react-query'
import { registerService } from '@/features/auth/auth.service'
import type { ApiError } from '@/services/api'
import type { RegisterFormValues } from '@/features/auth/schemas'
import type { RegisterResponseDto } from '@/features/auth/types'

export function useRegister() {
  return useMutation<RegisterResponseDto, ApiError, RegisterFormValues>({
    mutationFn: registerService,
  })
}
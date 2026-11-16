import { useMutation } from '@tanstack/react-query'
import { registerService } from '@/features/auth/auth.service'

export function useRegister() {
    return useMutation({
        mutationFn: registerService,
    })
}
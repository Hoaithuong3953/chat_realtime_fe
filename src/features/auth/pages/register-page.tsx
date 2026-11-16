import { Stack, Title, Text } from '@mantine/core'

import { useRegister } from '@/features/auth/hooks'
import type { RegisterFormValues } from '@/features/auth/schemas'
import { RegisterForm } from '@/features/auth/components'
import { notify } from '@/utils/notify'

export function RegisterPage() {
  const {mutate, isPending} = useRegister()

  const handleRegister = (values: RegisterFormValues) => {
    mutate(values, {
      onSuccess: (response) => {
        notify.success({message: response.message})
      },
      onError(error) {
        notify.error({message: error.message})
      },
    })
  }

  return (
    <Stack gap='lg'>
      <Stack gap={4}>
        <Title order={2} ta='center'>
          Đăng ký tài khoản
        </Title>
        <Text c="dimmed" size='sm' ta='center'>
          Tạo tài khoản mới để bắt đầu sử dụng
        </Text>
      </Stack>
      <RegisterForm 
        onSubmit={handleRegister}
        isPending={isPending}
      />
    </Stack>
  )
}
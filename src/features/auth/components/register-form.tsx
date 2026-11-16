import {
  Button,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  registerSchema,
  type RegisterFormValues,
} from '@/features/auth/schemas'

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void
  isPending: boolean
}

export function RegisterForm({
  onSubmit,
  isPending,
}: RegisterFormProps) {
  const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap='md'>
        <TextInput 
          label='Họ và tên'
          placeholder='Nhập họ và tên'
          withAsterisk
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        
        <TextInput 
          label='Tên đăng nhập'
          placeholder='Nhập tên đăng nhập'
          withAsterisk
          {...register('username')}
          error={errors.username?.message}
        />

        <TextInput 
          label='Email'
          placeholder='Nhập email'
          withAsterisk
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput 
          label='Mật khẩu'
          placeholder='Nhập mật khẩu'
          withAsterisk
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput 
          label='Xác nhận mật khẩu'
          placeholder='Nhập lại mật khẩu'
          withAsterisk
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button
          type='submit'
          loading={isPending}
          disabled={isPending}
          fullWidth
        >
          Đăng ký
        </Button>
      </Stack>
    </form>
  )
}
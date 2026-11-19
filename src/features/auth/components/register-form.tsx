import {
  Button,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo } from 'react'

import {
  createRegisterSchema,
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
  const { t, i18n } = useTranslation('auth/register')

  const schema = useMemo(
    () => createRegisterSchema(t),
    [t, i18n.resolvedLanguage],
  )

  const {
    register,
    handleSubmit,
    trigger,
    formState: {errors, isSubmitted},
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (isSubmitted) {
      void trigger()
    }
  }, [isSubmitted, trigger])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap='md'>
        <TextInput
          label={t('fields.fullName')}
          placeholder={t('placeholders.fullName')}
          withAsterisk
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <TextInput
          label={t('fields.username')}
          placeholder={t('placeholders.username')}
          withAsterisk
          {...register('username')}
          error={errors.username?.message}
        />
        <TextInput
          label={t('fields.email')}
          placeholder={t('placeholders.email')}
          withAsterisk
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          label={t('fields.password')}
          placeholder={t('placeholders.password')}
          withAsterisk
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput
          label={t('fields.confirmPassword')}
          placeholder={t('placeholders.confirmPassword')}
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
          {t('submit')}
        </Button>
      </Stack>
    </form>
  )
}
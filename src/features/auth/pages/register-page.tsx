import { Stack, Title, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useRegister } from '@/features/auth/hooks'
import type { RegisterFormValues } from '@/features/auth/schemas'
import { RegisterForm } from '@/features/auth/components'
import { notify } from '@/utils/notify'

export function RegisterPage() {
  const { t } = useTranslation('auth/register')
  const { mutate, isPending } = useRegister()

  const handleRegister = (values: RegisterFormValues) => {
    mutate(values, {
      onSuccess: () => {
        notify.success({
          message: t('success'),
        })
      },
      onError: (error) => {
        notify.error({
          message: t(`errors.${error.errorCode}`, {
            defaultValue: t('errors.UNKNOWN_ERROR'),
          }),
        })
      },
    })
  }

  return (
    <Stack gap='lg'>
      <Stack gap={4}>
        <Title order={2} ta='center'>
          {t('title')}
        </Title>
        <Text c='dimmed' size='sm' ta='center'>
          {t('description')}
        </Text>
      </Stack>

      <RegisterForm
        onSubmit={handleRegister}
        isPending={isPending}
      />
    </Stack>
  )
}
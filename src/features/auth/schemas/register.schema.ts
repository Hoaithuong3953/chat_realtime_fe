import {z} from 'zod'
import type {TFunction} from 'i18next'

import {REGISTER_LIMITS} from '@/features/auth/auth.constants'

export const createRegisterSchema = (t: TFunction) =>
  z.object({
    fullName: z
      .string()
      .min(
        1,
        t('validation.required', {
          field: t('fields.fullName'),
        }),
      )
      .max(
        REGISTER_LIMITS.FULL_NAME_MAX_LENGTH,
        t('validation.max', {
          field: t('fields.fullName'),
          count: REGISTER_LIMITS.FULL_NAME_MAX_LENGTH,
        }),
      ),

    username: z
      .string()
      .min(
        REGISTER_LIMITS.USERNAME_MIN_LENGTH,
        t('validation.min', {
          field: t('fields.username'),
          count: REGISTER_LIMITS.USERNAME_MIN_LENGTH,
        }),
      )
      .max(
        REGISTER_LIMITS.USERNAME_MAX_LENGTH,
        t('validation.max', {
          field: t('fields.username'),
          count: REGISTER_LIMITS.USERNAME_MAX_LENGTH,
        }),
      )
      .regex(
        /^[A-Za-z][A-Za-z0-9._-]*$/,
        t('validation.usernameFormat'),
      ),

    email: z.email({
      error: (issue) =>
        issue.input === ''
          ? t('validation.required', {
              field: t('fields.email'),
            })
          : t('validation.email'),
    }),

    password: z
      .string()
      .min(
        REGISTER_LIMITS.PASSWORD_MIN_LENGTH,
        t('validation.min', {
          field: t('fields.password'),
          count: REGISTER_LIMITS.PASSWORD_MIN_LENGTH,
        }),
      )
      .regex(/[A-Z]/, t('validation.passwordUppercase'))
      .regex(/[a-z]/, t('validation.passwordLowercase'))
      .regex(/[0-9]/, t('validation.passwordNumber'))
      .regex(
        /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/,
        t('validation.passwordSpecial'),
      ),

    confirmPassword: z
      .string()
      .min(
        1,
        t('validation.required', {
          field: t('fields.confirmPassword'),
        }),
      ),
  }).refine((values) => values.password === values.confirmPassword, {
    message: t('validation.passwordMismatch'),
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<
  ReturnType<typeof createRegisterSchema>
>
import {z} from 'zod'

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Vui lòng nhập họ và tên')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự'),
  username: z
    .string()
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(30, 'Tên đăng nhập không được vượt quá 30 ký tự')
    .regex(
      /^[A-Za-z][A-Za-z0-9._-]*$/,
      'Tên đăng nhập phải bắt đầu bằng chữ cái và chỉ chứa chữ cái, số, dấu chấm, gạch dưới hoặc gạch ngang',
    ),
  email: z.email({
    error: (issue) =>
      issue.input === ''
        ? 'Vui lòng nhập email'
        : 'Email không hợp lệ'
  }),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 chữ số')
    .regex(
      /[!@#$%^&*()_\-+=\[{\]};:'\",.<>/?\\|`~]/,
      'Mật khẩu phải có ít nhất 1 ký tự đặc biệt',
    ),
  confirmPassword: z
    .string()
    .min(1, 'Vui lòng xác nhận mật khẩu'),
})
.refine((values) => values.password === values.confirmPassword, {
  message: 'Mật khẩu xác nhận không khớp',
  path: ['confirmPassword'],
})

export type RegisterFormValues = z.infer<typeof registerSchema>
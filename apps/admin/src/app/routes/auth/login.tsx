import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { useNavigate, useSearchParams } from 'react-router'

import { AuthLayout } from '@/components/layouts/auth'
import { paths } from '@/config/paths'
import { LoginForm } from '@/features/auth/components/login-form'

const LoginRoute = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your username and password</CardDescription>
        </CardHeader>
        <CardContent className=''>
          <LoginForm
            onSuccess={() => {
              navigate(
                `${redirectTo ? `${redirectTo}` : paths.app.dashboard.getHref()}`,
                {
                  replace: true,
                },
              )
            }}
          />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}

export default LoginRoute

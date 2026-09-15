import { AuthShell } from '../_components/AuthShell';
import { LoginForm } from './LoginForm';

export default async function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}

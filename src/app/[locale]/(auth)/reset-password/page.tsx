import { Suspense } from 'react';
import { AuthShell } from '../_components/AuthShell';
import { ResetPasswordForm } from './ResetPasswordForm';

export default async function ResetPasswordPage() {
  return (
    <AuthShell>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}

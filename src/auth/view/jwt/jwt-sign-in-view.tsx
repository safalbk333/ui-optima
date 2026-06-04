'use client';

import { DEFAULT_LOCAL_USERS, getLocalSession } from 'src/auth/local-auth';
import { Field, Form } from 'src/components/hook-form';

import Alert from '@mui/material/Alert';
import type { AppRole } from 'src/auth/roles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormHead } from '../../components/form-head';
import IconButton from '@mui/material/IconButton';
import { Iconify } from 'src/components/iconify';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import { ROLE_LABELS } from 'src/auth/roles';
import { RouterLink } from 'src/routes/components';
import { Typography } from '@mui/material';
import { getErrorMessage } from '../../utils';
import { paths } from 'src/routes/paths';
import { signInWithPassword } from '../../context/jwt';
import { useAuthContext } from '../../hooks';
import { useBoolean } from 'minimal-shared/hooks';
import { useForm } from 'react-hook-form';
import { useRouter } from 'src/routes/hooks';
import { useState } from 'react';
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  const showPassword = useBoolean();

  const { checkUserSession } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const defaultValues: SignInSchemaType = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();

      const role = getLocalSession()?.role as AppRole | undefined;

      const redirectByRole: Record<AppRole, string> = {
        admin: paths.dashboard.root,
        approver: paths.approval.roots,
        enduser: paths.purchaseRequests.root,
      };

      router.replace(role ? redirectByRole[role] : paths.dashboard.root);
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage);
    }
  });

  const renderForm = () => (
    <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
      <Field.Text name="email" label="Email address" slotProps={{ inputLabel: { shrink: true } }} />

      <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
        <Link
          component={RouterLink}
          href="#"
          variant="body2"
          color="inherit"
          sx={{ alignSelf: 'flex-end' }}
        >
          Forgot password?
        </Link>

        <Field.Text
          name="password"
          label="Password"
          placeholder="6+ characters"
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify
                      icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Button
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="Sign in..."
      >
        Sign in
      </Button>
    </Box>
  );

  return (
    <>
      <FormHead
        title="Sign in to your account"
        description={
          <>
            {`Don’t have an account? `}
            <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
              Get started
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography fontSize={12}>       POC accounts (stored in browser):</Typography>
 
        <Box component="ul" sx={{ m: 0, pl: 0,fontSize:12 }}>
          {DEFAULT_LOCAL_USERS.map((account) => (
            <li key={account.email}>
              <strong>{ROLE_LABELS[account.role]}</strong>: {account.email} / {account.password}
            </li>
          ))}
        </Box>
      </Alert>

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm()}
      </Form>
    </>
  );
}

'use client';

import { Shell, OctagonAlertIcon, Loader2 } from 'lucide-react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function SignUpView() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push('/');
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  const onSocial = (provider: 'github' | 'google') => {
    setError(null);
    setPending(true);
    authClient.signIn.social(
      {
        provider,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {!!error && (
        <Alert variant="destructive">
          <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
          <AlertDescription className="text-destructive">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Shell className="size-6 text-foreground" />
                </div>
                <span className="sr-only">Meetai.</span>
              </a>
              <h1 className="text-xl font-bold text-foreground">
                Get started with Meetai.
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        className="text-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-foreground"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="text-foreground"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  'Sign Up'
                )}
              </Button>
            </div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 text-foreground">
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => onSocial('github')}
                disabled={pending}
              >
                {pending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <FaGithub className="size-4" />
                    GitHub
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => onSocial('google')}
                disabled={pending}
              >
                {pending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <>
                    <FaGoogle className="size-4" />
                    Google
                  </>
                )}
              </Button>
            </div>
            <div className="text-center text-sm text-foreground">
              Already have an account?{' '}
              <a
                href="/sign-in"
                className="underline underline-offset-4 text-primary"
              >
                Sign in
              </a>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{' '}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

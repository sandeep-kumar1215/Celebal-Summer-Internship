"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase.auth";
import { toast } from "react-toastify";
import Link from "next/link";

interface LOGIN_FORM_TYPE {
  email: string;
  password: string;
}

const LoginCpn = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<LOGIN_FORM_TYPE>({
    email: "",
    password: "",
  });

  const [loginFormError, setLoginFormError] = useState<LOGIN_FORM_TYPE>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginFormError = (
    form: LOGIN_FORM_TYPE,
    setError: Dispatch<SetStateAction<LOGIN_FORM_TYPE>>
  ) => {
    let hasError = false;
    const errors = { email: "", password: "" };

    if (!form.email) {
      errors.email = "Email cannot be empty";
      hasError = true;
    }

    if (!form.password) {
      errors.password = "Password cannot be empty";
      hasError = true;
    }

    setError(errors);
    return hasError;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormError = handleLoginFormError(loginForm, setLoginFormError);
    if (isFormError) return;

    try {
      setLoading(true);

      await signIn(loginForm.email, loginForm.password);
      router.push("/workspace");
      toast.success("Login successfully!");

      setLoginForm({ email: "", password: "" });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Email or password is incorrect!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("min-h-screen flex flex-col items-center justify-center px-4", className)} {...props}>
      <div className="w-full max-w-md">
        <div className="flex justify-center items-center gap-2 mb-6">
          <Image src="/logo.png" width={28} height={28} alt="App Logo" />
          <h1 className="text-xl font-bold tracking-tight">
            {process.env.NEXT_PUBLIC_APP_NAME ?? "KanBan App"}
          </h1>
        </div>

        <Card className="shadow-md dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Log in to your account to access your workspace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, email: e.target.value });
                    setLoginFormError({ ...loginFormError, email: "" });
                  }}
                />
                {loginFormError.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {loginFormError.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => {
                    setLoginForm({ ...loginForm, password: e.target.value });
                    setLoginFormError({ ...loginFormError, password: "" });
                  }}
                />
                {loginFormError.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {loginFormError.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-primary underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-center text-muted-foreground mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default LoginCpn;

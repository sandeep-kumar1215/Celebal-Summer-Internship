"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { cn, handleFirebaseError } from "@/lib/utils";
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
import { signUp } from "@/lib/firebase.auth";
import { toast } from "react-toastify";
import Link from "next/link";

interface REGISTER_FORM_TYPE {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterCpn = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useState<REGISTER_FORM_TYPE>({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });

  const [registerFormError, setRegisterFormError] =
    useState<REGISTER_FORM_TYPE>({
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    });

  const [loading, setLoading] = useState<boolean>(false);

  const handleRegisterFormError = (
    form: REGISTER_FORM_TYPE,
    setError: Dispatch<SetStateAction<REGISTER_FORM_TYPE>>
  ) => {
    let hasError = false;
    const errors = { email: "", displayName: "", password: "", confirmPassword: "" };

    if (!form.displayName) {
      errors.displayName = "Name cannot be empty";
      hasError = true;
    }

    if (!form.email) {
      errors.email = "Email cannot be empty";
      hasError = true;
    }

    if (!form.password) {
      errors.password = "Password cannot be empty";
      hasError = true;
    }

    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm password cannot be empty";
      hasError = true;
    }

    setError(errors);
    return hasError;
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormError = handleRegisterFormError(registerForm, setRegisterFormError);
    if (isFormError) return;

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }

    try {
      setLoading(true);

      const authRes = await signUp(
        registerForm.displayName,
        registerForm.email,
        registerForm.password
      );

      if (!authRes?.user) {
        toast.error(handleFirebaseError(authRes?.message));
        setLoading(false);
        return;
      }

      toast.success("Register successfully!");
      router.push("/");

      setRegisterForm({
        email: "",
        displayName: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      toast.error("Something went wrong!");
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
            <CardTitle className="text-xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Start managing your tasks like a pro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <Label htmlFor="displayName">Name</Label>
                <Input
                  id="displayName"
                  value={registerForm.displayName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      displayName: e.target.value,
                    })
                  }
                />
                {registerFormError.displayName && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerFormError.displayName}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={registerForm.email}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      email: e.target.value,
                    })
                  }
                />
                {registerFormError.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerFormError.email}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={registerForm.password}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                />
                {registerFormError.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerFormError.password}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {registerFormError.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">
                    {registerFormError.confirmPassword}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-primary underline">
                  Sign in
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

export default RegisterCpn;

"use client";

import {
  Button,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  loginSchema,
  LoginSchema,
} from "@/lib/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    const result = await signInUser(data);
    if (result.status === "success") {
      router.push("/members");
      setLoading(false);
    } else {
      toast.error(result.error as string);
      setLoading(false);
    }
  };

  return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={
                errors.email?.message as string
              }
            />
            <Input
              defaultValue=""
              label="Password"
              variant="bordered"
              type="password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={
                errors.password?.message as string
              }
            />
            <div className="flex justify-end hover:underline text-sm">
              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <Button
              fullWidth
              className="bg-primaryPurple text-white font-semibold text-lg"
              type="submit"
              isDisabled={!isValid || loading}
              isLoading={loading}
            >
             {loading ? "" : "Login"}
            </Button>
            {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div> */}
            {/* <SocialLogin /> */}
            <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
          </div>
        </form>
  );
}

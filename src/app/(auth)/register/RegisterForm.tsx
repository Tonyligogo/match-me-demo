"use client";

import { registerUser } from "@/app/actions/authActions";
import {
  profileSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib/schemas/RegisterSchema";
import { handleFormServerErrors } from "@/lib/util";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import UserDetailsForm from "./UserDetailsForm";
import ProfileDetailsForm from "./ProfileDetailsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const stepSchemas = [
  registerSchema,
  profileSchema,
];

export default function RegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema =
    stepSchemas[activeStep];

  const registerFormMethods =
    useForm<RegisterSchema>({
      resolver: zodResolver(
        currentValidationSchema
      ),
      mode: "onTouched",
    });

  const {
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = registerFormMethods;

  const router = useRouter();

  const onSubmit = async () => {
    const result = await registerUser(
      getValues()
    );
    if (result.status === "success") {
      router.push("/login");
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileDetailsForm />;
      default:
        return "Unknown step";
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
        <FormProvider {...registerFormMethods}>
          <form onSubmit={handleSubmit(onNext)} className="max-w-md mx-auto">
            <div className="space-y-4">
              {getStepContent(activeStep)}
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {
                    errors.root.serverError
                      .message
                  }
                </p>
              )}
              <div className="flex flex-row items-center gap-6">
                {activeStep !== 0 && (
                  <Button
                    onClick={onBack}
                    fullWidth
                  >
                    Back
                  </Button>
                )}
                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  fullWidth
                  className="bg-primaryPurple text-white font-semibold text-lg"
                  type="submit"
                >
                  {activeStep ===
                  stepSchemas.length - 1
                    ? "Submit"
                    : "Continue"}
                </Button>
              </div>
              <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link href="/login" className="underline underline-offset-4">
                        Log in
                      </Link>
                    </div>
            </div>
          </form>
        </FormProvider>
  );
}

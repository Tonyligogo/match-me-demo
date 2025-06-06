"use client";

import { createMessage } from "@/app/actions/messageActions";
import {
  MessageSchema,
  messageSchema,
} from "@/lib/schemas/MessageSchema";
import { handleFormServerErrors } from "@/lib/util";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useParams,
  useRouter,
} from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi2";

export default function ChatForm({selectedChatId}:{selectedChatId:string}) {
  const router = useRouter();
  const queryClient = useQueryClient()
  const params = useParams<{ userId: string }>();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (
    data: MessageSchema
  ) => {
    const result = await createMessage(
      selectedChatId,
      data
    );
    if (result.status === "error") {
      handleFormServerErrors(result, setError);
    } else {
      reset()
      queryClient.invalidateQueries({ queryKey: ['messages', selectedChatId] })
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full"
    >
      <div className="flex items-center gap-2">
        <Input
          fullWidth
          placeholder="Type a message"
          variant="faded"
          {...register("text")}
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
        />
        <Button
          type="submit"
          isIconOnly
          color="default"
          radius="full"
          isLoading={isSubmitting}
          isDisabled={!isValid || isSubmitting}
        >
          <HiPaperAirplane size={18} />
        </Button>
      </div>
      <div className="flex flex-col">
        {errors.root?.serverError && (
          <p className="text-danger text-sm">
            {errors.root.serverError.message}
          </p>
        )}
      </div>
    </form>
  );
}

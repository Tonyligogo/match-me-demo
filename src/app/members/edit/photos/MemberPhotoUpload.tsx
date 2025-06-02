"use client";

import { addImage } from "@/app/actions/userActions";
import ImageUploadButton from "@/components/ImageUploadButton";
import { CloudinaryUploadWidgetResults } from "next-cloudinary";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function MemberPhotoUpload() {
  const router = useRouter();

  const onAddImage = async (
    result: CloudinaryUploadWidgetResults
  ) => {
    if (
      result.info &&
      typeof result.info === "object"
    ) {
      try {
        await addImage( result.info.secure_url, result.info.public_id );
        router.refresh();
      } catch (error) {
        console.error("Error processing image upload:", error);
        toast.error("Error processing image upload");
        return;  
      }
    } else {
      toast.error("Problem adding image");
    }
  };
  return (
    <div>
      <ImageUploadButton
        onUploadImage={onAddImage}
      />
    </div>
  );
}

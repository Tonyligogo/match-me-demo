"use client";

import React from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";

type Props = {
  onUploadImage: (
    result: CloudinaryUploadWidgetResults
  ) => void;
};

export default function ImageUploadButton({
  onUploadImage,
}: Props) {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="matchme-demo"
      className={`flex items-center gap-2 border border-dashed border-blue-100 bg-[#f8faff] 
        rounded-lg text-primaryBlue py-2 px-4 hover:bg-default/10`}
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  );
}

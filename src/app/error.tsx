"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { BiSolidError } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center vertical-center text-primaryBlue">
      <p>Oops!</p>
      <p>Seems like there is an issue on our end. We are working on it.</p>
    </div>
  );
}

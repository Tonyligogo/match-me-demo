import { Spinner } from "@nextui-org/react";

export default function Loading({label}: {label?: string}) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner
        label={label || "Loading..."}
        color="default"
      />
    </div>
  )
}

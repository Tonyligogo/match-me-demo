import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <Spinner
        label={"Loading..."}
        color="default"
      />
    </div>
  );
}

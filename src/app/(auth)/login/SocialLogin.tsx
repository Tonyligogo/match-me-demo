import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SocialLogin() {
  const providers = [
    {
      name: "google",
      icon: <FcGoogle size={20} />,
      text: "Google",
    }
  ];

  const onClick = (
    provider: "google"
  ) => {
    signIn(provider, {
      callbackUrl: "/members",
    });
  };

  return (
    <div className="flex items-center w-full gap-2">
      {providers.map((provider) => (
        <Button
          key={provider.name}
          size="md"
          fullWidth
          variant="ghost"
          className="border"
          onClick={() =>
            onClick(
              provider.name as "google"
            )
          }
        >
          {provider.icon} Login with Google
        </Button>
      ))}
    </div>
  );
}

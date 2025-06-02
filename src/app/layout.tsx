import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import { auth } from "@/auth";
import ReactQueryProvider from "./ReactQueryProvider";
import BottomNav from "@/components/navbar/BottomNav";

export const metadata: Metadata = {
  title: {
    template: "%s | starmingle",
    default: "StarMingle",
  },
  description: "Get love and friendship based on your zodiac sign",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id || null;
  const profileComplete = session?.user
    .profileComplete as boolean;
  return (
    <html lang="en">
      <body>
        <Providers
          profileComplete={profileComplete}
          userId={userId}
        >
          <ReactQueryProvider>
          <main className="flex flex-col h-[100svh]">
            <nav className="h-[60px] fixed w-full z-50 flex-shrink-0">
          <TopNav />
            </nav>
          <div className="flex-grow relative bg-[#f8faff] pt-[60px] pb-[80px] md:pb-0">
            {children}
          <div className="fixed z-50 bottom-0 left-0 right-0 md:hidden">
            <BottomNav/>
          </div>
          </div>
          </main>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}

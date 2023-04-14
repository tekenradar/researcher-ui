import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.user === undefined) {
    throw new Error('Not authenticated');
  }

  return (
    <>
      <Navbar
        email={session.user.email ?? ''}
      />
      {children}
    </>
  )
}

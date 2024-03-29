import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.user === undefined) {
    redirect('/');
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

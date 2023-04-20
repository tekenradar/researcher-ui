import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import Link from "next/link";


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
      <div className="bg-tekenradar text-white py-2">
        <Container className="d-flex align-items-center">
          <h2 className="h5 mb-0 flex-grow-1"
            style={{ letterSpacing: '2px' }}
          >Admin mode</h2>
          <Link
            href="/substudies/selector"
            className="text-white btn hover-underline fs-5"
          >
            Exit admin mode
          </Link>
        </Container>
      </div>
      {children}
    </>
  )
}

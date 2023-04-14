import Login from "@/components/Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Profile from "@/components/navbar/Profile";
import Image from "next/image";
import logo from '../public/tick-logo.png';
import Credits from "@/components/Credits";
import AppTitle from "@/components/AppTitle";

interface PageProps {
}

export default async function Page(props: PageProps) {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    return <main className="d-flex flex-column vh-100 align-items-center justify-content-center p-2">
      <div className='bg-white shadow p-3 rounded'
        style={{ maxWidth: '500px', width: 500 }}
      >
        <AppTitle />
        <p className="fw-bold mt-4 mb-1">Active session with the account:</p>
        <div className="d-flex bg-light shadow-sm p-2 rounded">
          <Profile
            email={session.user.email ?? ''}
          />
        </div>
        <Link
          className="btn btn-primary w-100 mt-4"
          href="/substudies/selector">
          Select a substudy
        </Link>
      </div>
      <Credits />
    </main>

  }

  // check if the user is logged in
  // if not, redirect to login page
  return <main className="d-flex flex-column vh-100 align-items-center justify-content-center p-2">
    <Login />
    <Credits />
  </main>
};

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getSubstudy } from "./utils";
import SubstudyNavbar from "@/components/substudy/navbar/SubstudyNavbar";


interface LayoutProps {
  params: {
    substudyID: string
  },
  children: React.ReactNode
}

export const revalidate = 10;


export default async function Layout(props: LayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    redirect('/')
  }

  const substudy = await getSubstudy(props.params.substudyID, session.accessToken);

  return <div className="">
    <SubstudyNavbar
      substudy={substudy}
    />
    {props.children}
  </div>
};

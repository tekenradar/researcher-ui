import { getServerSession } from "next-auth/next";
import { getSubstudy } from "../utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    substudyID: string
  },
}

export default async function Layout(props: LayoutProps) {
  // if substudy does not have this feature - redirect to exporter
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    return <p>Not authenticated</p>
  }

  const substudy = await getSubstudy(props.params.substudyID, session.accessToken);

  if (substudy.features.contacts !== true) {
    redirect(`/substudies/${props.params.substudyID}/exporter`)
  }

  return <div>
    {props.children}
    {props.modal}
  </div>


};

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { getSubstudy } from "../utils";
import Downloader from "@/components/substudy/exporter/Downloader";
import Credits from "@/components/Credits";

interface PageProps {
  params: {
    substudyID: string
  },
}

export const revalidate = 10;

export default async function Page(props: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    return <p>Not authenticated</p>
  }

  const substudy = await getSubstudy(props.params.substudyID, session.accessToken);
  return <div className="container-fluid py-4">

    <Downloader
      substudy={substudy}
    />
    <Credits />
  </div>
};

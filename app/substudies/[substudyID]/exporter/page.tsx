import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { getSubstudy } from "../utils";
import Downloader from "@/components/substudy/exporter/Downloader";

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
  console.log(substudy)
  return <h1>
    exporter - {substudy.toString()}
    <Downloader
      datasets={substudy.availableDatasets}
    />
  </h1>
};

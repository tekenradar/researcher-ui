import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getTokenHeader, researcherBackendURL } from "@/utils/backend/api";
import { getServerSession } from "next-auth/next";
import Link from "next/link"
import { redirect } from "next/navigation";
import clsx from "clsx";


interface LayoutProps {
  params: {
    substudyID: string
  },
  children: React.ReactNode
}

const getSubstudy = async (substudyKey: string, accessToken: string) => {
  const url = new URL(`${researcherBackendURL}/v1/substudy/${substudyKey}/`);

  const response = await fetch(url.toString(), {
    headers: getTokenHeader(accessToken),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

const getTextColor = (color: string) => {
  return `text-study-${color}`;
}

const getBgColor = (color: string) => {
  return `bg-opacity-10 bg-study-${color}`;
}

const getBorderColor = (color: string) => {
  return `border-study-${color}`;
}


export default async function Layout(props: LayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    redirect('/')
  }

  const substudy = await getSubstudy(props.params.substudyID, session.accessToken);

  return <div className="">
    <nav className={clsx("d-flex border-bottom py-2 container-fluid",
      getBgColor(substudy.studyColor),
      getBorderColor(substudy.studyColor),
    )}>

      <span className={clsx(
        "font-monospace me-2 border-end pe-2",
        getBorderColor(substudy.studyColor),
        getTextColor(substudy.studyColor),
      )}
      >{substudy.name}</span>


      <Link
        className={clsx(
          getTextColor(substudy.studyColor),
          "hover-underline px-2 fw-bold"
        )}
        href={`/substudies/${substudy.key}/exporter`}
      >Data exporter</Link>
      {substudy.features.contacts &&
        <Link
          className={clsx(
            getTextColor(substudy.studyColor),
            "hover-underline px-2"
          )}
          href={`/substudies/${substudy.key}/contacts`}
        >Contacts</Link>}
      <div className="flex-grow-1">
      </div>
      <Link
        className={clsx(
          getTextColor(substudy.studyColor),
          "px-2 hover-underline"
        )}
        href='/substudies/selector'
      >Exit substudy</Link>
    </nav>
    {props.children}
  </div>
};

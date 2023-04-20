import ContactViewer from "@/components/substudy/contact-viewer/ContactViewer";
import { getContactDetails } from "./utils";

interface PageProps {
  params: {
    substudyID: string;
    contactID: string;
  };
}

export default async function Page(props: PageProps) {
  const contactDetails = await getContactDetails(props.params.substudyID, props.params.contactID);

  return <div className="my-4 bg-white rounded p-3">
    <ContactViewer
      params={props.params}
      contactDetails={contactDetails}
    />
  </div>
};

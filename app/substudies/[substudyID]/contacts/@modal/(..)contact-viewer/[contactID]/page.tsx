import { getContactDetails } from "@/app/substudies/[substudyID]/contact-viewer/[contactID]/utils";
import ContactViewerModal from "@/components/substudy/contact-viewer/ContactViewerModal";

interface PageProps {
  params: {
    substudyID: string;
    contactID: string;
  };
}

export default async function Page(props: PageProps) {
  const contactDetails = await getContactDetails(props.params.substudyID, props.params.contactID);

  return <ContactViewerModal
    params={props.params}
    contactDetails={contactDetails}
  />
};

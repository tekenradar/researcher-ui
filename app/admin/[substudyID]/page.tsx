import Container from "@/components/Container";
import { getAllSubstudies } from "../utils";
import SubstudyEditor from "@/components/admin/SubstudyEditorPage";

interface PageProps {
  params: {
    substudyID: string;
  }
}

export default async function Page(props: PageProps) {
  return <Container className="mt-4">
    {/* @ts-expect-error Async Server Component */}
    <SubstudyEditor
      params={props.params}
    />
  </Container>
};

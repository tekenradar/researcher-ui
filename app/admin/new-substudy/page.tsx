import { getAllSubstudies } from "../utils";

interface PageProps {
}

export default async function Page(props: PageProps) {
  const substudies = await getAllSubstudies();
  return <h1>new substudy</h1>
};

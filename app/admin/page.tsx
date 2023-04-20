import StudyInfoCard from "@/components/admin/StudyInfoCard";
import { getAllSubstudies } from "./utils";
import Credits from "@/components/Credits";
import Container from "@/components/Container";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

interface PageProps {
}

export default async function Page(props: PageProps) {
  const substudies = await getAllSubstudies();


  return <Container>
    <div className="row justify-content-start g-3 py-3">
      <h2 className="h4 mb-0">New substudy</h2>
      <div className='col-12 col-md-6 col-lg-4'>
        <Link
          className={
            "btn btn-light p-3 text-decoration-none d-flex flex-column border h-100 text-start shadow-sm"
          }
          href={`/admin/new-substudy`}
        >
          <h5>{'Create'}</h5>
          <p className='flex-grow-1'>{'Setup a completely new substudy'}</p>
          <div className='text-end text-decoration-underline'><FontAwesomeIcon
            width={16}
            className='ms-2' icon={faAnglesRight} /></div>
        </Link>
      </div>
      <h2 className="h4 mt-4 mb-0">Or select a substudy to edit</h2>
      {(!substudies || substudies.length < 1) &&
        <div className='alert alert-light shadow-sm'>
          {`Currently, you don't have any substudy.`}
        </div>}
      {
        substudies.map((study: any) => <StudyInfoCard
          key={study.key}
          study={study}
        />
        )
      }
    </div>
    <Credits />
  </Container >
};

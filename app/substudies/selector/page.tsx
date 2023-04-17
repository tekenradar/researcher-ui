import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Credits from '@/components/Credits';
import StudyInfoCard from '@/components/StudyInfoCard';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { getSubstudies } from './utils';


interface PageProps {
}

export const revalidate = 100;

export default async function Page(props: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    redirect('/')
  }

  const substudies = await getSubstudies(session.accessToken);

  if (!substudies || substudies.length < 1) {
    return <div className="d-flex align-items-top w-100 justify-content-center vh-100 p-3">
      <div>
        <h1>Tekenradar Researcher UI</h1>
        <div className='alert alert-warning'>
          {`Currently, you don't have access to any study. Please ask the Tekenradar Researcher Team admin.`}
        </div>
      </div>
    </div>
  }

  return <>
    <div className="container h-100 justify-content-center overflow-scroll">
      <div className="row justify-content-start g-3 py-3">
        <h2 className="h4 mb-0">Select a substudy</h2>
        {
          substudies.map((study: any) => <StudyInfoCard
            key={study.key}
            study={study}
          />
          )
        }
      </div>
      <Credits />
    </div>
  </>
};

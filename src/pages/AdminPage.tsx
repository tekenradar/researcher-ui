import React, { useEffect, useState } from 'react';
import AdminAppbar from '../components/admin/AdminAppbar';
import StudyInfoEditor from '../components/admin/StudyInfoEditor';
import StudyInfoList from '../components/admin/StudyInfoList';
import { dummyStudies, StudyInfo } from '../hooks/useAppContext';
import { useAuthContext } from '../hooks/useAuthContext';

interface AdminPageProps {
}

const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";


const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<StudyInfo | undefined>();
  const authContext = useAuthContext();

  // TODO: save study info

  const studyInfos = dummyStudies;

  useEffect(() => {
    fetchAllStudyInfos();
  }, [])

  const fetchAllStudyInfos = async () => {
    try {
      setIsLoading(true);
      const url = new URL(`${apiRoot}/v1/study-management/study-info`);

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log(data);

    } catch (err: any) {
      console.error(err)
      authContext.logout();
    } finally {
      setIsLoading(false);
    }
  }

  const saveStudyInfo = async (studyInfo: StudyInfo) => {
    try {
      setIsLoading(true);
      const url = new URL(`${apiRoot}/v1/study-management/study-info`);

      const response = await fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(studyInfo),
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log(data);
      fetchAllStudyInfos();

    } catch (err: any) {
      console.error(err)
      authContext.logout();
    } finally {
      setIsLoading(false);
    }
  }

  const deleteStudyInfo = async (studyKey: string) => {
    // TODO: implement api request
    console.log('triggered deleting study')
  }

  return (
    <React.Fragment>
      <AdminAppbar />
      <div className='d-flex h-100'>
        <StudyInfoList
          isLoading={isLoading}
          studyInfos={studyInfos}
          selectedStudyKey={selectedStudy?.key}
          onAddNew={() => {
            setSelectedStudy(undefined);
          }}
          onSelect={(study) => {
            setSelectedStudy(study);
          }}
        />
        <StudyInfoEditor
          isLoading={isLoading}
          studyInfo={selectedStudy}
          onDeleteStudy={(key: string) => deleteStudyInfo(key)}
          onSaveStudy={(studyInfo: StudyInfo) => saveStudyInfo(studyInfo)}
        />

      </div>
    </React.Fragment>


  );
};

export default AdminPage;

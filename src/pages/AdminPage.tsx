import React, { useState } from 'react';
import AdminAppbar from '../components/admin/AdminAppbar';
import StudyInfoEditor from '../components/admin/StudyInfoEditor';
import StudyInfoList from '../components/admin/StudyInfoList';
import { dummyStudies, StudyInfo } from '../hooks/useAppContext';

interface AdminPageProps {
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [selectedStudy, setSelectedStudy] = useState<StudyInfo | undefined>();

  // TODO: fetch study list from study management api

  // TODO: save study info

  const studyInfos = dummyStudies;

  const fetchAllStudyInfos = async () => {

  }

  const saveStudyInfo = async () => {

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
          isLoading={true}
          studyInfo={selectedStudy}
          onDeleteStudy={(key: string) => deleteStudyInfo(key)}
        />

      </div>
    </React.Fragment>


  );
};

export default AdminPage;

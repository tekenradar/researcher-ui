import React from 'react';
import { Alert, Form } from 'react-bootstrap';
import { StudyInfo } from '../../hooks/useAppContext';
import Credits from '../Credits';
import LoadingButton from '../LoadingButton';

interface StudyInfoEditorProps {
  isLoading: boolean;
  studyInfo?: StudyInfo;
  onDeleteStudy: (studyKey: string) => void;
}

const StudyInfoEditor: React.FC<StudyInfoEditorProps> = (props) => {
  return (
    <div className='flex-grow-1 p-3'>
      <div className="bg-white p-3 shadow-sm">
        <h2 className="h5">{props.studyInfo ? `Edit Study: ${props.studyInfo.name}` : 'Create new study'}</h2>
        <Form onSubmit={(event) => {
          event.preventDefault()

        }}>

          <LoadingButton
            type='submit'
            className='btn btn-primary'
            label='Save'
          />
        </Form>
      </div>
      {props.studyInfo !== undefined ? <div className="bg-white p-3  mt-3 shadow-sm">
        <h2 className="h5 text-danger">Delete Study: {props.studyInfo.name}</h2>
        <Alert variant='danger'>
          This is an irreversible action. Perform this only if you are certain of the consequences and you intend to delete the study object.
        </Alert>
        <LoadingButton
          className='btn btn-danger'
          label={`I want to delete ${props.studyInfo.name}(${props.studyInfo.key}) `}
          disabled={!props.studyInfo}
          type="button"
          onClick={() => {
            if (!props.studyInfo) {
              return;
            }
            if (window.confirm('Are you sure you want to delete the study?')) {
              props.onDeleteStudy(props.studyInfo?.key)
            }
          }}
        />
      </div> : null}
      <Credits />
    </div>
  );
};

export default StudyInfoEditor;

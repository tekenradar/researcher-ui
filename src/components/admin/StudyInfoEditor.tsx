import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { StudyInfo } from '../../hooks/useAppContext';
import Credits from '../Credits';
import LoadingButton from '../LoadingButton';

interface StudyInfoEditorProps {
  isLoading: boolean;
  studyInfo?: StudyInfo;
  onDeleteStudy: (studyKey: string) => void;
}

const emptyStudyInfo: StudyInfo = {
  key: '',
  name: '',
  description: '',
  studyColor: 'color-1',
  features: {
    datasetExporter: true,
    contacts: false,
  },
  availableDatasets: [],
}


const StudyInfoEditor: React.FC<StudyInfoEditorProps> = (props) => {
  const [currentStudy, setCurrentStudy] = useState<StudyInfo>(props.studyInfo ? props.studyInfo : emptyStudyInfo);

  useEffect(() => {
    setCurrentStudy(props.studyInfo ? props.studyInfo : emptyStudyInfo)
  }, [props.studyInfo])

  const validate = (): boolean => {
    if (currentStudy.key.length < 1) {
      return false;
    }
    if (currentStudy.name.length < 1) {
      return false;
    }
    return true;
  }

  const updateCurrentStudyValue = (objectKey: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setCurrentStudy(prev => {
      return {
        ...prev,
        [objectKey]: value
      }
    })
  }

  return (
    <div className='flex-grow-1 p-3'>
      <div className="bg-white p-3 shadow-sm">
        <h2 className="h5">{props.studyInfo ? `Edit Study: ${props.studyInfo.name}` : 'Create new study'}</h2>
        <Form onSubmit={(event) => {
          event.preventDefault()

        }}>
          <Form.Group className="mb-3" controlId="studyInfo.key">
            <Form.Label>Study-Key</Form.Label>
            <Form.Control type="text"
              value={currentStudy.key}
              disabled={props.studyInfo !== undefined}
              placeholder="key-of-the-study"
              onChange={updateCurrentStudyValue('key')}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="studyInfo.name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text"
              value={currentStudy.name}
              placeholder="Give a short name to your study"
              onChange={updateCurrentStudyValue('name')}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="studyInfo.description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={currentStudy.description}
              placeholder="You can add a short description that is displayed on the study selector page."
              onChange={updateCurrentStudyValue('description')}
            />
          </Form.Group>


          <Form.Group className="mb-3" controlId="studyInfo.description">
            <Form.Label>Study color</Form.Label>
            <div className='d-flex mb-3 align-items-center'>
              <Form.Select aria-label="Study color picker"
                value={currentStudy.studyColor}
                onChange={updateCurrentStudyValue('studyColor')}
              >
                <option value="color-1">color-1</option>
                <option value="color-2">color-2</option>
                <option value="color-3">color-3</option>
                <option value="color-4">color-4</option>
                <option value="color-5">color-5</option>
                <option value="color-6">color-6</option>
                <option value="color-7">color-7</option>
                <option value="color-8">color-8</option>
                <option value="color-9">color-9</option>
                <option value="color-10">color-10</option>

              </Form.Select>
              <div className={clsx('ms-2 h-100 p-3', `bg-study-${currentStudy.studyColor}`)} >

              </div>
            </div>
          </Form.Group>



          <LoadingButton
            type='submit'
            className='btn btn-primary'
            label='Save'
            disabled={!validate()}
          />
        </Form>
      </div >
      {
        props.studyInfo !== undefined ? <div className="bg-white p-3  mt-3 shadow-sm">
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
        </div> : null
      }
      < Credits />
    </div >
  );
};

export default StudyInfoEditor;

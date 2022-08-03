import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { format, fromUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { DatasetInfo, StudyInfo } from '../../hooks/useAppContext';
import Credits from '../Credits';
import LoadingButton from '../LoadingButton';
import DatasetInfoEditor from './DatasetInfoEditor';

interface StudyInfoEditorProps {
  isLoading: boolean;
  studyInfo?: StudyInfo;
  onSaveStudy: (studyInfo: StudyInfo) => void;
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
  const [currentStudy, setCurrentStudy] = useState<StudyInfo>(props.studyInfo ? props.studyInfo : { ...emptyStudyInfo });

  const [datasetInfoEditorOpen, setDatasetInfoEditorOpen] = useState(false);
  const [openedDatasetInfo, setOpenedDatasetInfo] = useState<undefined | DatasetInfo>(undefined);


  useEffect(() => {
    setCurrentStudy(props.studyInfo ? props.studyInfo : { ...emptyStudyInfo })
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

  const renderDatasets = () => {
    return <ListGroup variant='flush'>
      {currentStudy.availableDatasets?.map((datasetInfo, index) => {
        console.log(datasetInfo)

        return <ListGroup.Item key={index.toString()}>
          <div className='d-flex'>
            <div className='flex-grow-1'>
              <div className='fw-bold'>
                <span className='text-muted me-2'>{datasetInfo.surveyKey}</span>
                {datasetInfo.name}
              </div>
              <div>
                {datasetInfo.startDate > 0 ? <span className='me-2'>From: {format(fromUnixTime(datasetInfo.startDate), 'dd-MM-yyyy')}</span> : null}
                {datasetInfo.endDate > 0 ? <span>Until: {format(fromUnixTime(datasetInfo.endDate), 'dd-MM-yyyy')}</span> : null}
              </div>
              <div className=''>{datasetInfo.excludeColumns.length} excluded columns</div>
            </div>
            <div>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit</Tooltip>}>
                <button className="btn btn-link"
                  onClick={() => {
                    setOpenedDatasetInfo(datasetInfo);
                    setDatasetInfoEditorOpen(true);
                  }}
                >
                  <FontAwesomeIcon
                    className="fa-md me-1"
                    icon={faPen}
                  />
                </button>
              </OverlayTrigger>

              <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove</Tooltip>}>
                <button className="btn btn-link"
                  onClick={() => {
                    if (window.confirm('Do you really want to delete this entry?')) {
                      setCurrentStudy(prev => {
                        prev.availableDatasets?.splice(index, 1);
                        return { ...prev };
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon
                    className="fa-md"
                    icon={faTrash}
                  />
                </button>
              </OverlayTrigger>
            </div>
          </div>
        </ListGroup.Item>


      })}
    </ListGroup>
  }

  return (
    <div className='flex-grow-1 p-3 overflow-scroll mb-5'>
      <div className="bg-white p-3 shadow-sm">
        <h2 className="h5">{props.studyInfo ? `Edit Study: ${props.studyInfo.name}` : 'Create new study'}</h2>
        <Form onSubmit={(event) => {
          event.preventDefault()
          props.onSaveStudy(currentStudy);
        }}>
          <h3 className='h6'>General</h3>
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
              <div className={clsx('ms-2', `bg-study-${currentStudy.studyColor}`)} style={{ height: 38, width: 38, minWidth: 38 }}>

              </div>
            </div>
          </Form.Group>


          <hr></hr>
          <h3 className='h6'>Extra Features</h3>

          <div className='mb-3'>
            <Form.Check
              type='checkbox'
              id="studyInfo.features.contacts"
              checked={currentStudy.features.contacts}
              label={<span>Contacts <span className='text-muted'>(Access to contact data (temporary or permanent) and possibility to add notes)</span></span>}
              onChange={(event) => {
                const value = event.target.checked;
                setCurrentStudy(prev => {
                  return {
                    ...prev,
                    features: {
                      ...prev.features,
                      contacts: value
                    }
                  }
                })
              }}
            />

          </div>

          <hr></hr>
          <div className='mb-3'>
            <h3 className='h6'>Available Datasets</h3>

            {!currentStudy.availableDatasets || currentStudy.availableDatasets.length < 1 ? <p className='text-muted mb-0'>No available datasets defined for this study.</p> : renderDatasets()}
            <DatasetInfoEditor
              open={datasetInfoEditorOpen}
              onCancel={() => {
                setDatasetInfoEditorOpen(false);
                setOpenedDatasetInfo(undefined);
              }}
              datasetInfo={openedDatasetInfo}
              onSave={(datasetInfo) => {
                setCurrentStudy(prev => {
                  if (!prev.availableDatasets) {
                    prev.availableDatasets = [];
                  }
                  prev.availableDatasets?.push(datasetInfo);
                  return { ...prev };
                });
                setOpenedDatasetInfo(undefined);
                setDatasetInfoEditorOpen(false);
              }}
            />
            <Button
              className='mt-1'
              variant='link' type='button'
              onClick={() => { setDatasetInfoEditorOpen(true) }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>

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

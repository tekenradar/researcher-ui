import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { format, fromUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, InputGroup, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Credits from '../../../components/Credits';
import LoadingButton from '../../../components/LoadingButton';
import DatasetInfoEditor from './DatasetInfoEditor';
import { saveAs } from 'file-saver';
import { useFilePicker } from 'use-file-picker';
import EmailListEditor from './EmailListEditor';

interface StudyInfoEditorProps {
  isLoading: boolean;
  //studyInfo?: StudyInfo;
  //onSaveStudy: (studyInfo: StudyInfo) => void;
  onDeleteStudy: (studyKey: string) => void;
}

/*
const emptyStudyInfo: StudyInfo = {
  key: '',
  name: '',
  description: '',
  studyColor: 'color-1',
  features: {
    datasetExporter: true,
    contacts: false,
  },
  accessControl: {
    emails: [],
  },
  availableDatasets: [],
  contactFeatureConfig: {
    includeWithParticipantFlags: {}
  }
}*/

const Card: React.FC<{ className?: string, children: React.ReactNode; }> = (props) => {
  return <div className={clsx('bg-white shadow-sm rounded overflow-hidden', props.className)}>
    {props.children}
  </div>
}

const EditorSection: React.FC<{
  title: string, description: string,
  className?: string,
  children: React.ReactNode,
  action?: React.ReactNode,
}> = (props) => {
  return <div className={clsx(
    'row mt-3', props.className
  )}>
    <div className='col-12 col-md-4'>
      <h3 className='h5'>{props.title}</h3>
      <p className='text-muted fs-small'>{props.description}</p>
    </div>
    <div className='col-12 col-md-8'>
      <Card>
        <div className='p-3'>
          {props.children}
        </div>
        <div className='text-end p-3 bg-light'>
          {props.action}
        </div>

      </Card>
    </div>
  </div>
}




const StudyInfoEditor: React.FC<StudyInfoEditorProps> = (props) => {
  return <p>todo</p>
  /*const [currentStudy, setCurrentStudy] = useState<StudyInfo>(props.studyInfo ? props.studyInfo : { ...emptyStudyInfo });

  const [datasetInfoEditorOpen, setDatasetInfoEditorOpen] = useState(false);
  const [openedDatasetInfo, setOpenedDatasetInfo] = useState<undefined | DatasetInfo>(undefined);

  const [newParticpantContactInclusionFlag, setNewParticpantContactInclusionFlag] = useState({
    key: '',
    value: ''
  })

  const [openFileSelector, { filesContent, loading, clear }] = useFilePicker({
    accept: '.json',
    multiple: false,
  });


  useEffect(() => {
    setCurrentStudy(props.studyInfo ? props.studyInfo : { ...emptyStudyInfo })
  }, [props.studyInfo])

  useEffect(() => {
    if (filesContent.length > 0) {
      // console.log(filesContent)
      const content = JSON.parse(filesContent[0].content);
      setCurrentStudy(content);
      if (content.key.length > 0) {
        props.onSaveStudy(content);
        clear();
      }
    }
  }, [filesContent, clear, props])

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

  const renderContactConfigInputs = () => {
    let nodes = []
    for (let k in currentStudy.contactFeatureConfig.includeWithParticipantFlags) {
      nodes.push((<li key={k}>
        <div className="d-flex align-items-center">
          <span className='text-muted me-1'>key: </span><span>{k}</span> <span className='ms-2 me-1 text-muted'>value: </span><span>{currentStudy.contactFeatureConfig.includeWithParticipantFlags[k]}</span>
          <Button
            variant='link' type='button'
            onClick={() => {
              if (window.confirm("Do you want to remove this flag from the list?")) {
                setCurrentStudy(prev => {
                  delete prev.contactFeatureConfig.includeWithParticipantFlags[k];
                  return {
                    ...prev,
                  }
                })
              }
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </li>
      ))
    }

    return <React.Fragment>
      <h6>Inclusion flags (include if all of them present)</h6>
      <ul>
        {nodes}
      </ul>
      <InputGroup className="mt-2 mb-3">
        <Form.Control placeholder="enter the key, e.g. flow"
          value={newParticpantContactInclusionFlag.key}
          onChange={(event) => {
            const value = event.target.value;
            setNewParticpantContactInclusionFlag(prev => {
              return {
                ...prev,
                key: value
              }
            })
          }}
        />
        <Form.Control placeholder='expected value, e.g. TBflow'
          value={newParticpantContactInclusionFlag.value}
          onChange={(event) => {
            const value = event.target.value;
            setNewParticpantContactInclusionFlag(prev => {
              return {
                ...prev,
                value: value
              }
            })
          }}
        />
        <Button variant="outline-secondary" type='button'
          onClick={() => {
            setCurrentStudy(prev => {
              return {
                ...prev,
                contactFeatureConfig: {
                  includeWithParticipantFlags: {
                    ...prev.contactFeatureConfig.includeWithParticipantFlags,
                    [newParticpantContactInclusionFlag.key]: newParticpantContactInclusionFlag.value
                  }
                }
              }
            })
            setNewParticpantContactInclusionFlag({
              key: '', value: ''
            })
          }}
        >Add</Button>
      </InputGroup>
    </React.Fragment>
  }

  const generalConfig = () => {
    return <React.Fragment>
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
          placeholder="Give a short name to your substudy"
          onChange={updateCurrentStudyValue('name')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="studyInfo.description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={currentStudy.description}
          placeholder="You can add a short description that is displayed on the substudy selector page."
          onChange={updateCurrentStudyValue('description')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="studyInfo.description">
        <Form.Label>Substudy color</Form.Label>
        <div className='d-flex mb-3 align-items-center'>
          <Form.Select aria-label="Substudy color picker"
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
    </React.Fragment>
  }

  const availableDatasets = () => {
    return <React.Fragment>
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
            if (!openedDatasetInfo) {
              if (!prev.availableDatasets) {
                prev.availableDatasets = [];
              }
              prev.availableDatasets?.push(datasetInfo);
            } else {
              const index = prev.availableDatasets.findIndex(item => item.id === datasetInfo.id);
              prev.availableDatasets[index] = { ...datasetInfo }
            }
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
    </React.Fragment>
  }

  return (
    <div className='flex-grow-1 p-3 overflow-scroll mb-5'>

      <h2 className="h4 fw-bold">{props.studyInfo ? `Edit Substudy: ${props.studyInfo.name}` : 'Create new substudy'}</h2>

      {props.studyInfo === undefined ?
        <React.Fragment>
          <EditorSection
            title='Import'
            description='Import a study config file from the local file system. The file must be a valid JSON file.'
            action={<LoadingButton
              className={clsx(
                'btn btn-secondary',
              )}
              label="Import Config"
              type="button"
              disabled={loading}
              onClick={() => {
                openFileSelector()
              }}
            />}
          >
            <Alert
              className='mb-0'
              variant='info'
            >
              If you have exported a study config file from another substudy, you can import it here. Alternatively, continue with the form below to create a sub-study.
            </Alert>
          </EditorSection>
          <hr />
        </React.Fragment>
        : null}

      <Form onSubmit={(event) => {
        event.preventDefault()
        props.onSaveStudy(currentStudy);
      }}>

        <EditorSection
          title='General'
          description='General information about the substudy.'
          action={<LoadingButton
            type='submit'
            className='btn btn-primary'
            label='Save'
            disabled={!validate()}
          />}
        >
          {generalConfig()}
        </EditorSection>

        <hr />

        <EditorSection
          title='Available datasets'
          description='Define which datasets can be downloaded in this sub-study. You can define a time range for each dataset. If you want to exclude some columns from the dataset, you can specify them here.'
          action={<LoadingButton
            type='submit'
            className='btn btn-primary'
            label='Save'
            disabled={!validate()}
          />}
        >
          {availableDatasets()}
        </EditorSection>

        <hr />

        <EditorSection
          title='Access control'
          description='Define who can access this sub-study by the following email address list. Email notifications are controlled by a separate feature - see "Extra features" section.'
          action={<LoadingButton
            type='submit'
            className='btn btn-primary'
            label='Save'
            disabled={!validate()}
          />}
        >
          <EmailListEditor
            emails={currentStudy.accessControl?.emails || []}
            onListChanged={(emails: string[]) => {
              setCurrentStudy(prev => {
                return {
                  ...prev,
                  accessControl: {
                    ...prev.accessControl,
                    emails
                  }
                }
              })
            }}
          />
        </EditorSection>

        <hr />

        <EditorSection
          title='Extra features'
          description='Configuration if contact data feature is available and how to include contacts into the substudy. Subscription to receive emails whenever a new contact info is added is available for all researchers with access to the sub-study from the normal "participant contacts" view.'
          action={<LoadingButton
            type='submit'
            className='btn btn-primary'
            label='Save'
            disabled={!validate()}
          />}
        >
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
          {currentStudy.features.contacts ?
            <React.Fragment>
              <hr></hr>
              <div className='mb-3'>
                <h3 className='h6'>Participant contact config</h3>
                <Alert variant='info'>Participant contacts are recorded through T0_Invites survey. The event will be processed by the substudy if the following participant flag (with key and value) are preset in the participant state.</Alert>
                {renderContactConfigInputs()}
              </div>
            </React.Fragment>
            : null}
        </EditorSection>
      </Form>

      {
        props.studyInfo !== undefined ? <React.Fragment>
          <hr />

          <EditorSection
            title='Export config'
            description='Export the current configuration as a JSON file. You can import this file on a different instance of the platform to create a new substudy with the same configuration.'
            action={<LoadingButton
              className={clsx(
                'btn ms-2 btn-secondary',
              )}
              label="Export as json file"
              type="button"
              disabled={!validate()}
              onClick={() => {
                const content = JSON.stringify(currentStudy, undefined, 2);
                saveAs(new Blob([content]), `${currentStudy.key}.json`)
              }}
            />}
          >
            <p className='mb-0'>
              Use the button below to start the download of the current configuration.
            </p>
          </EditorSection>

          <hr />

          <EditorSection
            title='Delete substudy'
            description='Remove this sub-study permanently.'
            action={<LoadingButton
              className='btn btn-danger'
              label={`I want to delete ${props.studyInfo.name}(${props.studyInfo.key}) `}
              disabled={!props.studyInfo}
              type="button"
              onClick={() => {
                if (!props.studyInfo) {
                  return;
                }
                if (window.confirm('Are you sure you want to delete the sub-study?')) {
                  props.onDeleteStudy(props.studyInfo?.key)
                }
              }}
            />}
          >
            <Alert variant='danger mb-0'>
              This is an irreversible action. Perform this only if you are certain of the consequences and you intend to delete the substudy object.
            </Alert>
          </EditorSection>
        </React.Fragment> : null}


      < Credits />
    </div >
  );*/
};

export default StudyInfoEditor;

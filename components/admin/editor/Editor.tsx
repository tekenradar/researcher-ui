'use client';

import { StudyInfo } from '@/components/StudyInfoCard';
import React, { useEffect, useState, useTransition } from 'react';
import EditorSection from './EditorSection';
import LoadingButton from '@/components/LoadingButton';
import { Alert, Button, Form, InputGroup, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useFilePicker } from 'use-file-picker';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DatasetInfo } from '@/components/substudy/exporter/DatasetSelector';
import saveAs from 'file-saver';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { format, fromUnixTime } from 'date-fns';
import EmailListEditor from './EmailListEditor';
import DatasetInfoEditor from './DatasetInfoEditor';

interface EditorProps {
  substudy?: StudyInfo;
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
  accessControl: {
    emails: [],
  },
  availableDatasets: [],
  contactFeatureConfig: {
    includeWithParticipantFlags: {}
  }
}

const Editor: React.FC<EditorProps> = (props) => {
  const router = useRouter();
  const [currentStudy, setCurrentStudy] = useState<StudyInfo>(props.substudy ? props.substudy : { ...emptyStudyInfo });
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [datasetInfoEditorOpen, setDatasetInfoEditorOpen] = useState(false);
  const [openedDatasetInfo, setOpenedDatasetInfo] = useState<undefined | DatasetInfo>(undefined);

  const [newParticpantContactInclusionFlag, setNewParticpantContactInclusionFlag] = useState({
    key: '',
    value: ''
  })

  const [openFileSelector, { filesContent, loading: isFileLoading, clear }] = useFilePicker({
    accept: '.json',
    multiple: false,
  });

  useEffect(() => {
    setCurrentStudy(props.substudy ? props.substudy : { ...emptyStudyInfo })
  }, [props.substudy])

  useEffect(() => {
    if (filesContent.length > 0) {
      // console.log(filesContent)
      const content = JSON.parse(filesContent[0].content);
      setCurrentStudy(content);
      if (content.key.length > 0) {
        saveStudyInfo(content)
        clear();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filesContent])

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

  const saveStudyInfo = async (studyInfo: StudyInfo) => {
    if (isPending || isLoading) {
      return;
    }
    setIsLoading(true);
    setErrorMsg('');

    try {
      const url = new URL(`/api/researcher-backend/v1/substudy-management`, process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(studyInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log(data);
      startTransition(() => {
        router.replace(`/admin/${studyInfo.key}`);
      });
    } catch (err: any) {
      console.error(err)
      setErrorMsg('Error saving substudy');
    } finally {
      setIsLoading(false);
    }
  }


  const deleteStudyInfo = async () => {
    if (isPending || isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      const url = new URL(`/api/researcher-backend/v1/substudy-management/${currentStudy.key}`, process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(url.toString(), {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      // console.log(data);
      startTransition(() => {
        router.replace(`/admin`);
      });
    } catch (err: any) {
      console.error(err)
      setErrorMsg('Error deleting substudy');
    } finally {
      setIsLoading(false);
    }
  }

  const generalConfig = () => {
    return <React.Fragment>
      <Form.Group className="mb-3" controlId="studyInfo.key">
        <Form.Label>Study-Key</Form.Label>
        <Form.Control type="text"
          value={currentStudy.key}
          disabled={props.substudy !== undefined}
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
                  type='button'
                  onClick={() => {
                    setOpenedDatasetInfo(datasetInfo);
                    setDatasetInfoEditorOpen(true);
                  }}
                >
                  <FontAwesomeIcon
                    className="fa-md me-1"
                    icon={faPen}
                    height={16}
                  />
                </button>
              </OverlayTrigger>

              <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove</Tooltip>}>
                <button className="btn btn-link"
                  type='button'
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
            <FontAwesomeIcon icon={faTrash} height={16} />
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
        <Button variant="outline-secondary"
          type='button'
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
          console.log('onSave', datasetInfo)
          setCurrentStudy(prev => {
            let newDatasetList: Array<DatasetInfo> = [];
            if (prev.availableDatasets !== undefined) {
              newDatasetList = [...prev.availableDatasets];
            }
            if (!openedDatasetInfo) {
              newDatasetList.push(datasetInfo);
            } else {
              const index = newDatasetList.findIndex(item => item.id === datasetInfo.id);
              newDatasetList[index] = { ...datasetInfo }
            }
            return {
              ...prev,
              availableDatasets: [...newDatasetList]
            };
          });
          setOpenedDatasetInfo(undefined);
          setDatasetInfoEditorOpen(false);
        }}
      />
      <Button
        className='mt-1'
        variant='link'
        type='button'
        onClick={() => { setDatasetInfoEditorOpen(true) }}
      >
        <FontAwesomeIcon icon={faPlus} height={16} />
      </Button>
    </React.Fragment>
  }


  return (
    <>
      <h2 className="h4 fw-bold">{props.substudy ? `Edit Substudy: ${props.substudy.name}` : 'Create new substudy'}</h2>
      <Link
        className='btn btn-outline-secondary btn-sm mb-3'
        href="/admin"
      >
        Back to substudy list
      </Link>
      {errorMsg.length > 0 && <Alert variant='danger'>{errorMsg}</Alert>}
      {props.substudy === undefined ?
        <React.Fragment>
          <EditorSection
            title='Import'
            description='Import a study config file from the local file system. The file must be a valid JSON file.'
            action={<LoadingButton
              className={'btn btn-secondary'}
              label="Import Config"
              type="button"
              disabled={isFileLoading}
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
        saveStudyInfo(currentStudy);
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
        props.substudy !== undefined ? <React.Fragment>
          <hr />

          <EditorSection
            title='Export config'
            description='Export the current configuration as a JSON file. You can import this file on a different instance of the platform to create a new substudy with the same configuration.'
            action={<LoadingButton
              className={'btn ms-2 btn-secondary'}
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
              label={`I want to delete ${props.substudy.name}(${props.substudy.key}) `}
              disabled={!props.substudy}
              type="button"
              onClick={() => {
                if (!props.substudy) {
                  return;
                }
                if (window.confirm('Are you sure you want to delete the sub-study?')) {
                  deleteStudyInfo();
                }
              }}
            />}
          >
            <Alert variant='danger mb-0'>
              This is an irreversible action. Perform this only if you are certain of the consequences and you intend to delete the substudy object.
            </Alert>
          </EditorSection>
        </React.Fragment> : null}

    </>
  );
};

export default Editor;

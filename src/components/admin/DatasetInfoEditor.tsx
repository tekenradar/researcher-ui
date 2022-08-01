import { fromUnixTime, getUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { DatasetInfo } from '../../hooks/useAppContext';
import CustomDatePicker from '../CustomDatePicker';

interface DatasetInfoEditorProps {
  open: boolean;
  datasetInfo?: DatasetInfo;
  onSave: (datasetInfo: DatasetInfo) => void;
  onCancel: () => void;
}

const defaultDatasetInfo: DatasetInfo = {
  surveyKey: '',
  name: '',
  excludeColumns: [],
  startDate: 0,
  endDate: 0
}

const DatasetInfoEditor: React.FC<DatasetInfoEditorProps> = (props) => {
  const [datasetInfo, setDatasetInfo] = useState({ ...defaultDatasetInfo });
  const [useStartLimit, setUseStartLimit] = useState(false);
  const [useEndLimit, setUseEndLimit] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!props.open) {
      setDatasetInfo({
        ...defaultDatasetInfo
      })
    }
  }, [props.open])

  useEffect(() => {
    if (datasetInfo.startDate < 1) {
      setUseStartLimit(false);
      setStartDate(undefined);
    } else {
      setUseStartLimit(true);
      setStartDate(fromUnixTime(datasetInfo.startDate))
    }
    if (datasetInfo.endDate < 1) {
      setUseEndLimit(false);
      setEndDate(undefined);
    } else {
      setUseEndLimit(true);
      setEndDate(fromUnixTime(datasetInfo.endDate))
    }
  }, [datasetInfo])


  useEffect(() => {
    if (props.datasetInfo) {
      setDatasetInfo({ ...props.datasetInfo })
    }
  }, [props.datasetInfo])

  const updateCurrentValue = (objectKey: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDatasetInfo(prev => {
      return {
        ...prev,
        [objectKey]: value
      }
    })
  }


  return (
    <Modal show={props.open}
      backdrop="static"
      onHide={props.onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Dataset Config</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form.Group className="mb-3" controlId="datasetInfo.surveyKey">
          <Form.Label>Survey Key</Form.Label>
          <Form.Control type="text"
            value={datasetInfo.surveyKey}
            placeholder="Enter survey key (e.g. TBflow_Adults)"
            onChange={updateCurrentValue('surveyKey')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="datasetInfo.name">
          <Form.Label>Display Name</Form.Label>
          <Form.Control type="text"
            value={datasetInfo.name}
            placeholder="Display name in the exporter"
            onChange={updateCurrentValue('name')}
          />
        </Form.Group>


        <Form.Group className="mb-3" controlId="datasetInfo.exludedColumns">
          <Form.Label>Excluded columns (one per line)</Form.Label>
          <Form.Control type="text"
            as="textarea"
            value={datasetInfo.excludeColumns.join('\n')}
            placeholder="e.g., TBflow_Adults.Q1"
            rows={5}
            onChange={(event) => {
              const value = event.target.value;
              setDatasetInfo(prev => {
                return {
                  ...prev,
                  excludeColumns: value.split('\n')
                }
              })
            }}
          />
        </Form.Group>


        <div className='d-flex align-items-center mb-3'>
          <Form.Check
            type='checkbox'
            id="datasetInfo.limitStart"
            checked={useStartLimit}
            label="Limit start time"
            onChange={(event) => {
              const value = event.target.checked;
              setUseStartLimit(value);
            }}
          />
          {useStartLimit ? <div className='ms-auto'>
            <CustomDatePicker
              selectedDate={startDate}
              onChange={(date) => {
                if (date === null) {
                  setStartDate(undefined);
                  return
                }
                setStartDate(date)
                setDatasetInfo(prev => {
                  return {
                    ...prev,
                    startDate: getUnixTime(date),
                  }
                })

              }}
            />
          </div> : null}

        </div>
        <div className='d-flex align-items-center'>
          <Form.Check
            type='checkbox'
            id="datasetInfo.limitEnd"
            checked={useEndLimit}
            label="Limit end time"
            onChange={(event) => {
              const value = event.target.checked;
              setUseEndLimit(value);
            }}
          />
          {useEndLimit ? <div className='ms-auto'>
            <CustomDatePicker
              selectedDate={endDate}
              onChange={(date) => {
                if (date === null) {
                  setStartDate(undefined);
                  return
                }
                setEndDate(date)
                setDatasetInfo(prev => {
                  return {
                    ...prev,
                    endDate: getUnixTime(date),
                  }
                })
              }}
            />
          </div> : null}

        </div>



      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onCancel}>
          Close
        </Button>
        <Button variant="primary"
          disabled={datasetInfo.surveyKey.length < 1 || datasetInfo.name.length < 1}
          onClick={() => {
            props.onSave(datasetInfo)
          }}>
          Add new entry
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DatasetInfoEditor;

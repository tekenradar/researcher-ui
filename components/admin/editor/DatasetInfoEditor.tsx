import { fromUnixTime, getUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { makeid } from '../../../utils/makeid';
import CustomDatePicker from '../../CustomDatePicker';
import { DatasetInfo } from '@/components/substudy/exporter/DatasetSelector';

interface DatasetInfoEditorProps {
  open: boolean;
  datasetInfo?: DatasetInfo;
  onSave: (datasetInfo: DatasetInfo) => void;
  onCancel: () => void;
}

const getDefaultDatasetInfo = (): DatasetInfo => {
  return {
    id: makeid(10),
    surveyKey: '',
    name: '',
    excludeColumns: [],
    startDate: 0,
    endDate: 0
  }
}

const DatasetInfoEditor: React.FC<DatasetInfoEditorProps> = (props) => {
  const [datasetInfo, setDatasetInfo] = useState({ ...getDefaultDatasetInfo() });
  const [useStartLimit, setUseStartLimit] = useState(false);
  const [useEndLimit, setUseEndLimit] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!props.open) {
      setDatasetInfo({
        ...getDefaultDatasetInfo()
      })
    }
  }, [props.open])


  useEffect(() => {
    if (props.datasetInfo) {
      setDatasetInfo({ ...props.datasetInfo })
      if (props.datasetInfo.startDate < 1) {
        setUseStartLimit(false);
        setStartDate(undefined);
      } else {
        setUseStartLimit(true);
        setStartDate(fromUnixTime(props.datasetInfo.startDate))
      }
      if (props.datasetInfo.endDate < 1) {
        setUseEndLimit(false);
        setEndDate(undefined);
      } else {
        setUseEndLimit(true);
        setEndDate(fromUnixTime(props.datasetInfo.endDate))
      }
    }
  }, [props.datasetInfo])

  useEffect(() => {
    const value = startDate ? getUnixTime(startDate) : 0;
    setDatasetInfo(prev => {
      return {
        ...prev,
        startDate: value,
      }
    })
  }, [startDate])

  useEffect(() => {
    const value = endDate ? getUnixTime(endDate) : 0;
    setDatasetInfo(prev => {
      return {
        ...prev,
        endDate: value,
      }
    })
  }, [endDate])

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
              const excluded: string[] = [];
              value.split('\n').forEach(v => {
                if (v.trim().length > 0) {
                  excluded.push(v.trim())
                }
              })
              setDatasetInfo(prev => {
                return {
                  ...prev,
                  excludeColumns: excluded
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
              if (!value) {
                setStartDate(undefined)
              }
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
              if (!value) {
                setEndDate(undefined)
              }
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
              }}
            />
          </div> : null}

        </div>



      </Modal.Body>
      <Modal.Footer>
        <Button
          type='button'
          variant="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="primary"
          type='button'
          disabled={datasetInfo.surveyKey.length < 1 || datasetInfo.name.length < 1}
          onClick={() => {
            props.onSave(datasetInfo)
          }}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DatasetInfoEditor;

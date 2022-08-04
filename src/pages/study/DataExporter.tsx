import clsx from "clsx";
import { addMonths } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { Form, Toast, ToastContainer } from "react-bootstrap";
import Credits from "../../components/Credits";
import CustomDatePicker from "../../components/CustomDatePicker";
import LoadingButton from "../../components/LoadingButton";
import { DatasetInfo, useAppContext } from "../../hooks/useAppContext";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";
import { saveAs } from 'file-saver';
import { format, getUnixTime } from "date-fns";

interface DataExporterProps { }


const apiRoot = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : '';
const apiKey = process.env.REACT_APP_SERVICE_API_KEY ? process.env.REACT_APP_SERVICE_API_KEY : "";


const DataExporter: React.FC<DataExporterProps> = (props) => {
  const { studyInfo } = useAppContext();

  const { btnClassName } = useStudyColorClassnames();

  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string | undefined>();
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
  const [datasets, setDataSets] = useState<DatasetInfo[]>([])
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (studyInfo?.availableDatasets) {
      setDataSets(studyInfo.availableDatasets);
    }

  }, [studyInfo])

  const downloadData = async () => {
    setErrorMsg('')
    try {
      setLoading(true);
      const url = new URL(`${apiRoot}/v1/study/${studyInfo?.key}/data/${selectedDataset}`);
      url.search = new URLSearchParams({ from: `${getUnixTime(startDate)}`, until: `${getUnixTime(endDate)}` }).toString();

      const response = await fetch(url.toString(), {
        headers: {
          'Api-Key': apiKey,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error);
      }

      const data = await response.blob();
      const filename = `${studyInfo?.key}_${selectedDataset}_${format(startDate, 'yyyy-MM-dd')}-${format(endDate, 'yyyy-MM-dd')}.csv`
      saveAs(data, filename);

    } catch (err: any) {
      setErrorMsg(err.toString());
      console.error(err)
    } finally {
      setLoading(false);
    }
  }


  const datasetSelector = <Form.Group className="mb-3">
    <Form.Label>Dataset:</Form.Label>
    <Form.Select
      aria-label="Select a dataset"
      value={selectedDataset}
      onChange={(event) => {
        setSelectedDataset(event.target.value);
      }}
    >
      <option>Select a dataset</option>
      {datasets.map(value => <option key={value.surveyKey} value={value.surveyKey}>{value.name}</option>)}
    </Form.Select>
  </Form.Group>


  const rangeSelector = <div className="row">
    <div className="col-6">
      <Form.Group className="mb-3">
        <Form.Label>From:</Form.Label>
        <CustomDatePicker
          selectedDate={startDate}
          onChange={(date) => {
            if (date === null) {
              return
            }
            setStartDate(date)
          }}
        />
      </Form.Group>
    </div>

    <div className="col-6">
      <Form.Group className="mb-3">
        <Form.Label>Until:</Form.Label>
        <CustomDatePicker
          selectedDate={endDate}
          onChange={(date) => {
            if (date === null) {
              return
            }
            setEndDate(date)
          }}
        />
      </Form.Group>
    </div>
  </div>


  const downloadBtn = <LoadingButton
    className={clsx(
      'btn',
      btnClassName,
    )}
    label="Download"
    disabled={selectedDataset === undefined}
    loading={loading}
    type="submit"
  />

  return <div className="w-100 p-3">
    <div className="bg-white p-3  shadow-sm">
      <h2 className="">Dataset Exporter</h2>
      <Form onSubmit={(event) => {
        event.preventDefault()
        downloadData();
      }}>
        {datasetSelector}
        {rangeSelector}
        {downloadBtn}
      </Form>
    </div>
    <Credits />
    <ToastContainer className="p-3" position={'bottom-center'}>
      <Toast bg="danger" show={errorMsg.length > 0} onClose={() => setErrorMsg('')}>
        <Toast.Header className="">
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{errorMsg}</Toast.Body>
      </Toast>
    </ToastContainer>

  </div>
};

export default DataExporter;

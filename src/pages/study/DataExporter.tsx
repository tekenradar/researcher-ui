import clsx from "clsx";
import { addMonths } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Credits from "../../components/Credits";
import CustomDatePicker from "../../components/CustomDatePicker";
import LoadingButton from "../../components/LoadingButton";
import { DatasetInfo, useAppContext } from "../../hooks/useAppContext";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";

interface DataExporterProps { }


const DataExporter: React.FC<DataExporterProps> = (props) => {
  const { isLoading, studyInfo } = useAppContext();

  const { btnClassName } = useStudyColorClassnames();

  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string | undefined>();
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
  const [datasets, setDataSets] = useState<DatasetInfo[]>([])

  useEffect(() => {
    if (studyInfo?.availableDatasets) {
      setDataSets(studyInfo.availableDatasets);
    }

  }, [studyInfo])


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
        setLoading(true);
      }}>
        {datasetSelector}
        {rangeSelector}
        {downloadBtn}
      </Form>
    </div>
    <Credits />

  </div>
};

export default DataExporter;

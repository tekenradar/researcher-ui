import clsx from "clsx";
import { addMonths } from "date-fns/esm";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Credits from "../../components/Credits";
import CustomDatePicker from "../../components/CustomDatePicker";
import LoadingButton from "../../components/LoadingButton";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";

interface DataExporterProps { }

const DataExporter: React.FC<DataExporterProps> = (props) => {
  const { btnClassName } = useStudyColorClassnames();

  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string | undefined>();
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());


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
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
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
      'btn text-white',
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

import clsx from "clsx";
import React, { useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Credits from "../../components/Credits";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";

interface DataExporterProps { }

const DataExporter: React.FC<DataExporterProps> = (props) => {
  const { btnClassName } = useStudyColorClassnames();

  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string | undefined>();


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
        <div>Datepicker 1</div>
      </Form.Group>
    </div>

    <div className="col-6">
      <Form.Group className="mb-3">
        <Form.Label>Until:</Form.Label>
        <div>Datepicker 2</div>
      </Form.Group>
    </div>
  </div>


  const downloadBtn = <button className={clsx(
    "btn text-white",
    btnClassName
  )}
    type="submit"
    disabled={loading || selectedDataset === undefined}
  >
    Download
    {loading ? <Spinner className="ms-2" animation="border" size="sm" /> : null}
  </button>

  return <div className="w-100 p-3">
    <div className="bg-white p-3">
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

'use client'

import React from 'react';
import { Form } from 'react-bootstrap';

interface DatasetSelectorProps {
  datasets: DatasetInfo[];
  selectedDataset: string | undefined;
  onChange: (value: string) => void;
}

export interface DatasetInfo {
  id: string;
  surveyKey: string;
  name: string;
  excludeColumns: string[];
  startDate: number;
  endDate: number;
}


const DatasetSelector: React.FC<DatasetSelectorProps> = (props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Dataset:</Form.Label>
      <Form.Select
        aria-label="Select a dataset"
        value={props.selectedDataset}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      >
        <option>Select a dataset</option>
        {props.datasets.map(value => <option key={value.id} value={value.id}>{value.name}</option>)}
      </Form.Select>
    </Form.Group>

  );
};

export default DatasetSelector;

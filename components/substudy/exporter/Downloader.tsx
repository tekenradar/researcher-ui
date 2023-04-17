'use client'

import React, { useState } from 'react';
import DatasetSelector, { DatasetInfo } from './DatasetSelector';
import { addMonths } from "date-fns/esm";
import RangeSelector from './RangeSelector';
import { Form, } from 'react-bootstrap';
import LoadingButton from '@/components/LoadingButton';
import clsx from 'clsx';
import { format, getUnixTime } from 'date-fns';
import saveAs from 'file-saver';


interface DownloaderProps {
  substudy: any;
}

const Downloader: React.FC<DownloaderProps> = ({ substudy }) => {

  const [selectedDataset, setSelectedDataset] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState(addMonths(new Date(), -1));
  const [endDate, setEndDate] = useState(new Date());
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const downloadData = async () => {
    setErrorMsg('')
    if (!selectedDataset) {
      setErrorMsg('Please select a dataset');
      return;
    }
    try {
      setLoading(true);

      const baseURL = `${window.location.protocol}//${window.location.host}`;
      const url = new URL(`/api/substudy/${substudy.key}/exporter`, baseURL);
      url.search = new URLSearchParams({
        dataset: selectedDataset,
        from: `${getUnixTime(startDate)}`, until: `${getUnixTime(endDate)}`
      }).toString();

      const response = await fetch(url.toString());
      if (!response.ok) {
        const err = await response.json()
        console.log(err)
        throw new Error(err.error);
      }

      const data = await response.blob();
      const filename = `${substudy.key}_${substudy.availableDatasets?.find((item: DatasetInfo) => item.id === selectedDataset)?.surveyKey}_${format(startDate, 'yyyy-MM-dd')}-${format(endDate, 'yyyy-MM-dd')}.csv`
      saveAs(data, filename);
    } catch (err: any) {
      setErrorMsg(err.toString());
      console.error(err)
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h2 className="">Dataset Exporter</h2>
      <Form onSubmit={(event) => {
        event.preventDefault()
        downloadData();
      }}>
        <DatasetSelector
          datasets={substudy.availableDatasets || []}
          selectedDataset={selectedDataset}
          onChange={(value) => {
            setSelectedDataset(value)
          }}
        />
        <RangeSelector
          startDate={startDate}
          endDate={endDate}
          onChange={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }}
        />

        <LoadingButton
          className={clsx(
            'btn',
            `btn-study-${substudy.studyColor}`,
          )}
          label="Download"
          disabled={selectedDataset === undefined}
          loading={loading}
          type="submit"
        />

        {errorMsg.length > 0 &&
          <div className='alert alert-danger mt-3 mb-0'>
            {errorMsg}
          </div>}

      </Form>
    </div>
  );
};

export default Downloader;

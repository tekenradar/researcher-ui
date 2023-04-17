'use client'

import React from 'react';
import DatasetSelector, { DatasetInfo } from './DatasetSelector';

interface DownloaderProps {
  datasets?: DatasetInfo[];
}

const Downloader: React.FC<DownloaderProps> = (props) => {
  return (
    <div>
      <DatasetSelector
        datasets={props.datasets || []}
        selectedDataset={undefined}
        onChange={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

export default Downloader;

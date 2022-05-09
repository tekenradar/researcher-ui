import React from 'react';
import { useParams } from 'react-router-dom';

interface DataExporterProps {
}

const DataExporter: React.FC<DataExporterProps> = (props) => {
  let params = useParams();
  return (
    <p>DataExporter for {params.studykey}</p>
  );
};

export default DataExporter;

import CustomDatePicker from '@/components/CustomDatePicker';
import React from 'react';
import { Form } from 'react-bootstrap';

interface RangeSelectorProps {
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  return (
    <div className="row">
      <div className="col-6">
        <Form.Group className="mb-3">
          <Form.Label>From:</Form.Label>
          <CustomDatePicker
            selectedDate={startDate}
            onChange={(date) => {
              if (date === null) {
                return
              }
              onChange(date, endDate)
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
              onChange(startDate, date)
            }}
          />
        </Form.Group>
      </div>
    </div>
  );
};

export default RangeSelector;

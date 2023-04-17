'use client'

import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { useRef } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import DatePicker from "react-datepicker";


interface CustomDatePickerProps {
  id?: string;
  selectedDate?: Date;
  onChange: (date: Date | null) => void;
}


const CustomDatepicker: React.FC<CustomDatePickerProps> = (props) => {
  const datePickerRef = useRef<DatePicker>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);


  const DatepickerContainer = ({ className, children }: any) => {
    return (
      <div className="shadow bg-white">
        <div className="react-datepicker__triangle"></div>
        <span className={className} >{children}</span>
      </div>
    )
  }

  const DatepickerHeader = ({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }: any) => {
    return (
      <div className={clsx(
        "my-1 d-flex justify-content-between align-items-center"
      )}>
        <button
          onClick={(event) => {
            event.stopPropagation()
            decreaseMonth()
            return false;
          }}
          type="button"
          disabled={prevMonthButtonDisabled} className="btn datepicker-arrow-btn px-2 ms-3 ">
          <FontAwesomeIcon
            icon={faChevronLeft}
          />
        </button>

        {format(date, 'MMM. yyyy')}

        <button
          onClick={(event) => {
            event.stopPropagation()
            increaseMonth()
          }}
          type="button"
          disabled={nextMonthButtonDisabled} className="btn datepicker-arrow-btn px-2 me-3">
          <FontAwesomeIcon
            icon={faChevronRight}
          />
        </button>
      </div>
    )
  }

  return (
    <InputGroup
      ref={wrapperRef}
      tabIndex={0}
      className="w-100 d-flex flex-nowrap"
      onClick={() => datePickerRef.current?.setOpen(true)}
    >
      <DatePicker
        id={props.id}
        ref={datePickerRef}
        className="rounded-0 rounded-start form-control "
        onChange={props.onChange}
        autoComplete="off"
        calendarContainer={DatepickerContainer}
        renderCustomHeader={DatepickerHeader}
        popperPlacement="bottom"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [5, 10],
            },
          },
        ]}
        selected={props.selectedDate}
        onCalendarOpen={() => wrapperRef.current?.focus()}
        dateFormat={'dd-MM-yyyy'}
      />
      <Button
        variant='secondary'
      >
        <FontAwesomeIcon
          icon={faCalendar}
        />
      </Button>
    </InputGroup>
  );
};

export default CustomDatepicker;

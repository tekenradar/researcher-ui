import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ListGroup, Spinner } from 'react-bootstrap';
import { StudyInfo } from '../../hooks/useAppContext';

interface StudyInfoListProps {
  isLoading: boolean;
  studyInfos: StudyInfo[];
  selectedStudyKey?: string;
  onAddNew: () => void;
  onSelect: (studyInfo: StudyInfo) => void;
}

const StudyInfoList: React.FC<StudyInfoListProps> = (props) => {
  return (
    <div className='bg-white h-100 border-end overflow-scroll' style={{ minWidth: 150 }}>
      <h6 className='ms-2 mt-3'>Edit substudy:</h6>
      {props.isLoading ? <div className='py-3 text-center'>
        <Spinner className="mx-1" size="sm" animation="grow" />
        <Spinner className="mx-1" size="sm" animation="grow" />
        <Spinner className="mx-1" size="sm" animation="grow" />
      </div> : null}
      <ListGroup variant='flush'>
        {props.studyInfos.map(data => {

          return <ListGroup.Item action
            active={props.selectedStudyKey === data.key}
            key={data.key}
            className='w-100'
            onClick={() => {
              props.onSelect(data);
            }}
          >
            {data.name}
          </ListGroup.Item>
        })}
      </ListGroup>
      <div className='text-center mt-1 '>
        <Button
          variant="link"
          onClick={() => {
            props.onAddNew();
          }}>
          <FontAwesomeIcon
            icon={faPlus}
          />

        </Button>
      </div>
    </div>
  );
};

export default StudyInfoList;

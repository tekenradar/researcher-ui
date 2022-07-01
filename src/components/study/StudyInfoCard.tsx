import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { StudyInfo } from '../../hooks/useAppContext';

interface StudyInfoCardProps {
  study: StudyInfo;
}

const StudyInfoCard: React.FC<StudyInfoCardProps> = (props) => {
  const bgColor = `alert-study-${props.study.key}`;
  const color = `text-study-${props.study.key}`;
  const borderColor = `border-study-${props.study.key}`;

  return (
    <div className='col-12 col-md-6 col-lg-4'>
      <Link
        className={clsx(
          "p-3 scale-effect-on-hover text-decoration-none d-flex flex-column border h-100",
          borderColor,
          bgColor,
          color,
        )}
        to={props.study.key}
      >
        <h5>{props.study.name}</h5>
        <p className='flex-grow-1'>{props.study.description}</p>
        <div className='text-end text-decoration-underline'>Open Study<FontAwesomeIcon className='ms-2' icon={faAnglesRight} /></div>
      </Link>
    </div>
  );
};

export default StudyInfoCard;

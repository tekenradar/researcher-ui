import React from 'react';
import { fromUnixTime, format } from 'date-fns'
import { useStudyColorClassnames } from '../../hooks/useStudyColorClassnames';
import clsx from 'clsx';

interface NoteProps {
  time: number;
  author: string;
  content: string;
}

const Note: React.FC<NoteProps> = (props) => {
  const { borderClassName, color } = useStudyColorClassnames();


  return (
    <div className='my-3'>
      <div className='d-flex text-muted fs-small'>
        <span className='flex-grow-1'>{format(fromUnixTime(props.time), 'dd-MM-yy')}</span>
        <span>{props.author}</span>
      </div>
      <div
        className={clsx(
          'p-2 border form-control',
          borderClassName,

        )}
        style={{
          whiteSpace: 'pre-line',
        }}>
        {props.content}
      </div>
    </div>
  );
};

export default Note;

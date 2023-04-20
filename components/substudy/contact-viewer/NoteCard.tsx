import React from 'react';
import { fromUnixTime, format } from 'date-fns'

import clsx from 'clsx';
import { Note } from '../contacts/types';


interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = (props) => {
  return (
    <div className='mb-3'>
      <div className='d-flex text-muted fs-small'>
        <span className='flex-grow-1'>{format(fromUnixTime(props.note.time), 'dd-MM-yy')}</span>
        <span>{props.note.author}</span>
      </div>
      <div
        className={clsx(
          'p-2 border form-control',
        )}
        style={{
          whiteSpace: 'pre-line',
        }}>
        {props.note.content}
      </div>
    </div>
  );
};

export default NoteCard;

import React from 'react';
import { fromUnixTime, format } from 'date-fns'

interface NoteProps {
  time: number;
  author: string;
  content: string;
}

const Note: React.FC<NoteProps> = (props) => {


  return (
    <div className='my-3'>
      <div className='d-flex text-muted fs-small'>
        <span className='flex-grow-1'>{format(fromUnixTime(props.time), 'dd-MM-yy')}</span>
        <span>{props.author}</span>
      </div>
      <div
        className='p-2 bg-info'
        style={{
          whiteSpace: 'pre-line',
        }}>
        {props.content}
      </div>
    </div>
  );
};

export default Note;

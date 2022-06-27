import React from 'react';
import { fromUnixTime, format } from 'date-fns'

interface NoteProps {
  time: number;
  author: string;
  content: string;
}

const Note: React.FC<NoteProps> = (props) => {


  return (
    <div>
      <div className='d-flex'>
        <span>{format(fromUnixTime(props.time), 'dd-MM-yy')}</span>
      </div>
      <div style={{
        whiteSpace: 'pre-line',
      }}>
        {props.content}
      </div>
    </div>
  );
};

export default Note;

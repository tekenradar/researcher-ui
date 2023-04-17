import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import LoadingButton from '../../../../components/LoadingButton';
import NoteCard from './NoteCard';

export interface Note {
  id: string;
  time: number;
  author: string;
  content: string;
}

interface NotesProps {
  contactNotes?: Note[];
  isLoading: boolean;
  onAddContactNote: (message: string) => void;
}

const Notes: React.FC<NotesProps> = (props) => {
  const [newNoteMessage, setNewNoteMessage] = useState('');

  useEffect(() => {
    if (!props.isLoading && newNoteMessage.length > 0) {
      setNewNoteMessage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isLoading])

  return (
    <div>
      <h5 className="fw-bold">Notes</h5>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>New note:</Form.Label>
        <Form.Control
          as="textarea" rows={3}
          value={newNoteMessage}
          onChange={event => setNewNoteMessage(event.target.value)}
        />
      </Form.Group>
      <LoadingButton
        className="btn btn-secondary"
        label="Add note"
        loading={props.isLoading}
        disabled={newNoteMessage.length < 1}
        onClick={() => {
          props.onAddContactNote(newNoteMessage)
        }}
      />
      <div className="py-3">
        <p className="fw-bold m-0">Previous notes:</p>
        {!props.contactNotes || props.contactNotes.length < 1 ?
          <p className="text-muted">No notes yet.</p>
          : null}
        {props.contactNotes?.map((note, index) => {
          return <NoteCard
            key={index.toString()}
            note={note}
          />
        })}

      </div>
    </div>
  );
};

export default Notes;

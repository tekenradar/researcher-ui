'use client';

import LoadingButton from '@/components/LoadingButton';
import { makeid } from '@/utils/makeid';
import { getUnixTime } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface NewNoteProps {
  params: {
    substudyID: string;
    contactID: string;
  };
}

const NewNote: React.FC<NewNoteProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [newNoteMessage, setNewNoteMessage] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && newNoteMessage.length > 0) {
      setNewNoteMessage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const addContactNote = async () => {
    if (newNoteMessage.length < 1) {
      return;
    }
    const newNote = {
      id: makeid(10),
      // author: is set on server automatically
      content: newNoteMessage,
      time: getUnixTime(new Date()),
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      const url = new URL(`/api/researcher-backend/v1/substudy/${props.params.substudyID}/participant-contacts/${props.params.contactID}/note`, process.env.NEXT_PUBLIC_API_URL);

      const response = await fetch(url.toString(),
        {
          method: 'POST',
          body: JSON.stringify(newNote),
        }
      );
      if (!response.ok) {
        const err = await response.json()
        console.log(err)
        throw new Error(err.error);
      }

      const data = await response.json();
      router.replace(`/substudies/${props.params.substudyID}/contact-viewer/${props.params.contactID}`);
    } catch (err: any) {
      console.error(err)
      setErrorMsg('Error adding note');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>New note:</Form.Label>
        <Form.Control
          as="textarea" rows={3}
          value={newNoteMessage}
          onChange={event => setNewNoteMessage(event.target.value)}
        />
      </Form.Group>
      {errorMsg.length > 0 && <div className="alert alert-danger" role="alert">
        {errorMsg}
      </div>
      }
      <LoadingButton
        className="btn btn-secondary"
        label="Add note"
        loading={isLoading}
        disabled={newNoteMessage.length < 1}
        onClick={() => {
          addContactNote();
        }}
      />
    </div>
  );
};

export default NewNote;

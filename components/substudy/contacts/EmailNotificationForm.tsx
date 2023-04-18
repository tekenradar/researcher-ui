'use client';

import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

interface EmailNotificationFormProps {
  substudyID: string;
}

const emailFormatRegexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const checkEmailFormat = (email: string): boolean => {
  return emailFormatRegexp.test(email);
}

const contactTopic = "contact";

const EmailNotificationForm: React.FC<EmailNotificationFormProps> = (props) => {
  const router = useRouter();

  const [newEmailSubscription, setNewEmailSubscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const onAddNewSub = async () => {
    setErrorMsg('')
    setIsLoading(true);
    try {
      const baseURL = `${window.location.protocol}//${window.location.host}`;
      const url = new URL(`/api/substudy/${props.substudyID}/notifications`, baseURL);

      const response = await fetch(url.toString(),
        {
          method: 'POST',
          body: JSON.stringify({
            email: newEmailSubscription,
            topic: contactTopic,
          }),
        }
      );
      if (!response.ok) {
        const err = await response.json()
        console.log(err)
        throw new Error(err.error);
      }

      const data = await response.json();

      router.refresh();
    } catch (err: any) {
      setErrorMsg('Error adding new email subscription');
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Form.Group className="mt-3">
      <Form.Label
        className="fw-bold"
      >Add a new email subscription</Form.Label>
      <InputGroup>
        <FormControl
          type="email"
          value={newEmailSubscription}
          onChange={(event) => {
            setNewEmailSubscription(event.target.value);
          }}
        ></FormControl>
        <LoadingButton
          type="button"
          label="Add"
          className={
            "btn btn-secondary"
          }
          onClick={() => {
            const confirmed = window.confirm(`You are about to add the email "${newEmailSubscription}" to the notification list. Do you want to proceed?`)
            if (confirmed) {
              onAddNewSub();
            }
          }}
          disabled={!checkEmailFormat(newEmailSubscription)}
          loading={isLoading}
        />
      </InputGroup>
      {errorMsg &&
        <Form.Text className="text-danger">
          {errorMsg}
        </Form.Text>
      }
    </Form.Group>
  );
};

export default EmailNotificationForm;

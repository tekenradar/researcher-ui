import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import LoadingButton from '../../LoadingButton';

interface EmailListEditorProps {
  emails: string[];
  onListChanged: (emails: string[]) => void;
}

const emailFormatRegexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const checkEmailFormat = (email: string): boolean => {
  return emailFormatRegexp.test(email);
}

const EmailListEditor: React.FC<EmailListEditorProps> = (props) => {
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    setNewEmail('');
  }, [props.emails]);

  const renderNotificationList = () => {
    if (props.emails.length < 1) {
      return (
        <ListGroup.Item className="text-muted">Add emails to this list to provide access for this sub-study.</ListGroup.Item>
      )
    }

    return props.emails.map(email => {
      return (
        <ListGroup.Item
          key={email}
          className="d-flex align-items-center"
        >
          <span className="flex-grow-1">{email}</span>
          <button className={clsx("btn text-secondary")}
            type='button'
            onClick={() => {
              const confirmed = window.confirm(`Do you want to remove the entry "${email}" from the notification list?`)
              if (confirmed) {
                props.onListChanged(props.emails.filter(e => e !== email));
              }
            }}
          >
            <FontAwesomeIcon
              className="fa-sm"
              icon={faTrashAlt}
            />
          </button>
        </ListGroup.Item>
      )
    })
  }


  return (
    <React.Fragment>
      <ListGroup>
        {renderNotificationList()}
      </ListGroup>

      <Form.Group className="mt-3">
        <Form.Label
          className="fw-bold"
        >Add a new entry</Form.Label>
        <InputGroup>
          <FormControl
            type="email"
            value={newEmail}
            onChange={(event) => {
              setNewEmail(event.target.value);
            }}
          ></FormControl>
          <LoadingButton
            type="button"
            label="Add"
            className={clsx(
              "btn btn-secondary",
            )}
            onClick={() => {
              if (props.emails.find(email => email === newEmail)) {
                alert(`"${newEmail}" is already in the list.`)
                return;
              }
              props.onListChanged([...props.emails, newEmail]);
            }}
            disabled={!checkEmailFormat(newEmail)}
          />
        </InputGroup>
      </Form.Group>
    </React.Fragment>
  );
};

export default EmailListEditor;

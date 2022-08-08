import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Form, FormControl, InputGroup, ListGroup, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import LoadingButton from '../../LoadingButton';

export interface NotificationSub {
  id: string;
  topic: string;
  email: string;
}

interface EmailNotificationsProps {
  isLoading: boolean;
  notificationSubs: NotificationSub[];
  onAddNewSub: (email: string) => void;
  onDeleteSub: (id: string) => void;
}



const emailFormatRegexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const checkEmailFormat = (email: string): boolean => {
  return emailFormatRegexp.test(email);
}

const EmailNotifications: React.FC<EmailNotificationsProps> = (props) => {
  const [newEmailSubscription, setNewEmailSubscription] = useState('');


  const renderNotificationList = () => {
    if (props.isLoading) {
      return <div className='py-2 text-center'>
        <Spinner className="mx-1" size="sm" animation="grow" />
        <Spinner className="mx-1" size="sm" animation="grow" />
        <Spinner className="mx-1" size="sm" animation="grow" />
      </div>
    }

    if (props.notificationSubs.length < 1) {
      return (
        <ListGroup.Item className="text-muted">Currently there are no subscriptions for this study.</ListGroup.Item>
      )
    }

    return props.notificationSubs.map(notification => {
      return (
        <ListGroup.Item
          key={notification.id}
          className="d-flex align-items-center"
        >
          <span className="flex-grow-1">{notification.email}</span>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove email from notification list</Tooltip>}>
            <button className={clsx("btn text-secondary")}
              onClick={() => {
                const confirmed = window.confirm(`Do you want to remove the entry "${notification.email}" from the notification list?`)
                if (confirmed) {
                  props.onDeleteSub(notification.id)
                }
              }}
            >
              <FontAwesomeIcon
                className="fa-sm"
                icon={faTrashAlt}
              />
            </button>
          </OverlayTrigger>
        </ListGroup.Item>
      )
    })
  }


  return (
    <div className="bg-white p-3 mt-3  shadow-sm">
      <h5 className="">
        Email Notifications
      </h5>
      <p>Recieve email notification, whenever a new entry is added to the above list.</p>
      <ListGroup>
        {renderNotificationList()}
      </ListGroup>

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
            className={clsx(
              "btn btn-secondary",
            )}
            onClick={() => {
              if (props.notificationSubs.find(n => n.email === newEmailSubscription)) {
                alert(`"${newEmailSubscription}" is already in the list.`)
                return;
              }
              const confirmed = window.confirm(`You are about to add the email "${newEmailSubscription}" to the notification list. Do you want to proceed?`)
              if (confirmed) {
                props.onAddNewSub(newEmailSubscription);
              }
            }}
            disabled={!checkEmailFormat(newEmailSubscription)}
            loading={props.isLoading}
          />
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default EmailNotifications;

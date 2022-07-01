import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { Form, FormControl, InputGroup, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LoadingButton from '../../LoadingButton';

interface EmailNotificationsProps {
}

const EmailNotifications: React.FC<EmailNotificationsProps> = (props) => {
  const notifications: Array<string> = [
    'test@email.nl',
    'test2@email.nl'
  ];

  const renderNotificationList = () => {
    if (notifications.length < 1) {
      return (
        <ListGroup.Item className="text-muted">Currently there are no subscriptions for this study.</ListGroup.Item>
      )
    }

    return notifications.map(notification => {
      return (
        <ListGroup.Item
          key={notification}
          className="d-flex align-items-center"
        >
          <span className="flex-grow-1">{notification}</span>
          <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove email from notification list</Tooltip>}>
            <button className={clsx("btn text-secondary")}>
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
          <FormControl type="email"></FormControl>
          <LoadingButton
            type="button"
            label="Add"
            className={clsx(
              "btn btn-secondary",
            )}
            loading={true}
          />
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default EmailNotifications;

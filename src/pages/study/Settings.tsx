import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { Form, FormControl, InputGroup, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import Credits from "../../components/Credits";
import LoadingButton from "../../components/LoadingButton";
import { useStudyColorClassnames } from "../../hooks/useStudyColorClassnames";


const Settings: React.FC = () => {
  const { btnClassName, color } = useStudyColorClassnames();

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
            <button className={clsx("btn", color)}>
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

  return <div className="w-100 p-3">
    <div className="bg-white p-3">
      <h2 className="">Study Settings</h2>

      <h5>
        Email Notifications
      </h5>
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
              "btn",
              btnClassName
            )}
            loading={true}

          />
        </InputGroup>
      </Form.Group>


    </div>
    <Credits />

  </div>
};

export default Settings;

'use client';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { ListGroup, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';

interface EmailNotificationItemProps {
  substudyID: string;
  notification: NotificationSub;
}

export interface NotificationSub {
  id: string;
  topic: string;
  email: string;
}


const EmailNotificationItem: React.FC<EmailNotificationItemProps> = ({ notification, substudyID }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const deleteSub = async () => {
    setIsLoading(true);
    try {
      const baseURL = `${window.location.protocol}//${window.location.host}`;
      const url = new URL(`/api/substudy/${substudyID}/notifications/${notification.id}`, baseURL);

      const response = await fetch(url.toString(),
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        const err = await response.json()
        console.log(err)
        throw new Error(err.error);
      }

      const data = await response.json();
      startTransition(() => {
        router.refresh();
      });
    } catch (err: any) {

      console.error(err)
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <ListGroup.Item
      key={notification.id}
      className="d-flex align-items-center"
    >
      <span className="flex-grow-1">{notification.email}</span>
      {(isPending || isLoading) && <div className='me-2'>
        <Spinner className="mx-1" size="sm" animation="grow" />
        <Spinner className="mx-1" size="sm" animation="grow" />
        <Spinner className="mx-1" size="sm" animation="grow" />
      </div>}
      <OverlayTrigger placement="bottom" overlay={<Tooltip>Remove email from notification list</Tooltip>}>
        <button className={"btn text-secondary"}
          disabled={isLoading || isPending}
          onClick={() => {
            const confirmed = window.confirm(`Do you want to remove the entry "${notification.email}" from the notification list?`)
            if (confirmed) {
              deleteSub();
            }
          }}
        >
          <FontAwesomeIcon
            className="fa-sm"
            height="1em"
            icon={faTrashAlt}
          />
        </button>
      </OverlayTrigger>
    </ListGroup.Item>
  );
};

export default EmailNotificationItem;

import React from 'react';
import EmailNotificationItem, { NotificationSub } from './EmailNotificationItem';
import EmailNotificationForm from './EmailNotificationForm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getTokenHeader } from '@/utils/backend/utils';
import { getEmailNotifications } from './utils';

interface EmailNotificationManagerProps {
  substudyID: string;
}

export default async function EmailNotificationManager(props: EmailNotificationManagerProps) {
  const data = await getEmailNotifications(props.substudyID);
  const notificationSubs = data.emailNotifications;

  const renderNotificationList = () => {
    if (!notificationSubs || notificationSubs.length < 1) {
      return (
        <li className="list-group-item text-muted">Currently there are no subscriptions for this study.</li>
      )
    }

    return notificationSubs.map((notification: NotificationSub) => {
      return (
        <EmailNotificationItem
          key={notification.id}
          notification={notification}
          substudyID={props.substudyID}
        />
      )
    })
  }

  return (

    <div className="table-responsive flex-grow-1 p-3 bg-white rounded shadow-sm mt-3">
      <h5 className="">Email Notifications</h5>
      <p>Recieve email notification, when a new entry is added to the above list.</p>
      <ul className='list-group'>
        {renderNotificationList()}
      </ul>
      <EmailNotificationForm
        substudyID={props.substudyID}
      />
    </div>
  );
};

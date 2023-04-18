import React from 'react';

interface EmailNotificationManagerProps {
  substudyID: string;
}

export default async function EmailNotificationManager(props: EmailNotificationManagerProps) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return (

    <div className="table-responsive flex-grow-1 p-3 bg-white rounded shadow-sm mt-3">
      <h5 className="">Email Notifications</h5>
      <p>TODO: EmailNotificationManager</p>
    </div>
  );
};

import Credits from '@/components/Credits';
import LoadingCard from '@/components/LoadingCard';
import ContactTable from '@/components/substudy/contacts/ContactOverviewCard';
import EmailNotificationManager from '@/components/substudy/contacts/EmailNotificationManager';
import Link from 'next/link';
import { Suspense } from 'react';

interface PageProps {
  params: {
    substudyID: string
  },
}

export default function Page(props: PageProps) {
  return <div className='container-fluid py-3'>
    <Suspense fallback={<LoadingCard height='250px' />}>
      {/* @ts-expect-error Async Server Component */}
      <ContactTable substudyID={props.params.substudyID} />
    </Suspense>

    <Suspense fallback={<LoadingCard height='250px' className='mt-3' />}>
      {/* @ts-expect-error Async Server Component */}
      <EmailNotificationManager substudyID={props.params.substudyID} />
    </Suspense>
    <Credits />
  </div>


};

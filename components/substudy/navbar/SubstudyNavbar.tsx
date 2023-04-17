import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { getSubstudyBgColor, getSubstudyBorderColor, getSubstudyTextColor } from '../utils';
import NavLink from './NavLink';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getSubstudy } from '@/app/substudies/[substudyID]/utils';

interface SubstudyNavbarProps {
  params: {
    substudyID: string
  }
}

export default async function SubstudyNavbar(props: SubstudyNavbarProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.error || session.accessToken === undefined) {
    redirect('/')
  }

  const substudy = await getSubstudy(props.params.substudyID, session.accessToken);

  return (
    <nav className={clsx("border-bottom container-fluid",
      'bg-opacity-10',
      getSubstudyBgColor(substudy.studyColor),
      getSubstudyBorderColor(substudy.studyColor),
    )}>
      <div className={clsx(
        'mb-2 pt-2 h5 fw-light',
        getSubstudyTextColor(substudy.studyColor))}>
        <span>Substudy:</span>
        <span className={clsx(
          "ms-2 fw-bold",
        )}
          style={{ letterSpacing: '2px' }}
        >{substudy.name}</span>
      </div>
      <div className="d-flex">
        <NavLink
          href={`/substudies/${substudy.key}/exporter`}
          color={substudy.studyColor}
          label="Data exporter"
        />

        {substudy.features.contacts &&
          <NavLink
            href={`/substudies/${substudy.key}/contacts`}
            color={substudy.studyColor}
            label="Contacts"
          />
        }
        <div className="flex-grow-1">
        </div>
        <Link
          className={clsx(
            getSubstudyTextColor(substudy.studyColor),
            "p-2 hover-underline fw-bold"
          )}
          href='/substudies/selector'
        >Exit substudy</Link>
      </div>
    </nav>
  );
};


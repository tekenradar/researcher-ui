import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { getSubstudyBgColor, getSubstudyBorderColor, getSubstudyTextColor } from '../utils';
import NavLink from './NavLink';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getSubstudy } from '@/app/substudies/[substudyID]/utils';
import Container from '@/components/Container';
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";

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
    <nav className={clsx(
      "border-bottom",
      "border-1",
      // 'shadow-sm',
      'bg-opacity-10',
      getSubstudyBgColor(substudy.studyColor),
      getSubstudyBorderColor(substudy.studyColor),
    )}>
      <div className={clsx(
        "bg-opacity-10 mb-0",
        getSubstudyBgColor(substudy.studyColor),
      )}>
        <Container>
          <div className={clsx(
            'pt-2 h5 fw-light mb-0 py-2',
            getSubstudyTextColor(substudy.studyColor))}>
            <span>Substudy:</span>
            <span className={clsx(
              "ms-2 fw-bold",
            )}
              style={{ letterSpacing: '2px' }}
            >{substudy.name}</span>
          </div>
        </Container>
      </div>
      <div className={clsx(
        //"bg-opacity-10",
        //getSubstudyBgColor(substudy.studyColor),
      )}>
        <Container className='d-flex'>
          <NavLink
            href={`/substudies/${substudy.key}/exporter`}
            color={substudy.studyColor}
            label="Data exporter"
            icon={faFileExport}
          />

          {substudy.features.contacts &&
            <NavLink
              href={`/substudies/${substudy.key}/contacts`}
              color={substudy.studyColor}
              label="Contacts"
              icon={faAddressCard}
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
        </Container>
      </div>

    </nav>
  );
};


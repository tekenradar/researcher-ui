import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { getSubstudyBgColor, getSubstudyBorderColor, getSubstudyTextColor } from '../utils';
import NavLink from './NavLink';

interface SubstudyNavbarProps {
  substudy: any;
}


const SubstudyNavbar: React.FC<SubstudyNavbarProps> = ({ substudy }) => {
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

export default SubstudyNavbar;

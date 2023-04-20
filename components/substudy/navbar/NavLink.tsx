'use client';

import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';
import { getSubstudyTextColor } from '../utils';
import { usePathname } from 'next/navigation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NavLinkProps {
  href: string;
  color: string;
  label: string;
  icon?: IconProp;
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        getSubstudyTextColor(props.color),
        "hover-underline py-2 px-3 fw-bold",
        {
          [`bg-opacity-10  bg-study-${props.color}`]: pathname === props.href
        }
      )}
      href={props.href}
    >
      {props.icon &&
        <FontAwesomeIcon
          className="me-2"
          icon={props.icon}
          height={16}
        />}
      {props.label}
    </Link>
  );
};

export default NavLink;

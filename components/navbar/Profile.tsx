'use client'

import { faArrowRightFromBracket, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';


interface ProfileProps {
  email: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <>

      <div className="d-flex align-items-center">
        <FontAwesomeIcon
          className="fa-lg me-2"
          width={24}
          icon={faCircleUser}
        />
        <span className="d-none d-md-block me-2">{props.email}</span>
      </div>

      <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
        <button className={clsx("btn")}
          onClick={() =>
            signOut({
              callbackUrl: '/',
            })
          }
        >
          <FontAwesomeIcon
            className="fa-lg me-2"
            width={24}
            icon={faArrowRightFromBracket}
          />
        </button>
      </OverlayTrigger>
    </>
  );
};

export default Profile;

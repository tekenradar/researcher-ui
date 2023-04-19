'use client';

import React from 'react';
import { ContactDetailsData } from '../contacts/types';
import Link from 'next/link';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faClose } from '@fortawesome/free-solid-svg-icons';
import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import { shortenParticipantID } from '@/utils/shortenParticipantID';
import { format, fromUnixTime } from 'date-fns';

interface ContactViewerProps {
  params: {
    substudyID: string;
    contactID: string;
  };
  contactDetails: ContactDetailsData;
}

const showValueOrDashIfMissing = (value?: string | number): string => {
  if (!value || value.toString().length < 1) {
    return '-'
  }
  return value.toString();
}

const ContactViewer: React.FC<ContactViewerProps> = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const router = useRouter();


  const deleteContact = async () => {
    setIsLoading(true);
    try {
      const url = new URL(`/api/researcher-backend/v1/substudy/${props.params.substudyID}/participant-contacts/${props.params.contactID}`, process.env.NEXT_PUBLIC_API_URL);

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
        router.replace(`/substudies/${props.params.substudyID}/contacts`);
      });
    } catch (err: any) {
      console.error(err)
      setErrorMsg('Error deleting contact');
    } finally {
      setIsLoading(false);
    }
  }

  const body = (
    <div className='mt-3'>
      <Form.Check
        type="switch"
        className="mb-2"
        id="permanentData"

        checked={props.contactDetails.keepContactData}
        label={props.contactDetails.keepContactData ? "Permanent entry" : "Non-Permanent entry"}
        onChange={(event) => {
          if (!props.contactDetails) { return }
          const checked = event.target.checked;
          if (window.confirm(
            checked ? 'Are you sure you are authorized to mark this entry as "permanent"?' :
              'Are you sure, you want to mark this entry as "non-permanent", so it will be auto-deleted after 12 weeks?'
          )) {
            // props.onChangePermanentStatus(props.contactDetails, checked);
          }
        }}
      />
      {props.contactDetails.keepContactData ? null : <div className="alert alert-warning">
        <p className="fs-small mb-0">
          Unless explicitly marked here, contact infos will be deleted after 12 weeks automatically.
        </p>
      </div>}

      <h5 className="fw-bold ">General</h5>
      <div>
        <label className="fs-small fw-bold">Session ID</label>
        <p>{props.contactDetails.sessionID}</p>
      </div>

      <div className="">
        <label className="fs-small fw-bold">Participant ID</label>
        <div className="d-flex align-items-center">
          <p className="m-0">{shortenParticipantID(props.contactDetails.participantID, 8)}</p>
          <OverlayTrigger placement="left" overlay={<Tooltip>Copy participant ID</Tooltip>}>
            <button className="btn"
              onClick={() => {
                if (props.contactDetails?.participantID) {
                  navigator.clipboard.writeText(props.contactDetails?.participantID)
                }
              }}
            >
              <FontAwesomeIcon icon={faClone} height={16} />
            </button>
          </OverlayTrigger>
        </div>
      </div>

      <div className="d-flex flex-wrap justify-content-between">
        <div className="mt-2 me-3">
          <label className="fs-small fw-bold">Age from PDiff</label>
          <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.general.age)}</p>
        </div>
        <div className="mt-2 me-3">
          <label className="fs-small fw-bold">Gender from PDiff</label>
          <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.general.gender)}</p>
        </div>
        <div className="mt-2 me-3">
          <label className="fs-small fw-bold">Interested in other studies</label>
          <p className="mb-0">{props.contactDetails.general.otherStudies ? 'yes' : 'no'}</p>
        </div>

      </div>
      <hr></hr>

      <h5 className="fw-bold">Contact Infos</h5>
      <div className="mb-2">
        <label className="fs-small fw-bold">Email</label>
        <a className="mb-0 d-block" href={"mailto:" + showValueOrDashIfMissing(props.contactDetails.contactData?.email)}>{showValueOrDashIfMissing(props.contactDetails.contactData?.email)}</a>
      </div>

      <div className="mb-2">
        <label className="fs-small fw-bold">Phone</label>
        <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.phone)}</p>
      </div>

      <div className="d-flex  flex-wrap justify-content-start">
        <div className="mb-2 me-2">
          <label className="fs-small fw-bold">First name</label>
          <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.firstName)}</p>
        </div>

        <div className="mb-2">
          <label className="fs-small fw-bold">Last name</label>
          <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.lastName)}</p>
        </div>
      </div>

      <div className="mb-2">
        <label className="fs-small fw-bold">Birthday</label>
        {props.contactDetails.contactData?.birthday ?
          <p className="mb-0">{format(fromUnixTime(props.contactDetails.contactData?.birthday), 'dd-MM-yyyy')}</p>
          : <p>-</p>}
      </div>

      {props.contactDetails.contactData?.gp ?
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">GP</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.office)}</p>
          </div>

          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">Doctor</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.name)}</p>
          </div>

          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">Street</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.street)}</p>
          </div>
          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">Nr.</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.nr)}</p>
          </div>
          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">Postcode</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.postcode)}</p>
          </div>
          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">City</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.address.city)}</p>
          </div>
          <div className="mb-2 me-2">
            <label className="fs-small fw-bold">GP Phone</label>
            <p className="mb-0">{showValueOrDashIfMissing(props.contactDetails.contactData?.gp.phone)}</p>
          </div>
        </div>
        : <p className="text-muted">No GP data</p>}




      <hr></hr>

      <hr></hr>
      <LoadingButton
        className="btn btn-outline-danger"
        label="Delete Entry"
        loading={isLoading || isPending}
        disabled={isLoading || isPending}
        onClick={() => {
          if (!props.contactDetails) {
            return;
          }
          if (window.confirm('Do you want to delete this entry (inlcuding all notes and contact infos) permanently?')) {
            deleteContact();
          }
        }}
      />
      {errorMsg && <div className="alert alert-danger mt-3">{errorMsg}</div>}
    </div>
  );


  return (
    <div>
      <div className='d-flex'>
        <h2 className="m-0 flex-grow-1">Session Details</h2>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Close Details</Tooltip>}
        >
          <Link
            className='btn btn-outline-secondary'
            href={`/substudies/${props.params.substudyID}/contacts`}>
            <FontAwesomeIcon className="fa-xl pl-5" height={24} icon={faClose} />
          </Link>

        </OverlayTrigger>
      </div>

      {body}
    </div>
  );
};

export default ContactViewer;

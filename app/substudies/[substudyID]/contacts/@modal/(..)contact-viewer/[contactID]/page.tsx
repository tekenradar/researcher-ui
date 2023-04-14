'use client';

import { Modal } from "react-bootstrap";

interface PageProps {
}

export default function Page(props: PageProps) {
  return <Modal show={true}
    onHide={() => {
      window.history.back();
    }}
  >

    <h1>contact viewer interceptor</h1>
  </Modal>
};

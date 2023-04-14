import Link from 'next/link';

interface PageProps {
}

export default function Page(props: PageProps) {
  return <div>
    <h1>Contacts</h1>
    <Link href="/substudies/tekenradar/contact-viewer/1">
      Open contact viewer
    </Link>
  </div>


};

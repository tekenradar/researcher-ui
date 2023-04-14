

interface PageProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function Layout(props: PageProps) {
  console.log(props.modal)
  return <div>
    {props.children}
    {props.modal}
  </div>


};

import SubstudyNavbar from "@/components/substudy/navbar/SubstudyNavbar";
import { Suspense } from "react";


interface LayoutProps {
  params: {
    substudyID: string
  },
  children: React.ReactNode
}


export default async function Layout(props: LayoutProps) {
  return <div className="">
    <Suspense fallback={<div
      className="d-flex justify-content-center align-items-center bg-white border-bottom"
      style={{ height: 81 }}>
      <p>Loading {props.params.substudyID}...</p>
    </div>}>
      {/* @ts-expect-error Async Server Component */}
      <SubstudyNavbar
        params={props.params}
      />
    </Suspense>
    {props.children}
  </div>
};

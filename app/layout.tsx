import "@/styles/index.css";
import "@/styles/AppTheme.scss";

export const generateMetadata = () => {
  return {
    title: "Tekenradar - Researcher UI",
    description: "Tool to manage substudies and participants",
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

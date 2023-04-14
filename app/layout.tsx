import "@/styles/index.css";
import "@/styles/AppTheme.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

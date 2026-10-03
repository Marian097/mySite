import Topbar from "@/app/ui/dashboard/(components)/topbar"
import Sidebar from "@/app/ui/dashboard/(components)/sidebar"


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Topbar />
        <Sidebar />
        {children}
    </div>
  )
}

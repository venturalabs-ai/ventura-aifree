import { Nav } from "@/components/Nav";
import { AuthGate } from "@/components/AuthGate";
import { AdminDashboard } from "@/components/AdminDashboard";
export default function AdminPage(){return <><Nav/><AuthGate><main className="container section"><span className="badge">Dashboard local</span><h2>Leads e sinais de interesse.</h2><AdminDashboard/></main></AuthGate></>}

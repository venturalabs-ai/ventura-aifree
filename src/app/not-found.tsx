import Link from "next/link";
import { pathFor } from "@/lib/constants";
export default function NotFound(){return <main className="container section"><h2>Página não encontrada.</h2><Link className="button" href={pathFor("/")}>Voltar ao início</Link></main>}

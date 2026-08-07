import Link from "next/link";
import { Nav } from "@/components/Nav";
import { pathFor } from "@/lib/constants";

export default function Home(){
 return <><Nav/><main className="container">
   <section className="hero"><div><span className="badge">Mapa de IA • acesso às plataformas oficiais</span><h1>Encontre a IA certa sem perder horas comparando ferramentas.</h1><p>Explore uma seleção objetiva de assistentes, pesquisa, programação e criação. Cadastre-se, abra o mapa e vá direto para a ferramenta oficial que combina com seu objetivo.</p><div className="actions"><Link className="button" href={pathFor("/cadastro/")}>Começar grátis</Link><Link className="button secondary" href={pathFor("/mapa/")}>Ver mapa</Link></div></div></section>
   <section className="section"><h2>Menos busca. Mais execução.</h2><div className="grid"><div className="card"><h3>Descubra</h3><p>Entenda rapidamente o foco de cada ferramenta.</p></div><div className="card"><h3>Compare</h3><p>Veja categoria, empresa e proposta de valor.</p></div><div className="card"><h3>Use</h3><p>Acesse a página oficial e continue o trabalho na fonte.</p></div></div></section>
 </main><footer className="footer container">Ventura Labs AI · seleção independente. Marcas pertencem aos respectivos proprietários.</footer></>
}

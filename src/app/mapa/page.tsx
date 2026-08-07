import { Nav } from "@/components/Nav";
import { AuthGate } from "@/components/AuthGate";
import { AICard } from "@/components/AICard";
import { aiTools } from "@/data/ais";
export default function MapaPage(){return <><Nav/><AuthGate><main className="container section"><span className="badge">10 ferramentas</span><h2>Escolha pelo que você quer realizar.</h2><p className="muted">Ao clicar, seu interesse é registrado localmente e você é levado ao site oficial.</p><div className="grid">{aiTools.map((tool)=><AICard key={tool.id} tool={tool}/>)}</div></main></AuthGate></>}

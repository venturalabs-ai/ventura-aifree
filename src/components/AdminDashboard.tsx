"use client";
import { useMemo,useState } from "react";
import { useLeadsStore } from "@/store/leads";

export function AdminDashboard(){
 const leads=useLeadsStore((s)=>s.leads); const clear=useLeadsStore((s)=>s.clear); const [filter,setFilter]=useState("all");
 const uniqueUsers=new Set(leads.map((l)=>l.userEmail)).size;
 const counts=useMemo(()=>{const m=new Map<string,number>();leads.forEach((l)=>m.set(l.aiName,(m.get(l.aiName)??0)+1));return [...m.entries()].sort((a,b)=>b[1]-a[1])},[leads]);
 const max=Math.max(1,...counts.map(([,n])=>n)); const filtered=filter==="all"?leads:leads.filter((l)=>l.aiName===filter);
 function exportCsv(){const rows=[["data","nome","email","ia","empresa","source"],...filtered.map((l)=>[l.timestamp,l.userName,l.userEmail,l.aiName,l.aiCompany,l.source])];const csv=rows.map((r)=>r.map((v)=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="ventura-aifree-leads.csv";a.click();URL.revokeObjectURL(url)}
 return <>
   <div className="notice">Este painel mostra apenas os leads deste navegador. Para visão global, conecte um backend.</div>
   <div className="grid"><div className="card"><div className="muted">Total de leads locais</div><div className="stat">{leads.length}</div></div><div className="card"><div className="muted">Usuários únicos locais</div><div className="stat">{uniqueUsers}</div></div></div>
   <section className="section"><h2>Interesse por IA</h2><div className="card">{counts.length===0?<p className="muted">Nenhum lead.</p>:counts.map(([name,count])=><div key={name} style={{marginBottom:16}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><strong>{name}</strong><span className="muted">{count}</span></div><div className="barTrack"><div className="barFill" style={{width:`${count/max*100}%`}} /></div></div>)}</div></section>
   <section className="section">
     <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap",marginBottom:14}}>
       <select className="input" style={{width:"auto"}} value={filter} onChange={(e)=>setFilter(e.target.value)}><option value="all">Todas as IAs</option>{[...new Set(leads.map((l)=>l.aiName))].sort().map((name)=><option key={name}>{name}</option>)}</select>
       <div className="actions" style={{marginTop:0}}><button className="button secondary" onClick={exportCsv}>Exportar CSV</button><button className="button danger" onClick={()=>confirm("Apagar todos os leads locais?")&&clear()}>Limpar</button></div>
     </div>
     <div className="tableWrap"><table><thead><tr><th>Data</th><th>Nome</th><th>Email</th><th>IA</th><th>Empresa</th><th>Status</th></tr></thead><tbody>{filtered.map((l)=><tr key={l.id}><td>{new Date(l.timestamp).toLocaleString("pt-BR")}</td><td>{l.userName}</td><td>{l.userEmail}</td><td>{l.aiName}</td><td>{l.aiCompany}</td><td>Interessado</td></tr>)}</tbody></table></div>
   </section>
 </>
}

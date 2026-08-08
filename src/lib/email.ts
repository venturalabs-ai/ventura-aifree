"use client";
import emailjs from "@emailjs/browser";
import type { Lead, User } from "@/lib/types";

const cfg={
 serviceId:process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
 welcomeTemplateId:process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID,
 leadTemplateId:process.env.NEXT_PUBLIC_EMAILJS_LEAD_TEMPLATE_ID,
 publicKey:process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
};
const ready=()=>Boolean(cfg.serviceId&&cfg.publicKey);

export async function sendWelcomeEmail(user:User){
 if(!ready()||!cfg.welcomeTemplateId){console.info("[EmailJS disabled] welcome",user);return;}
 await emailjs.send(cfg.serviceId!,cfg.welcomeTemplateId!,{
   to_name:user.name,to_email:user.email,map_url:`${window.location.origin}/ventura-aifree/mapa/`
 },{publicKey:cfg.publicKey!});
}

export async function sendLeadNotification(lead:Lead){
 if(!ready()||!cfg.leadTemplateId){console.info("[EmailJS disabled] lead",lead);return;}
 await emailjs.send(cfg.serviceId!,cfg.leadTemplateId!,{
   user_name:lead.userName,user_email:lead.userEmail,ai_name:lead.aiName,
   ai_company:lead.aiCompany,timestamp:lead.timestamp
 },{publicKey:cfg.publicKey!});
}

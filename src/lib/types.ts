export type User = { id:string; name:string; email:string; createdAt:string };
export type Lead = { id:string; userEmail:string; userName:string; aiId:string; aiName:string; aiCompany:string; timestamp:string; source:"ventura-aifree" };
export type AITool = { id:string; name:string; company:string; category:string; description:string; url:string };

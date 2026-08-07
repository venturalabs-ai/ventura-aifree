export interface SessionUser {
  name: string;
  email: string;
  createdAt: string;
}

export interface AITool {
  id: string;
  name: string;
  company: string;
  category: string;
  benefit: string;
  url: string;
}

export interface LeadInteraction {
  id: string;
  userName: string;
  email: string;
  aiId: string;
  aiName: string;
  company: string;
  timestamp: string;
  source: "ventura-aifree";
}

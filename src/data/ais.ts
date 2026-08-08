import type { AITool } from "@/lib/types";

export const aiTools: AITool[] = [
  { id:"chatgpt", name:"ChatGPT", company:"OpenAI", category:"Assistente", description:"Assistente geral para escrita, pesquisa, código e produtividade.", url:"https://chatgpt.com/" },
  { id:"claude", name:"Claude", company:"Anthropic", category:"Assistente", description:"Assistente focado em análise, escrita e documentos.", url:"https://claude.ai/" },
  { id:"gemini", name:"Gemini", company:"Google", category:"Assistente", description:"Assistente multimodal integrado ao ecossistema Google.", url:"https://gemini.google.com/" },
  { id:"copilot", name:"Microsoft Copilot", company:"Microsoft", category:"Produtividade", description:"Assistente para produtividade e ecossistema Microsoft.", url:"https://copilot.microsoft.com/" },
  { id:"perplexity", name:"Perplexity", company:"Perplexity AI", category:"Pesquisa", description:"Pesquisa assistida por IA com respostas baseadas em fontes.", url:"https://www.perplexity.ai/" },
  { id:"grok", name:"Grok", company:"xAI", category:"Assistente", description:"Assistente de IA para conversação e exploração de informações.", url:"https://grok.com/" },
  { id:"notebooklm", name:"NotebookLM", company:"Google", category:"Pesquisa", description:"Ferramenta para trabalhar sobre suas próprias fontes e documentos.", url:"https://notebooklm.google.com/" },
  { id:"canva", name:"Canva AI", company:"Canva", category:"Design", description:"Ferramentas de IA integradas a fluxos de design e conteúdo.", url:"https://www.canva.com/ai-image-generator/" },
  { id:"github-copilot", name:"GitHub Copilot", company:"GitHub", category:"Código", description:"Assistência de programação integrada ao fluxo de desenvolvimento.", url:"https://github.com/features/copilot" },
  { id:"huggingface", name:"Hugging Face", company:"Hugging Face", category:"Modelos", description:"Hub de modelos, datasets e aplicações de machine learning.", url:"https://huggingface.co/" }
];

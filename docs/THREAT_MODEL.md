# Threat Model — ventura-aifree

| Surface | Threat | Mitigation |
|---------|--------|------------|
| Registration / leads | spam, PII abuse | validation; rate limit roadmap |
| EmailJS keys | client exposure | use public key only; restrict domain in EmailJS dashboard |
| AI tool links | phishing via curated list | review entries; HTTPS only |
| Auth/session | session fixation | protected routes; harden cookies when auth lands |

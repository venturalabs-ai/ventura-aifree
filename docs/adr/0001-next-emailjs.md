# ADR 0001 — Next.js + EmailJS for leads

## Status
Accepted

## Decision
Use Next.js for UI and EmailJS browser SDK for lead capture without a custom mail backend in v1.

## Consequences
(+) Fast launch
(-) Public EmailJS key must be domain-restricted; no server-side secret in client

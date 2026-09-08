# Cloudflare Tunnel de produção

## Objetivo

Publicar a aplicação de produção nos domínios `rhcoelhodiniz.com.br` e
`api.rhcoelhodiniz.com.br` sem expor as portas dos containers no servidor.

## Arquitetura aprovada

Um único Tunnel gerenciado pela Cloudflare roda como serviço do
`docker-compose.prod.yml`. Seus Public Hostnames encaminham:

- `rhcoelhodiniz.com.br` para `web:80`.
- `api.rhcoelhodiniz.com.br` para `api:5011`.

O token é injetado por `CLOUDFLARE_TUNNEL_TOKEN` no `.env.production` do
servidor e não é armazenado na configuração versionada.

## Configuração da aplicação

O frontend usa `https://api.rhcoelhodiniz.com.br` como base da API e a API
aceita apenas `https://rhcoelhodiniz.com.br` como origem de produção. Os
serviços `api` e `web` usam somente a rede interna do Compose; apenas o
`cloudflared` acessa a rede externa.

## Operação e validação

A criação do Tunnel, dos Public Hostnames e do DNS é feita no dashboard da
Cloudflare. O procedimento de deploy, SSL/TLS e testes está em
`docs/cloudflare-tunnel-production.md`.

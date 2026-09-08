# Cloudflare Tunnel em produção

O compose de produção usa um Tunnel gerenciado pela Cloudflare para publicar os
dois serviços sem expor portas do Docker no host:

- `rhcoelhodiniz.com.br` -> `http://web:80`
- `api.rhcoelhodiniz.com.br` -> `http://api:5011`

O token não deve ser commitado. Ele deve existir apenas no arquivo
`.env.production` do servidor.

## 1. Criar o Tunnel

No dashboard da Cloudflare:

1. Selecione a conta e o domínio `rhcoelhodiniz.com.br`.
2. Acesse **Networks > Tunnels**.
3. Clique em **Create a tunnel**, escolha **Cloudflared** e dê um nome, por exemplo `admissaodigital-prod`.
4. Na etapa de instalação, copie o token exibido para o servidor. Não use o comando de instalação do dashboard diretamente, pois o serviço será executado pelo Docker Compose.

No servidor, preencha o arquivo `.env.production`:

```dotenv
CLOUDFLARE_TUNNEL_TOKEN=token-copiado-do-dashboard
```

Proteja o arquivo:

```bash
chmod 600 .env.production
```

## 2. Configurar os Public Hostnames

Na aba **Public Hostnames** do Tunnel, adicione duas entradas.

### Aplicação web

- **Subdomain:** vazio
- **Domain:** `rhcoelhodiniz.com.br`
- **Type:** `HTTP`
- **URL:** `web:80`

### API

- **Subdomain:** `api`
- **Domain:** `rhcoelhodiniz.com.br`
- **Type:** `HTTP`
- **URL:** `api:5011`

Salve as duas entradas. O Cloudflare cria os registros DNS do Tunnel; não crie
registros `A` ou `AAAA` apontando para o servidor.

## 3. SSL/TLS

Em **SSL/TLS > Overview**, use **Full (strict)** quando possível. Como o
Tunnel conecta diretamente aos containers por HTTP, o certificado público é
terminado na Cloudflare e o tráfego Cloudflare -> Tunnel permanece dentro da
conexão autenticada do Tunnel.

Ative **Always Use HTTPS** depois de confirmar que os dois hostnames estão
respondendo.

## 4. Subir a aplicação

No diretório do projeto no servidor:

```bash
docker compose --env-file .env.production -f docker-compose.prod.yml up --build -d
docker compose --env-file .env.production -f docker-compose.prod.yml ps
docker compose --env-file .env.production -f docker-compose.prod.yml logs -f cloudflared
```

O serviço `api` não publica porta no host. O serviço `web` também não publica
porta; ambos ficam acessíveis ao Tunnel pela rede interna do Compose.

## 5. Verificar

```bash
curl -I https://rhcoelhodiniz.com.br
curl -i https://api.rhcoelhodiniz.com.br/
```

A API responde atualmente na rota `/`; se ela for substituída por um endpoint
de healthcheck, prefira validar esse endpoint. No dashboard, o Tunnel deve
aparecer como **Healthy** e os dois Public Hostnames devem estar ativos.

## Segurança operacional

- Não publique as portas `5011` ou `8081` no firewall do servidor.
- Não coloque o token no Git, em logs ou em mensagens de suporte.
- Se o token for exposto, revogue e gere outro no dashboard.
- As credenciais atualmente presentes em arquivos de ambiente devem ser
  rotacionadas antes da entrada em produção.

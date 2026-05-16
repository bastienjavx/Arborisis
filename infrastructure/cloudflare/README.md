# Cloudflare Arborisis

## Workers

Workers présents :

- `workers/r2-proxy` : accès R2 signé.
- `workers/audio-analysis-orchestrator` : consommation de queue R2 et répartition vers analyzers VPS.
- `workers/audio-analyzer-container` : variante Cloudflare Containers pour l'analyse audio.

Déploiement :

```bash
cd infrastructure/cloudflare
./deploy-workers.sh
```

Secrets à poser avec `wrangler secret put` selon le worker :

```bash
cd workers/r2-proxy
wrangler secret put SIGNING_KEY

cd ../audio-analysis-orchestrator
wrangler secret put ANALYZER_SECRET
wrangler secret put ANALYZER_URLS
wrangler secret put LARAVEL_API_SECRET
```

`ANALYZER_URLS` doit pointer vers les endpoints HTTPS des VPS analyzer, séparés par virgule.

## DNS et cache

- `arborisis.com` et `www.arborisis.com` : proxied vers le VPS web ou vers Cloudflare Tunnel.
- `storage.arborisis.com` : proxied vers le worker R2 si utilisé.
- Cache rule : `arborisis.com/build/*` avec TTL long.
- Bypass cache : routes authentifiées, API, Stripe webhooks, Discord callbacks.

## Sécurité

- SSL/TLS `Full (strict)`.
- WAF managed rules actif.
- Rate limiting sur auth/API/webhooks.
- Ne jamais mettre les clés Stripe, R2, S3 ou Discord dans les vars publiques.

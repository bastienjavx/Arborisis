#!/usr/bin/env node
/**
 * Wiki.js Content Import Script
 * Uses native Node.js HTTP (no shell escaping issues)
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const WIKI_API_URL = process.env.WIKI_API_URL || 'http://localhost:3000/graphql';
const WIKI_API_TOKEN = process.env.WIKI_API_TOKEN || '';
const DRY_RUN = process.argv.includes('--dry-run');

const DOC_MAP = [
  { src: 'wiki-content/accueil/home.md', wikiPath: 'home', title: 'Accueil' },
  { src: 'README.md', wikiPath: 'accueil/readme', title: 'README Projet' },
  { src: 'AGENT.md', wikiPath: 'accueil/agent-reference', title: 'Reference Agent (AGENT.md)' },
  { src: 'wiki-content/utilisateur/guide-upload-audio.md', wikiPath: 'utilisateur/guide-upload-audio', title: "Guide d'Upload Audio" },
  { src: 'wiki-content/utilisateur/guide-echo.md', wikiPath: 'utilisateur/guide-echo', title: 'Guide ECHO' },
  { src: 'wiki-content/utilisateur/guide-gamification.md', wikiPath: 'utilisateur/guide-gamification', title: 'Guide Gamification' },
  { src: 'wiki-content/utilisateur/guide-radio.md', wikiPath: 'utilisateur/guide-radio', title: 'Guide Radio' },
  { src: 'wiki-content/utilisateur/guide-chat-social.md', wikiPath: 'utilisateur/guide-chat-social', title: 'Guide Chat & Social' },
  { src: 'ARCHITECTURE.md', wikiPath: 'developpeur/architecture', title: 'Architecture Laravel' },
  { src: 'CLAUDE.md', wikiPath: 'developpeur/claude-guide', title: 'Guide Claude Code' },
  { src: 'CONTRIBUTING.md', wikiPath: 'developpeur/contributing', title: 'Guide de Contribution' },
  { src: 'AGENTS.md', wikiPath: 'developpeur/conventions-agents', title: 'Conventions Agents' },
  { src: 'wiki-content/developpeur/guide-onboarding.md', wikiPath: 'developpeur/onboarding', title: 'Onboarding Nouveau Developpeur' },
  { src: 'wiki-content/developpeur/sso-wiki-js.md', wikiPath: 'developpeur/sso-wiki-js', title: 'SSO OAuth2 Laravel vers Wiki.js' },
  { src: 'docs/audio-analysis-pipeline.md', wikiPath: 'developpeur/pipeline-analyse-audio', title: 'Pipeline Analyse Audio' },
  { src: 'arborisis/docs/AUDIO_ANALYSIS.md', wikiPath: 'developpeur/pipeline-analyse-audio-legacy', title: 'Pipeline Analyse Audio (Legacy)' },
  { src: 'docs/migration-r2.md', wikiPath: 'developpeur/migration-r2', title: 'Migration Contabo S3 vers R2' },
  { src: 'docs/deploiement-gitlab-vps.md', wikiPath: 'developpeur/deploiement-gitlab-vps', title: 'Deploiement GitLab vers VPS' },
  { src: 'services/audio-analyzer/README.md', wikiPath: 'developpeur/services/audio-analyzer', title: 'Service Audio Analyzer (Python)' },
  { src: 'infrastructure/audio-analyzer-worker/README.md', wikiPath: 'developpeur/services/audio-analyzer-worker', title: 'Audio Analyzer Worker' },
  { src: 'workers/r2-proxy/README.md', wikiPath: 'developpeur/workers/r2-proxy', title: 'Worker R2 Proxy' },
  { src: 'workers/audio-analysis-orchestrator/README.md', wikiPath: 'developpeur/workers/audio-analysis-orchestrator', title: 'Worker Audio Analysis Orchestrator' },
  { src: 'workers/audio-analyzer-container/README.md', wikiPath: 'developpeur/workers/audio-analyzer-container', title: 'Worker Audio Analyzer Container' },
  { src: 'infrastructure/docker/README.md', wikiPath: 'developpeur/infrastructure/docker', title: 'Infrastructure Docker' },
  { src: 'infrastructure/radio/README.md', wikiPath: 'developpeur/infrastructure/radio', title: 'Infrastructure Radio' },
  { src: 'infrastructure/cloudflare/README.md', wikiPath: 'developpeur/infrastructure/cloudflare', title: 'Infrastructure Cloudflare' },
  { src: 'infrastructure/uptime-kuma/README.md', wikiPath: 'developpeur/infrastructure/uptime-kuma', title: 'Uptime Kuma' },
  { src: 'arborisis/python/README.md', wikiPath: 'developpeur/python-module', title: 'Module Python' },
  { src: 'wiki-content/admin/guide-admin-filament.md', wikiPath: 'admin/guide-admin-filament', title: 'Guide Admin Filament' },
  { src: 'design.md', wikiPath: 'reference/design-system', title: 'Design System' },
  { src: 'docs/audit-ui-ux-strategique-arborisis.md', wikiPath: 'reference/audit-ui-ux-strategique', title: 'Audit UI/UX Strategique' },
  { src: 'docs/audit-ux-frontend.md', wikiPath: 'reference/audit-ux-frontend', title: 'Audit UX Frontend' },
];

function readFileSafe(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, 'utf-8');
}

function apiRequest(query) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ query });
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3000,
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': `Bearer ${WIKI_API_TOKEN}`
      },
      timeout: 30000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data.substring(0, 500) }); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(postData);
    req.end();
  });
}

async function importPage(title, wikiPath, content, tags) {
  if (DRY_RUN) {
    console.log(`[DRY-RUN] Would import: "${title}" -> /${wikiPath}`);
    return 'dryrun';
  }

  if (!WIKI_API_TOKEN) {
    console.error('Error: WIKI_API_TOKEN is required.');
    process.exit(1);
  }

  const tagsStr = tags.map(t => `"${t}"`).join(', ');

  const query = `
    mutation {
      pages {
        create(
          content: ${JSON.stringify(content)}
          description: "Imported from Arborisis codebase"
          editor: "markdown"
          isPublished: true
          isPrivate: false
          locale: "fr"
          path: "${wikiPath}"
          tags: [${tagsStr}]
          title: ${JSON.stringify(title)}
        ) {
          responseResult {
            succeeded
            slug
            message
          }
          page {
            id
            path
            title
          }
        }
      }
    }
  `;

  try {
    const result = await apiRequest(query);
    if (result.errors) {
      console.error(`[ERROR] "${title}":`, result.errors[0].message);
      return 'error';
    }
    console.log(`[OK] "${title}" -> /${wikiPath}`);
    return 'ok';
  } catch (err) {
    console.error(`[FAIL] "${title}":`, err.message);
    return 'fail';
  }
}

async function main() {
  console.log(`Wiki.js Import Script`);
  console.log(`Mode: ${DRY_RUN ? 'DRY-RUN' : 'LIVE'}`);
  console.log(`API: ${WIKI_API_URL}`);
  console.log('');

  let imported = 0, skipped = 0, failed = 0;

  for (const doc of DOC_MAP) {
    const content = readFileSafe(doc.src);
    if (!content) {
      console.log(`[SKIP] File not found: ${doc.src}`);
      skipped++;
      continue;
    }

    const tags = doc.wikiPath.split('/').slice(0, -1).concat(['import-auto', 'arborisis']);
    const status = await importPage(doc.title, doc.wikiPath, content, tags);
    if (status === 'ok' || status === 'dryrun') imported++;
    else failed++;
  }

  console.log('');
  console.log(`Done. Imported: ${imported}, Skipped: ${skipped}, Failed: ${failed}`);
}

main().catch(console.error);

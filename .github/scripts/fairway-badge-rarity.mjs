// Weekly: how many Fairway golfers have each badge, published as rounded percentages only
// (never user counts) to fairway/badge-rarity.json, which the app reads.
// "Golfers" = installs of the App Store app (bundle tokyo.mksp.fairway) seen in PostHog in the
// last 90 days. Expo Go, Fairway β and the web version are left out: the web makes a new id on
// every visit, which would inflate the count. Percentages switch on ("ready")
// once there are MIN_GOLFERS of them; the week that first happens, the workflow opens an issue.
//
// Env: POSTHOG_PERSONAL_API_KEY (secret, needs query:read), POSTHOG_HOST (default
// https://us.posthog.com), POSTHOG_PROJECT_ID (default @current). Without the key it does nothing.
import { appendFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const MIN_GOLFERS = 100;
export const WINDOW_DAYS = 90;
export const APP_BUNDLE = "tokyo.mksp.fairway";
const OUT = new URL("../../fairway/badge-rarity.json", import.meta.url);

// counts: { badgeId: installs that earned it (and were active in the window) }.
export function buildRarity(golfers, counts, now) {
  const ready = golfers >= MIN_GOLFERS;
  const pct = {};
  if (ready) {
    for (const id of Object.keys(counts).sort()) {
      if (typeof id !== "string" || !/^[a-z0-9_]{1,40}$/.test(id)) continue;
      pct[id] = Math.min(100, Math.round((counts[id] / golfers) * 1000) / 10);
    }
  }
  return { version: 1, updatedAt: now.toISOString(), ready, pct };
}

// Same content apart from the date: nothing to publish.
export function sameContent(a, b) {
  return !!a && !!b && a.ready === b.ready && JSON.stringify(a.pct) === JSON.stringify(b.pct);
}

async function hogql(host, project, key, query) {
  const res = await fetch(`${host}/api/projects/${project}/query/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
  });
  if (!res.ok) throw new Error(`PostHog ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).results;
}

async function main() {
  const key = process.env.POSTHOG_PERSONAL_API_KEY;
  if (!key) {
    console.log("::notice::POSTHOG_PERSONAL_API_KEY is not set; nothing to do.");
    return;
  }
  const host = (process.env.POSTHOG_HOST || "https://us.posthog.com").replace(/\/$/, "");
  const project = process.env.POSTHOG_PROJECT_ID || "@current";
  const app = `properties.$app_namespace = '${APP_BUNDLE}'`;
  const recent = `timestamp > now() - INTERVAL ${WINDOW_DAYS} DAY AND ${app}`;
  const active = `SELECT DISTINCT distinct_id FROM events WHERE ${recent}`;
  const [[golfers]] = await hogql(host, project, key, `SELECT count(DISTINCT distinct_id) FROM events WHERE ${recent}`);
  const rows = await hogql(
    host, project, key,
    `SELECT properties.id, count(DISTINCT distinct_id) FROM events WHERE event = 'badge_earned' AND ${app} AND distinct_id IN (${active}) GROUP BY properties.id`,
  );
  const counts = Object.fromEntries(rows.filter(([id]) => id).map(([id, n]) => [String(id), Number(n)]));
  const next = buildRarity(Number(golfers), counts, new Date());
  const prev = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : null;
  // This repo is public, and so are its Actions logs: never print the number of golfers.
  console.log(`Ready: ${next.ready}; badges with a %: ${Object.keys(next.pct).length}`);
  if (sameContent(prev, next)) return console.log("No change.");
  writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
  if (next.ready && !prev?.ready && process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, "crossed=true\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

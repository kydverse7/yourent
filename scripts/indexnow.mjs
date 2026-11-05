/**
 * Envoie toutes les adresses du sitemap à IndexNow (Bing, Yandex, etc.).
 * À lancer après chaque publication : npm run indexnow
 * Aperçu sans envoi : npm run indexnow -- --dry-run
 *
 * La clé est aussi publiée dans public/<clé>.txt, à l'adresse keyLocation ci-dessous.
 */
const HOST = 'www.yourent.ma';
const KEY = '66546ba62062cd0f0de226e047d42a9c';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const dryRun = process.argv.includes('--dry-run');

const decodeXml = (value) =>
  value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");

const response = await fetch(SITEMAP_URL);
if (!response.ok) {
  console.error(`Sitemap illisible : ${SITEMAP_URL} a répondu ${response.status}`);
  process.exit(1);
}
const xml = await response.text();
const urlList = [...new Set([...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => decodeXml(match[1])))].filter(
  (url) => new URL(url).host === HOST,
);

if (urlList.length === 0) {
  console.error('Aucune adresse trouvée dans le sitemap : rien à envoyer.');
  process.exit(1);
}

console.log(`${urlList.length} adresse(s) :`);
for (const url of urlList) console.log(`  ${url}`);

if (dryRun) {
  console.log('\nMode --dry-run : rien n\'a été envoyé.');
  process.exit(0);
}

const result = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});
console.log(`\nIndexNow a répondu ${result.status} ${result.statusText}`);
if (!result.ok && result.status !== 202) {
  console.error(await result.text());
  process.exit(1);
}

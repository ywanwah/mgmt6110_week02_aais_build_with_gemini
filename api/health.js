export default async function handler(req, res) {
  const resourceId = 'M213751';
  const keyConfigured = Boolean(process.env.SINGSTAT_API_KEY);
  const started = Date.now();
  let upstreamStatus = null;
  let upstreamAnswered = false;

  try {
    const r = await fetch(
      `https://tablebuilder.singstat.gov.sg/api/table/tabledata/${resourceId}?limit=1`,
      { signal: AbortSignal.timeout(5000) }
    );
    upstreamStatus = r.status;
    upstreamAnswered = r.ok;
  } catch {
    // network error or timeout – leave upstreamAnswered false
  }

  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json({
    ok: upstreamAnswered,
    keyConfigured,
    upstreamAnswered,
    upstreamStatus,
    message: upstreamAnswered
      ? 'SingStat upstream answered successfully.'
      : 'SingStat upstream did not respond.',
    resourceId,
    baseYear: '2024',
    latencyMs: Date.now() - started,
    lastUpdated: new Date().toLocaleDateString('en-GB'),
  });
}

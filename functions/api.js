export async function onRequest(context) {
  const url = new URL(context.request.url);
  const type = url.searchParams.get('type') || 'fixtures';
  const date = url.searchParams.get('date') || new Date().toISOString().slice(0,10);
  const leagueId = url.searchParams.get('league') || '33973';
  const fixture = url.searchParams.get('fixture') || '';
  const headers = { 'x-rapidapi-key': context.env.HIGHLIGHTLY_API_KEY };
  let apiUrl = '';
  if (type === 'standings') apiUrl = `https://soccer.highlightly.net/standings?leagueId=${leagueId}`;
  else if (type === 'detail') apiUrl = `https://soccer.highlightly.net/matches/${fixture}`;
  else apiUrl = `https://soccer.highlightly.net/matches?date=${date}`;
  const res = await fetch(apiUrl, { headers });
  const data = await res.text();
  return new Response(data, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
}

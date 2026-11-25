export async function onRequest(context){
  const url = new URL(context.request.url);
  const type = url.searchParams.get('type') || 'fixtures';
  const date = url.searchParams.get('date') || new Date().toISOString().slice(0,10);
  const league = url.searchParams.get('league') || '';
  const fixture = url.searchParams.get('fixture') || '';
  const season = url.searchParams.get('season') || '2026';
  const KEY = context.env.HIGHLIGHTLY_API_KEY;
  const BASE = 'https://soccer.highlightly.net/v1';
  let apiUrl = '';
  if(type==='fixtures') apiUrl = `${BASE}/matches?date=${date}`;
  else if(type==='standings') apiUrl = `${BASE}/standings?leagueId=${league}&season=${season}`;
  else if(type==='detail') apiUrl = `${BASE}/matches/${fixture}`;
  try{
    const r = await fetch(apiUrl, { headers: { 'x-rapidapi-key': KEY, 'x-api-key': KEY } });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }catch(e){
    return new Response(JSON.stringify({error: e.message}), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

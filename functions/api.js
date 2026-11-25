export async function onRequest(context){
  const url = new URL(context.request.url);
  const type = url.searchParams.get('type') || 'fixtures';
  const date = url.searchParams.get('date') || new Date().toISOString().slice(0,10);
  const league = url.searchParams.get('league') || '';
  const fixture = url.searchParams.get('fixture') || '';
  const KEY = context.env.SPORTAPI_KEY;
  const BASE = 'https://sportapi.ai/api';
  let apiUrl = '';
  if(type==='fixtures') apiUrl = `${BASE}/fixtures/date/${date}`;
  else if(type==='standings') apiUrl = `${BASE}/standings/${league}`;
  else if(type==='detail') apiUrl = `${BASE}/fixtures/${fixture}`;
  else if(type==='events') apiUrl = `${BASE}/fixtures/${fixture}/events`;
  else if(type==='lineups') apiUrl = `${BASE}/fixtures/${fixture}/lineups`;
  else if(type==='stats') apiUrl = `${BASE}/fixtures/${fixture}/stats`;
  else if(type==='leagues') apiUrl = `${BASE}/leagues`;
  try{
    const r = await fetch(apiUrl, { headers: { 'X-Api-Key': KEY } });
    const text = await r.text();
    return new Response(text, { status: r.status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
  }catch(e){
    return new Response(JSON.stringify({error: e.message}), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

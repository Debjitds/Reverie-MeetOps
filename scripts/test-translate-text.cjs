const { createClient } = require('@supabase/supabase-js');
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhenF3cGtuemtxeXl0b2tvdG55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxMjc2NjcsImV4cCI6MjEwMTcwMzY2N30.y3mWS3cwqf1_-0c7ZoU4fP00Vu1EmY7l3xWVfIzpncU';
const BASE = 'https://cazqwpknzkqyytokotny.supabase.co';
const supabase = createClient(BASE, ANON);

const SAMPLE = [
  'Dashboard',
  'Total Bookings',
  'Welcome back, {name}',
  'MeetOps AI Assistant',
  'Cancel',
];

(async () => {
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({ email: 'testdash0816@miaoda.com', password: 'Testpass123' });
  if (authErr) { console.log('AUTH_ERROR:', authErr.message); return; }
  const token = auth.session.access_token;

  const call = async (body) => {
    const res = await fetch(BASE + '/functions/v1/translate-text', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token, 'apikey': ANON, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return { status: res.status, json: await res.json().catch(() => null) };
  };

  const langs = ['bn', 'hi', 'ta', 'es', 'fr', 'ar', 'zh', 'ja', 'de'];

  for (const lang of langs) {
    const r = await call({ text: SAMPLE, targetLang: lang, sourceLang: 'en' });
    if (r.status !== 200) {
      console.log(`[${lang}] FAIL status=${r.status} error=${r.json && r.json.error}`);
    } else {
      const t = r.json.translations;
      const ok = Array.isArray(t) && t.length === SAMPLE.length;
      const nonEn = ok && t[0] !== SAMPLE[0];
      const placeholderOk = ok && /\{name\}/.test(t[2]);
      const brandOk = ok && t[3].includes('MeetOps');
      console.log(`[${lang}] status=200 count=${ok ? t.length : 'BAD'} translated=${nonEn} placeholder={${placeholderOk}} brand=${brandOk} sample="${ok ? t[0] : JSON.stringify(t)}"`);
    }
    await new Promise(r2 => setTimeout(r2, 3000));
  }

  // single-string contract
  const single = await call({ text: 'Bookings', targetLang: 'bn', sourceLang: 'en' });
  console.log('[single-string] status=' + single.status, 'translations=' + JSON.stringify(single.json && single.json.translations), 'type=' + typeof (single.json && single.json.translations));

  // same-language shortcut
  const same = await call({ text: ['Hello'], targetLang: 'en', sourceLang: 'en' });
  console.log('[same-lang] status=' + same.status, JSON.stringify(same.json && same.json.translations));

  // invalid language
  const inv = await call({ text: ['Hello'], targetLang: 'xx' });
  console.log('[invalid-lang] status=' + inv.status, JSON.stringify(inv.json && inv.json.error));
})().catch(e => console.log('SCRIPT_ERROR:', e.message));

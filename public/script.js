const statusEl = document.getElementById('status');
const form = document.getElementById('loginForm');

const SUPABASE_URL = 'GANTI_DENGAN_SUPABASE_URL';
const SUPABASE_PUBLISHABLE_KEY = 'GANTI_DENGAN_SUPABASE_PUBLISHABLE_KEY';

let supabaseClient = null;
if (!SUPABASE_URL.startsWith('GANTI_') && !SUPABASE_PUBLISHABLE_KEY.startsWith('GANTI_')) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();

  if (!supabaseClient) {
    statusEl.textContent = 'Isi SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY di script.js terlebih dahulu.';
    return;
  }

  statusEl.textContent = 'Mengirim magic link...';
  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin }
  });

  statusEl.textContent = error
    ? 'Gagal: ' + error.message
    : 'Magic link sudah dikirim. Cek inbox email kamu.';
});
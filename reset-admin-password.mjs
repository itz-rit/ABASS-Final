
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

console.log('Starting admin password reset...');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const userId = '47a98178-d4c3-4401-8a09-16388f9f7cac';
const newPassword = process.env.NEW_ADMIN_PASSWORD;

if (!process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !newPassword) {
  throw new Error('Missing required environment variables in .env');
}

if (newPassword.length < 12) {
  throw new Error('Password must contain at least 12 characters.');
}

try {
  const { error } = await supabase.auth.admin.updateUserById(
    userId,
    { password: newPassword }
  );

  if (error) throw error;

  console.log('SUCCESS: Admin password updated!');
} catch (error) {
  console.error('FAILED:', error.message);
  process.exitCode = 1;
}

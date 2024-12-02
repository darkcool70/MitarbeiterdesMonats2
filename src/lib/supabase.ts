import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rapepnrxjgbipdkseldr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcGVwbnJ4amdiaXBka3NlbGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNjY5NzcsImV4cCI6MjA0ODc0Mjk3N30.KDjWrJTHrCOIdyyPD35hKjRrNf1MZsHpEz3S3vpTlS0';

export const supabase = createClient(supabaseUrl, supabaseKey);
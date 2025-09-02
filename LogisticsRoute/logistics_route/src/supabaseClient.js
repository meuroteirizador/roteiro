import { createClient } from "@supabase/supabase-js";

// Pegue essas duas informações no painel do Supabase → Project Settings > API
const supabaseUrl = "https://hiweqipokelkusvajnew.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpd2VxaXBva2Vsa3VzdmFqbmV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyNDgyMDAsImV4cCI6MjA3MTgyNDIwMH0.0SdosJxfUx1-W6Q4jKXPWGQmzeSBnBJtfdFFbdwo-vw"; // use a anon public key (não a service_role)

export const supabase = createClient(supabaseUrl, supabaseKey);

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, Session, User } from '@supabase/supabase-js';

const supabaseUrl = "https://dxjidvrygrvcjkwollbo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4amlkdnJ5Z3J2Y2prd29sbGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3OTU5NjQsImV4cCI6MjA1MjM3MTk2NH0.xsKZfeCY673kIiMOnCNf3USwjX9tXHz57EOFAQoYXD4";

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const SupabaseAPI = {
    async startAutoRefresh(){
        supabaseClient.auth.startAutoRefresh();
    },
    async stopAutoRefresh(){
        supabaseClient.auth.stopAutoRefresh();
    },
    async signIn(email: string, password: string){
        const res = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });
        if(res.error){
            throw res.error;
        }
        return res.data;
    },
    async signUp(email: string, password: string){
        const res = await supabaseClient.auth.signUp({
            email: email,
            password: password
        })
        if(res.error){
            throw res.error;
        }
        return res.data;
    },
    async getProfile(){
        const session = await supabaseClient.auth.getSession();
        if(session.error){
            throw session.error;
        }
        const res = await supabaseClient
                    .from("profiles")
                    .select("username")
                    .eq("id", session.data.session?.user.id)
                    .single();
        if(res.error){
            throw res.error;
        }
        return res.data;
    }
}
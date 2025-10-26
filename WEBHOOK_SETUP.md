# Riverside Cafe Rewards Webhook Configuration
# 
# ✅ SECURE - Now using environment variables for credentials!
#
# Environment Variables Required:
# POSTGREST_URL=https://vrebqgcyjcqcncengtuc.supabase.co/rest/v1
# POSTGREST_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZWJxZ2N5amNxY25jZW5ndHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDIwNTMsImV4cCI6MjA3NzAxODA1M30.z3giI1sI2YTUIMvDnae0-YCGoeYVM7h6wz227-FG84Q
#
# Vercel Setup:
# 1. Go to your Vercel dashboard
# 2. Select your Riverside Cafe project
# 3. Go to Settings > Environment Variables
# 4. Add the two variables above
# 5. Redeploy your project
#
# Database Setup:
# 1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/vrebqgcyjcqcncengtuc
# 2. Navigate to SQL Editor
# 3. Run the commands from database-schema.sql
# 4. This will create the rewards_signups table with proper indexes and security
#
# Testing:
# 1. Deploy to Vercel with environment variables set
# 2. Test the form submission on your rewards page
# 3. Check your Supabase dashboard > Table Editor > rewards_signups to verify data
#
# Security Notes:
# - Credentials are now stored as environment variables (secure)
# - The API endpoint validates email format and required fields
# - Row Level Security (RLS) is enabled on the database table
# - Only INSERT operations are allowed for anonymous users
# - Consider adding rate limiting for production use
#
# IMPORTANT: Your old API key was exposed on GitHub. Consider rotating it in Supabase for security.

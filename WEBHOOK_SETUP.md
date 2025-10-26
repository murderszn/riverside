# Riverside Cafe Rewards Webhook Configuration
# 
# ✅ WORKING - Your webhook is now functional!
#
# Database Details:
# - PostgREST URL: https://vrebqgcyjcqcncengtuc.supabase.co/rest/v1
# - API Key: Configured via environment variables
#
# Local Development:
# 1. Run: npm install
# 2. Run: npm run dev
# 3. Visit: http://localhost:3000/rewards.html
# 4. Test the form submission
#
# Production Deployment:
# 1. Set environment variables in Vercel:
#    - POSTGREST_URL=https://vrebqgcyjcqcncengtuc.supabase.co/rest/v1
#    - POSTGREST_API_KEY=your-api-key
# 2. Deploy to Vercel
# 3. Test the live form
#
# Database Setup:
# 1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/vrebqgcyjcqcncengtuc
# 2. Navigate to SQL Editor
# 3. Run the commands from database-schema.sql
# 4. This will create the rewards_signups table with proper indexes and security
#
# Testing:
# 1. Deploy to Vercel
# 2. Test the form submission on your rewards page
# 3. Check your Supabase dashboard > Table Editor > rewards_signups to verify data
#
# Security Notes:
# - The API endpoint validates email format and required fields
# - Row Level Security (RLS) is enabled on the database table
# - Only INSERT operations are allowed for anonymous users
# - Consider adding rate limiting for production use

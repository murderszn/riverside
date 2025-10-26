#!/bin/bash
# Script to add environment variables to Vercel

echo "Adding POSTGREST_URL to Vercel..."
echo "https://vrebqgcyjcqcncengtuc.supabase.co/rest/v1" | npx vercel env add POSTGREST_URL production

echo "Adding POSTGREST_API_KEY to Vercel..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZWJxZ2N5amNxY25jZW5ndHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NDIwNTMsImV4cCI6MjA3NzAxODA1M30.z3giI1sI2YTUIMvDnae0-YCGoeYVM7h6wz227-FG84Q" | npx vercel env add POSTGREST_API_KEY production

echo "Environment variables added! Now redeploying..."
npx vercel --prod

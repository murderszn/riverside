# Local Development Setup for Riverside Cafe Rewards Webhook

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start local server:**
   ```bash
   npm run dev
   ```

3. **Test the rewards form:**
   - Open: http://localhost:3000/rewards.html
   - Fill out the form and submit
   - Check your Supabase dashboard for the new signup

## What This Does

- Runs a local Express server on port 3000
- Serves your HTML files
- Handles the `/api/rewards-signup` endpoint
- Connects to your Supabase database
- Enables CORS for local testing

## Troubleshooting

**If you get "Method Not Allowed" error:**
- Make sure you're using the local server (port 3000), not Live Server (port 5500)
- The API endpoint only works on the local development server

**If you get JSON parsing errors:**
- Check that the form is sending proper JSON data
- Verify the API endpoint is responding correctly

## Production Deployment

When ready for production:
1. Deploy to Vercel
2. The webhook will work automatically with your Supabase database
3. No additional configuration needed
